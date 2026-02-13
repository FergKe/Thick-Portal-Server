import TeamLeadJobSheet from "../models/TeamLeadJobSheet.model.js"
import { AppError } from "../errors/AppError.js";
import { type HydratedDocument } from "mongoose";
import {
    type TeamLeadJobSheetType,
    type TeamLeadJobSheetFromDB,
    type TeamLeadJobSheetCreateReq,
    type TeamLeadJobSheetUpdateReq
} from "../types/teamLeadJobSheet.types.js";


export const getAllTeamLeadJobSheets = async () => {
    try {
        const teamLeadJobSheets = await TeamLeadJobSheet.find().lean<TeamLeadJobSheetFromDB[]>();

        if (teamLeadJobSheets.length === 0) {
            throw new AppError(404, "TeamLeadJobSheets not found");
        }

        const teamLeadJobSheetsIdToString: TeamLeadJobSheetType[] = teamLeadJobSheets.map((jobSheet) => ({
            ...jobSheet,
            _id: jobSheet._id.toString(),
            jobId: jobSheet.jobId.toString(),
            teamLeadId: jobSheet.teamLeadId.toString()
        }));

        return { ok: true, teamLeadJobSheets: teamLeadJobSheetsIdToString };

    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Internal server error");
    }
};

export const getTeamLeadJobSheetById = async (
    _id: string
) => {
    try {
        const teamLeadJobSheet = await TeamLeadJobSheet.findById(_id).lean<TeamLeadJobSheetFromDB>();

        if (!teamLeadJobSheet) {
            throw new AppError(404, "TeamLeadJobSheet not found");
        }

        const resTeamLeadJobSheet: TeamLeadJobSheetType = {
            ...teamLeadJobSheet,
            _id: teamLeadJobSheet._id.toString(),
            jobId: teamLeadJobSheet.jobId.toString(),
            teamLeadId: teamLeadJobSheet.teamLeadId.toString()
        };

        return { ok: true, teamLeadJobSheet: resTeamLeadJobSheet };

    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Internal server error");
    }
};

export const createTeamLeadJobSheet = async (
    data: TeamLeadJobSheetCreateReq
) => {
    try {
        const newTeamLeadJobSheet = (await TeamLeadJobSheet.create(data)).toObject();

        const resTeamLeadJobSheet: TeamLeadJobSheetType = {
            ...newTeamLeadJobSheet,
            _id: newTeamLeadJobSheet._id.toString(),
            jobId: newTeamLeadJobSheet.jobId.toString(),
            teamLeadId: newTeamLeadJobSheet.teamLeadId.toString(),
            plants: newTeamLeadJobSheet.plants.map((plant) => ({
                ...plant,
                plantId: plant.plantId.toString()
            })),
            nonePlantingTask: newTeamLeadJobSheet.nonePlantingTask.map((task) => ({
                ...task,
                taskId: task.taskId.toString()
            })),
        };

        return { ok: true, teamLeadJobSheet: resTeamLeadJobSheet };

    } catch (error: any) {
        if (error.code === 110000) {
            throw new AppError(409, "TeamLeadJobSheet already exists");
        }
        if (error.name === "ValidationError") {
            throw new AppError(400, "Invalid data");
        }
        throw new AppError(500, "Server error");
    }
};

export const updateTeamLeadJobSheet = async (
    _id: string,
    body: TeamLeadJobSheetUpdateReq
) => {
    try {
        const updatedTeamLeadJobSheet: HydratedDocument<TeamLeadJobSheetFromDB> | null = await TeamLeadJobSheet.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        );

        if (!updatedTeamLeadJobSheet) {
            throw new AppError(404, "Could not find TeamLeadJobSheet");
        }

        const resTeamLeadJobSheet: TeamLeadJobSheetType = {
            _id: updatedTeamLeadJobSheet._id.toString(),
            jobId: updatedTeamLeadJobSheet.jobId.toString(),
            clientName: updatedTeamLeadJobSheet.clientName,
            teamLeadId: updatedTeamLeadJobSheet.teamLeadId.toString(),
            plants: updatedTeamLeadJobSheet.plants,
            nonePlantingTask: updatedTeamLeadJobSheet.nonePlantingTask,
            notes: updatedTeamLeadJobSheet.notes,
            dateCreated: updatedTeamLeadJobSheet.dateCreated
        };

        return { ok: true, teamLeadJobSheet: resTeamLeadJobSheet };

    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Server Error");
    }
};

export const deleteTeamLeadJobSheet = async (
    _id: string
) => {
    try {
        const deletedTeamLeadJobSheet = await TeamLeadJobSheet.findByIdAndDelete(_id);

        if (!deletedTeamLeadJobSheet) {
            throw new AppError(404, "TeamLeadJobSheet not found");
        }

        return { ok: true, message: "TeamLeadJobSheet deleted successfully" };

    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Internal server error");
    }
};