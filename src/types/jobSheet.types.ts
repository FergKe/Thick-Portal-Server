import { Types } from "mongoose";

type PlantListFromDB = {
    plantId: Types.ObjectId,
    plantName: string,
    unsemi?: boolean | null,
    compacted?: boolean | null,
    organicMulch?: boolean | null,
    jute?: boolean | null,
    quantity: number
    _id: Types.ObjectId
};

export type PlantList = {
    plantId: string,
    plantName: string,
    unsemi?: boolean | null,
    compacted?: boolean | null,
    organicMulch?: boolean | null,
    jute?: boolean | null,
    quantity: number
    _id: string
};

export type NonPlantingList = {
    taskId: string,
    taskName: string,
    taskDescription: string,
    timeStart: string,
    timeEnd: string,
    _id: string
}
type NonPlantingListFromDB = {
    taskId: Types.ObjectId,
    taskName: string,
    taskDescription: string,
    timeStart: string,
    timeEnd: string,
    _id: Types.ObjectId
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
