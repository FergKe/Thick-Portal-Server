import { type NextFunction, type Request, type Response } from "express";
import {
  type JobSheetType,
  type JobSheetsRes,
  type JobSheetParams,
  type JobSheetRes,
  type JobSheetCreateReq,
  type JobSheetUpdateReq,
} from "../types/jobSheet.types.js";
import {
  getAllJobSheets,
  getJobSheetById,
  createJobSheet,
  updateJobSheet,
  getJobSheetsByJobId,
  deleteJobSheet
} from "../services/jobSheet.services.js"

export const getAllJobSheetsController = async (
  req: Request<JobSheetParams, JobSheetsRes<JobSheetType>>,
  res: Response<JobSheetsRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const JobSheets = await getAllJobSheets(_id);

    res.status(200).json(JobSheets);
  } catch (error) {
    return next(error);
  };
};

export const getJobSheetByIdController = async (
  req: Request<JobSheetParams, JobSheetRes<JobSheetType>>,
  res: Response<JobSheetRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const JobSheet = await getJobSheetById(_id);

    res.status(200).json(JobSheet);
  } catch (error) {
    return next(error);
  };
};

export const getJobSheetsByJobIdController = async (
  req: Request<JobSheetParams, JobSheetsRes<JobSheetType>>,
  res: Response<JobSheetsRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const JobSheet = await getJobSheetsByJobId(_id);

    res.status(200).json(JobSheet);
  } catch (error) {
    return next(error);
  };
};

export const createJobSheetController = async (
  req: Request<{}, JobSheetRes<JobSheetType>, JobSheetCreateReq>,
  res: Response<JobSheetRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newJobSheet = await createJobSheet(data);

    res.status(201).json(newJobSheet);
  } catch (error) {
    return next(error);
  }
};

export const updateJobSheetController = async (
  req: Request<JobSheetParams, JobSheetRes<JobSheetType>, JobSheetUpdateReq>,
  res: Response<JobSheetRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const data = req.body;
    const updatedJobSheet = await updateJobSheet(_id, data)

    res.status(200).json(updatedJobSheet);
  } catch (error) {
    return next(error);
  }
};

export const deleteJobSheetController = async (
  req: Request<JobSheetParams, JobSheetRes<JobSheetType>>,
  res: Response<JobSheetRes<JobSheetType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const deletedJobSheet = await deleteJobSheet(_id);

    res.status(200).json(deletedJobSheet);
  } catch (error) {
    return next(error);
  }
};
