import { Schema, model, type InferSchemaType } from "mongoose";

const nonPlantingTaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    }
});

type NonPlantingTask = InferSchemaType<typeof nonPlantingTaskSchema>;

export default model<NonPlantingTask>("NonePlantingTask", nonPlantingTaskSchema);