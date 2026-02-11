import { Types } from "mongoose";

type status = "in_progress" | "completed";
 
export type JobType = {
    _id: string,
    jobName: string,
    client: string,
    location: string,
    description: string,
    crew: string[]
    teamLead: string,
    jobSheets: string[]
    status: status
    dateCreated: Date,
    completedDate?: Date | null,
};

export type JobFromDB = {
    _id: Types.ObjectId,
    jobName: string,
    client: string,
    location: string,
    description: string,
    crew: Types.ObjectId[]
    teamLead: Types.ObjectId,
    jobSheets: Types.ObjectId[]
    status: status
    dateCreated: Date,
    completedDate?: Date | null,
};

export type JobsRes<JobType> = 
    | { ok: boolean; jobs: Array<JobType> }
    | { ok: boolean; message: string };

export type JobParams = {
    _id: string,
};

export type JobRes<JobType> = 
    | { ok: boolean; job: JobType }
    | { ok: boolean; message: string };

export type JobCreateReq = Partial<{
    jobName: string,
    client: string,
    location: string,
    description: string,
    crew: string[]
    teamLead: string,
}>;

export type JobUpdateReq = Partial<{
    description?: string,
    crew?: string[]
    teamLead?: string,
    jobSheets?: string[]
    status?: status
}>;

export type JobDeleteRes = 
    | { ok: boolean; message: string }
    | { ok: boolean; message: string };