import { Schema, model, type InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const managerSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
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

type Manager = InferSchemaType<typeof managerSchema>;

export default model<Manager>("Manager", managerSchema); 