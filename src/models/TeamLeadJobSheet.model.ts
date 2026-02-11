import { Schema, model, type InferSchemaType } from "mongoose";
import {
    plantArraySchema,
    nonPlantingTaskList 
} from "./jobSheet.model.js";

const teamLeadJobSheetSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    teamLeadId: {
        type: Schema.Types.ObjectId,
        ref: "Planter",
        required: true,
    },
    plants: {
        type: [plantArraySchema],
        default: [],

    },
    nonePlantingTask: {
        type: [nonPlantingTaskList],
        default: [],

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

type TeamLeadJobSheet = InferSchemaType<typeof teamLeadJobSheetSchema>;
export default model<TeamLeadJobSheet>("TeamLeadJobSheet", teamLeadJobSheetSchema);