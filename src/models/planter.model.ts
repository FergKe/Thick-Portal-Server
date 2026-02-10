import { Schema, model, type InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const planterSchema = new Schema({
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
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["planter", "teamLead"],
        default: "planter",
    },
});

planterSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 8);
});

type Planter = InferSchemaType<typeof planterSchema>;

export default model<Planter>("Planter", planterSchema); 