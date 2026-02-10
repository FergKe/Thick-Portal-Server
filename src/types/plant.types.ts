import { Types } from "mongoose";

export type PlantType = {
    _id: string,
    plantName: string,
    basePrice: number
    unsemi: number
    compacted: number
    organicMulch: number
    jute: number
};

export type PlantFromDB = {
    _id: Types.ObjectId,
    plantName: string,
    basePrice: number
    unsemi: number
    compacted: number
    organicMulch: number
    jute: number
};

export type NewPlant = {
    plantName: string,
    basePrice: number
    unsemi: number
    compacted: number
    organicMulch: number
    jute: number
};

export type PlantsRes<PlantType> = 
    | { ok: boolean; plants: Array<PlantType> }
    | { ok: boolean; message: string };

export type PlantParams = {
    _id: string,
};

export type PlantRes<PlantType> = 
    | { ok: boolean; plant: PlantType }
    | { ok: boolean; message: string };

export type CreatePlantRes<PlantType> = 
    | { ok: boolean; plant: PlantType }
    | { ok: boolean; message: string };

export type PlantCreateReq = {
    plantName: string,
    basePrice: number,
    unsemi: number,
    compacted: number,
    organicMulch: number,
    jute: number
};


export type PlantUpdateReq = Partial <{
    plantName: string,
    basePrice: number,
    unsemi: number,
    compacted: number,
    organicMulch: number,
    jute: number
}>

export type PlantDeleteRes = { ok: boolean; message: string };