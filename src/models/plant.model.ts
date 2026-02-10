import { Schema, model, type InferSchemaType } from "mongoose";


const plantSchema = new Schema({
    plantName: {
        type: String,
        required: true,
        unique: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    unsemi: {
        type: Number,
        required: true
    },
    compacted: {
        type: Number,
        required: true
    },
    organicMulch: {
        type: Number,
        required: true
    },
    jute: {
        type: Number,
        required: true
    },
    
});

type Plant = InferSchemaType<typeof plantSchema>;

export default model<Plant>("Plant", plantSchema);