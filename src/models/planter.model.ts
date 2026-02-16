import { Schema, model, type InferSchemaType } from "mongoose";

const planterSchema = new Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    role: {
        type: String,
        enum: ["planter", "teamLead"],
        default: "planter",
    },
});

export type PlanterType = InferSchemaType<typeof planterSchema>;

export default model<PlanterType>("Planter", planterSchema); 