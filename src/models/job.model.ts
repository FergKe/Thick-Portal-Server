import { model, Schema, type InferSchemaType, Types } from "mongoose";

type Status = "in_progress" | "completed";

interface IJob {
    jobName: string,
    client: string,
    location: string,
    description: string,
    crew: Types.ObjectId[]
    teamLead: Types.ObjectId,
    jobSheets: Types.ObjectId[]
    status: Status
    dateCreated: Date,
    completedDate: Date,
}

const jobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    crew: {
        type: [{ type: Schema.Types.ObjectId, ref: "Planter" }],
        required: true
    },
    teamLead: {
        type: Schema.Types.ObjectId,
        ref: "Planter",
        required: true,
        validate: {
            validator: function(this: IJob, v: Types.ObjectId  ) {
                return this.crew.includes(v)
            },
            message: "Team lead must be a member of the crew"
        },
    },
    jobSheets: {
        type: [{ type: Schema.Types.ObjectId, ref: "JobSheet" }],
        default: []
    },
    status: {
        type: String,
        enum: ["in_progress", "completed"],
        default: "in_progress"
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    completedDate: {
        type: Date,
        required: false
    }
});

export type Job = InferSchemaType<typeof jobSchema>;
export default model<Job>("Job", jobSchema);