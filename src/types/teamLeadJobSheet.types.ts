import { Types } from "mongoose";
import { type PlantList, type NonPlantingList } from "./jobSheet.types.js";

export type TeamLeadJobSheetType = {
    _id: string,
    jobId: string,
    teamLeadId: string,
    plants: PlantList[],
    nonePlantingTask: NonPlantingList[],
    notes: string,
    dateCreated: Date
};

export type NewTeamLeadJobSheet = {
    jobId: Types.ObjectId,
    teamLeadId: Types.ObjectId,
    plants: PlantList[],
    nonePlantingTask: NonPlantingList[],
    notes: string,
    dateCreated: Date,
};

export type TeamLeadJobSheetFromDB = {
    _id: Types.ObjectId,
    jobId: Types.ObjectId,
    teamLeadId: Types.ObjectId,
    plants: PlantList[],
    nonePlantingTask: NonPlantingList[],
    notes: string,
    dateCreated: Date,
};

export type TeamLeadJobSheetsRes<TeamLeadJobSheetType> = 
    | { ok: boolean; teamLeadJobSheets: Array<TeamLeadJobSheetType> }
    | { ok: boolean; message: string };

export type TeamLeadJobSheetParams = {
    _id: string,
};

export type TeamLeadJobSheetRes<TeamLeadJobSheetType> = 
    | { ok: boolean; teamLeadJobSheet: TeamLeadJobSheetType }
    | { ok: boolean; message: string };

export type TeamLeadJobSheetCreateReq = {
    jobId: string,
    teamLeadId: string,
    plants: PlantList[],
    nonePlantingTask: NonPlantingList[],
    notes: string,
    dateCreated: Date
};

export type TeamLeadJobSheetUpdateReq = {
    plants?: PlantList[],
    nonePlantingTask?: NonPlantingList[],
    notes?: string,
};