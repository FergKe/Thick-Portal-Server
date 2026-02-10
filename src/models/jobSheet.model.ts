import { Schema, model, type InferSchemaType } from "mongoose";

export const nonPlantingTaskList = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "NonePlantingTask",
        required: true
    },
    taskName: {
        type: String,
        required: true   
    },
    taskDescription: {
        type: String,
        required: true,
    },
    timeStart: {
        type: Date,
        required: true,
    },
    timeEnd: {
        type: Date,
        required: true
    }
})

export const plantArraySchema = new Schema ({
    plantId: {
        type: Schema.Types.ObjectId,
        ref: "Plant",
        required: true
    },
    plantName: {
        type: String,
        required: true
    },
    unsemi: {
        type: Number,
        required: false
    },
    compacted: {
        type: Number,
        required: false
    },
    organicMulch: {
        type: Number,
        required: false
    },
    jute: {
        type: Number,
        required: false
    },
    quanity: {
        type: Number,
        required: true
    }
});

const jobSheetSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    planterId: {
        type: Schema.Types.ObjectId,
        ref: "Planter",
        required: true,
    },
    plants: {
        type: [plantArraySchema],
        default: []

    },
    nonPlantingTask: {
        type: [nonPlantingTaskList],
        default: []
    },
    notes: {
        type: String,
        default: ""
    },
    dateCreated: {
        type: Date,
        default: new Date(),
        required: true,
    }
});

export type NonPlantingTaskArray = InferSchemaType<typeof nonPlantingTaskList>;
export type PlantArray = InferSchemaType<typeof plantArraySchema>;
type JobSheet = InferSchemaType<typeof jobSheetSchema>;
export default model<JobSheet>("JobSheet", jobSheetSchema);