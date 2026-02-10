import { Types } from "mongoose";

export type TaskType = {
    _id: string,
    taskName: string,
    pricePerHour: number
};

export type TaskFromDB = {
    _id: Types.ObjectId,
    taskName: string,
    pricePerHour: number
}

export type NewTask = {
    taskName: string,
    pricePerHour: number
};

export type TasksRes<TaskType> = 
    | { ok: boolean; tasks: Array<TaskType> }
    | { ok: boolean; message: string };

export type TaskParams = {
    _id: string,
};

export type TaskRes<TaskType> = 
    | { ok: boolean; task: TaskType }
    | { ok: boolean; message: string };

export type TaskCreateReq = {
    taskName: string,
    pricePerHour: number,
};

export type TaskUpdateReq = Partial <{
    taskName: string,
    pricePerHour: number,
}>

export type TaskDeleteRes = 
    | { ok: boolean; message: string }
    | { ok: boolean; message: string };