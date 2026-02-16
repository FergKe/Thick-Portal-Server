import { Schema, model, type InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const managerSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    role: {
        type: String,
        enum: ["manager"],
        immutable: true,
        default: "manager",
    },
});

managerSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 8);
});

export type ManagerType = InferSchemaType<typeof managerSchema>;

export default model<ManagerType>("Manager", managerSchema); 