import { Types } from "mongoose";

type PlantListFromDB = {
    plantId: Types.ObjectId,
    plantName: string,
    unsemi?: number | null,
    compacted?: number | null,
    organicMulch?: number | null,
    jute?: number | null,
    quantity: number
};

export type PlantList = {
    plantId: string,
    plantName: string,
    unsemi?: number | null,
    compacted?: number | null,
    organicMulch?: number | null,
    jute?: number | null,
    quantity: number
};

export type NonPlantingList = {
    taskId: string,
    taskName: string,
    taskDescription: string,
    timeStart: Date,
    timeEnd: Date,
}
type NonPlantingListFromDB = {
    taskId: Types.ObjectId,
    taskName: string,
    taskDescription: string,
    timeStart: Date,
    timeEnd: Date,
}
 
export type JobSheetType = {
    _id: string,
    jobId: string,
    planterId: string,
    plants: PlantList[],
    nonPlantingTask: NonPlantingList[],
    notes: string
    dateCreated: Date
};

export type NewJobSheet = {
    jobId: Types.ObjectId,
    planterId: Types.ObjectId,
    plants: PlantList[],
    nonPlantingTask: NonPlantingList[],
    notes: string,
    dateCreated: Date,
};

export type JobSheetFromDB = {
    _id: Types.ObjectId,
    jobId: Types.ObjectId,
    planterId: Types.ObjectId,
    plants: PlantListFromDB[],
    nonPlantingTask: NonPlantingListFromDB[],
    notes: string,
    dateCreated: Date,
};


export type JobSheetsRes<JobSheetType> = 
    | { ok: boolean; jobSheets: Array<JobSheetType> }
    | { ok: boolean; message: string };

export type JobSheetParams = {
    _id: string,
};

export type JobSheetRes<JobSheetType> = 
    | { ok: boolean; jobSheet: JobSheetType }
    | { ok: boolean; message: string };

export type JobSheetCreateReq = {
    jobId: string,
    planterId: string,
    plants: PlantList[],
    nonPlantingTask: NonPlantingList[],
    notes: string
};

export type JobSheetUpdateReq = {
    plants?: PlantList[],
    nonPlantingTask?: NonPlantingList[],
    notes?: string
};
