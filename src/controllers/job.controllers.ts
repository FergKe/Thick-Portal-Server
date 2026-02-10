import { type Request, type Response, type NextFunction } from "express";
import {
  type Job,
  type JobsRes,
  type JobParams,
  type JobRes,
  type JobCreateReq,
  type JobUpdateReq,
  type JobDeleteRes
} from "../types/job.types.js";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from "../services/job.services.js";

export const getAllJobsController = async (
  req: Request<{}, JobsRes<Job>>,
  res: Response<JobsRes<Job>>,
  next: NextFunction
) => {
  try {
    const Jobs = await getAllJobs();

    res.status(200).json(Jobs);
  } catch (error) {
    return next(error);
  };
};

export const getJobByIdController = async (
  req: Request<JobParams, JobRes<Job>>,
  res: Response<JobRes<Job>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const Job = await getJobById(_id);

    res.status(200).json(Job);
  } catch (error) {
    return next(error);
  };
};

export const createJobController = async (
  req: Request<{}, JobRes<Job>, JobCreateReq>,
  res: Response<JobRes<Job>>,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newJob = await createJob(data);

    res.status(201).json(newJob);
  } catch (error) {
    return next(error);
  }
};

export const updateJobController = async (
  req: Request<JobParams, JobRes<Job>, JobUpdateReq>,
  res: Response<JobRes<Job>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const data = req.body;
    const updatedJob = await updateJob(_id, data)

    res.status(200).json(updatedJob);
  } catch (error) {
    return next(error);
  }
};

export const deleteJobController = async (
  req: Request<JobParams, JobDeleteRes>,
  res: Response<JobDeleteRes>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const result = await deleteJob(_id);

    res.status(204).json(result);
  } catch (error) {
    return next(error);
  }
};
