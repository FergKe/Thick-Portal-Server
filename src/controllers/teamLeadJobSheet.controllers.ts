import { type NextFunction, type Request, type Response } from "express";
import {
    type TeamLeadJobSheetType,
    type TeamLeadJobSheetsRes,
    type TeamLeadJobSheetParams,
    type TeamLeadJobSheetRes,
    type TeamLeadJobSheetCreateReq,
    type TeamLeadJobSheetUpdateReq,
} from "../types/teamLeadJobSheet.types.js";
import {
    getAllTeamLeadJobSheets,
    getTeamLeadJobSheetById,
    createTeamLeadJobSheet,
    updateTeamLeadJobSheet,
    deleteTeamLeadJobSheet
} from "../services/teamLeadJobSheet.services.js"

export const getAllTeamLeadJobSheetsController = async (
    req: Request<{}, TeamLeadJobSheetsRes<TeamLeadJobSheetType>>,
    res: Response<TeamLeadJobSheetsRes<TeamLeadJobSheetType>>,
    next: NextFunction
) => {
    try {
        const teamLeadJobSheets = await getAllTeamLeadJobSheets();
        res.status(200).json(teamLeadJobSheets);
    } catch (error) {
        return next(error);
    }
};

export const getTeamLeadJobSheetByIdController = async (
    req: Request<TeamLeadJobSheetParams, TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    res: Response<TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    next: NextFunction
) => {
    try {
        const { _id } = req.params;
        const teamLeadJobSheet = await getTeamLeadJobSheetById(_id);
        res.status(200).json(teamLeadJobSheet);
    } catch (error) {
        return next(error);
    }
};

export const createTeamLeadJobSheetController = async (
    req: Request<{}, TeamLeadJobSheetRes<TeamLeadJobSheetType>, TeamLeadJobSheetCreateReq>,
    res: Response<TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const newTeamLeadJobSheet = await createTeamLeadJobSheet(data);
        res.status(201).json(newTeamLeadJobSheet);
    } catch (error) {
        return next(error);
    }
};

export const updateTeamLeadJobSheetController = async (
    req: Request<TeamLeadJobSheetParams, TeamLeadJobSheetRes<TeamLeadJobSheetType>, TeamLeadJobSheetUpdateReq>,
    res: Response<TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    next: NextFunction
) => {
    try {
        const { _id } = req.params;
        const data = req.body;
        const updatedTeamLeadJobSheet = await updateTeamLeadJobSheet(_id, data);
        res.status(200).json(updatedTeamLeadJobSheet);
    } catch (error) {
        return next(error);
    }
};

export const deleteTeamLeadJobSheetController = async (
    req: Request<TeamLeadJobSheetParams, TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    res: Response<TeamLeadJobSheetRes<TeamLeadJobSheetType>>,
    next: NextFunction
) => {
    try {
        const { _id } = req.params;
        const deletedTeamLeadJobSheet = await deleteTeamLeadJobSheet(_id);
        res.status(200).json(deletedTeamLeadJobSheet);
    } catch (error) {
        return next(error);
    }
};