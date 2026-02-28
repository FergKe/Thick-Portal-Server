import type { DeleteResult } from "mongoose";
import { AppError } from "../errors/AppError.js";
import Job from "../models/job.model.js";
import Planter from "../models/planter.model.js";
import {
    type AggJobFromDB,
    type AggJobType,
    type JobCreateReq,
    type JobFromDB,
    type JobType,
    type JobUpdateReq,
    } from "../types/job.types.js";
import { aggJobConversion, jobConversion } from "../utils/serviceFunction.js";
import mongoose from "mongoose";

export const getAllJobs = async () => {
    try {
        const jobs = await Job.find().lean<JobFromDB[]>();

        if ( jobs.length === 0 ) { 
            throw new AppError(404, "Jobs not found")
        };

        const jobsIdToString: JobType[] = jobs.map((job) => jobConversion(job));

        return { ok: true , jobs: jobsIdToString }

    } catch ( error: any ) {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const getJobById = async (
    _id: string
) => {
    try {
        const convertedId = new mongoose.Types.ObjectId(_id); 
        const job = await Job.aggregate<AggJobFromDB>([

            {
                $match: {
                    _id: convertedId
                }
            },
            {
                $lookup: {
                    from: 'planters',
                    localField: 'crew',
                    foreignField: '_id',
                    as: "crew"
                }
            }
        ]);

        if ( !job ) {
            throw new AppError(404, "Job not found");
        };
        const singleJob = job[0] as AggJobFromDB;

        const resJob: AggJobType = aggJobConversion(singleJob);

        return { ok: true , job: resJob };

    } catch ( error: any ) {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error");
    }
};

export const createJob = async (
    data: JobCreateReq
) => {
    try {
        const newJob = (await Job.create(data)).toObject();
        await Planter.findByIdAndUpdate(
            newJob.teamLead, 
            { $set: { role: "teamLead" }},
            { new: true }
        )

        const resJob: JobType = jobConversion(newJob);

        return { ok: true, job: resJob };

    } catch ( error: any ) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Job already Exists")
        };

        if ( error.name === "ValidationError" ) {
            throw new AppError( 400, "Invalid data" );
        };

        throw new AppError ( 500, "Server error" );
    }
};

export const updateJob = async (
    _id: string,
    body: JobUpdateReq
) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<JobFromDB>();

        if ( !updatedJob ) {
            throw new AppError( 404, "Could not find job");
        };

        const resJob: JobType = jobConversion(updatedJob);

        return { ok: true, job: resJob };

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};

export const deleteJob = async (
    _id: string
) => {
    try {
        const deletedJob: DeleteResult | null = await Job.findByIdAndDelete(_id);

        if ( !deletedJob ) {
            throw new AppError( 404, "Job not found" );
        };

        return { ok: true, message: "Job deleted successfully" };
        
    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Internal server error")
    }
};

export const getJobByProfile = async (
    _id: string
) => {
    try {
        const convertedId = new mongoose.Types.ObjectId(_id); 
        const jobs = await Job.aggregate<AggJobFromDB | null>([
            {
                $match: {
                    crew: convertedId,
                    status: "in_progress"
                }
            },
            {
                $lookup: {
                    from: 'planters',
                    localField: 'crew',
                    foreignField: '_id',
                    as: "crew"
                }
            }
        ]);

        if ( !jobs ) {
            return { ok: true , job: [] };
        };

        const resJob = jobs.map((job) => aggJobConversion(job as AggJobFromDB));

        return { ok: true , job: resJob };

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Internal server error")
    }
}