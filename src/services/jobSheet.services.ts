import JobSheet from "../models/jobSheet.model.js"
import { AppError } from "../errors/AppError.js";
import { type DeleteResult, } from "mongoose";
import type {
    JobSheetCreateReq,
    JobSheetFromDB,
    JobSheetType,
    JobSheetUpdateReq,
} from "../types/jobSheet.types.js";
import { jobSheetConversion } from "../utils/serviceFunction.js";

export const getAllJobSheets = async (
    _id: string
) => {
    try {
        const jobSheets = await JobSheet.find().lean<JobSheetFromDB[]>();

        if ( jobSheets.length === 0 ) { 
            throw new AppError(404, "JobSheets not found")
        };

        const jobSheetsIdToString: JobSheetType[] = jobSheets.map((jobSheet) => jobSheetConversion(jobSheet))

        return { ok: true , jobSheets: jobSheetsIdToString }
        
    } catch ( error: any )  {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};
export const getJobSheetsByJobId = async (
    _id: string
) => {
    try {
        const JobSheets = await JobSheet.find({ jobId: _id }).lean<JobSheetFromDB[]>();

        if ( JobSheets.length === 0 ) { 
            throw new AppError(404, "JobSheets not found")
        };

        const JobSheetsIdToString: JobSheetType[] = JobSheets.map((jobSheet) => jobSheetConversion(jobSheet))

        return { ok: true , jobSheets: JobSheetsIdToString }
        
    } catch ( error: any )  {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const getJobSheetById = async (
    _id: string
) => {
    try {
        const jobSheet = await JobSheet.findById(_id).lean<JobSheetFromDB>();

        if ( !jobSheet ) {
            throw new AppError(404, "JobSheet not found");
        };

        const resJobSheet: JobSheetType = jobSheetConversion(jobSheet)

        return { ok: true , jobSheet: resJobSheet };

    } catch ( error: any ) {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const createJobSheet = async (
    data: JobSheetCreateReq
) => {
    try {
        const newJobSheet = (await JobSheet.create(data)).toObject();
        
        const resJobSheet: JobSheetType = {
            _id: newJobSheet._id.toString(),
            jobId: newJobSheet.jobId.toString(),
            planterId: newJobSheet.planterId.toString(),
            plants: newJobSheet.plants.map(plant => ({ ...plant, plantId: plant.plantId.toString() })),
            nonPlantingTask: newJobSheet.nonPlantingTask.map(task => ({ ...task, taskId: task.taskId.toString() })),
            notes: newJobSheet.notes,
            dateCreated: newJobSheet.dateCreated
        };

        return { ok: true, jobSheet: resJobSheet }

    } catch ( error: any) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Task already Exists")
        };

        if( error.name === "ValidationError" ) {
            throw new AppError( 400, "Invalid data" );
        };

        throw new AppError ( 500, "Server error" );
    }

};

export const updateJobSheet  = async (
    _id: string,
    body: JobSheetUpdateReq
) => {
    try {
        const updatedJobSheet = await JobSheet.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<JobSheetFromDB>();

        if ( !updatedJobSheet ) {
            throw new AppError( 404, "Could not find JobSheet");
        };

        const resJobSheet: JobSheetType = {
            _id: updatedJobSheet._id.toString(),
            jobId: updatedJobSheet.jobId.toString(),
            planterId: updatedJobSheet.planterId.toString(),
            plants: updatedJobSheet.plants.map(plant => ({
                ...plant,
                plantId: plant.plantId.toString()
            })),
            nonPlantingTask: updatedJobSheet.nonPlantingTask.map(task => ({
                ...task,
                taskId: task.taskId.toString()
            })),
            notes: updatedJobSheet.notes,
            dateCreated: updatedJobSheet.dateCreated
        };

        return { ok: true, jobSheet: resJobSheet }

    } catch ( error: any ){
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};

export const deleteJobSheet = async (
    _id: string
) => {
    try {
        const deletedJobSheet: DeleteResult | null = await JobSheet.findByIdAndDelete(_id);

        if ( !deletedJobSheet ) {
            throw new AppError( 404, "JobSheet not found" );
        };

        return { ok: true, message: "JobSheet deleted successfully" };

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Internal server error");
    }
};
