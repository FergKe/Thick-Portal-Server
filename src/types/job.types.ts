import { Types } from "mongoose";

type status = "in_progress" | "completed";
 
export type Job = Partial<{
    _id: string,
    jobName: string,
    client: string,
    location: string,
    description: string,
    crew: Types.ObjectId[]
    teamLead: Types.ObjectId,
    jobSheets: Types.ObjectId[]
    status: status
    dateCreated: Date,
    completedDate: Date,

}>;

export type JobsRes<Job> = 
    | { ok: true; plants: Array<Job> }
    | { ok: false; message: string };

export type JobParams = {
    _id: string,
};

export type JobRes<Job> = 
    | { ok: true; job: Job }
    | { ok: false; message: string };

export type JobCreateReq = Job;

export type JobUpdateReq = Job;

export type JobDeleteRes = 
    | { ok: true; message: string }
    | { ok: false; message: string };