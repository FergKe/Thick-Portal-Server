import Plant from "../models/plant.model.js"
import {
    type HydratedDocument,
    type DeleteResult
} from "mongoose";
import {
    type CreatePlantRes,
    type NewPlant,
    type PlantCreateReq,
    type PlantFromDB,
    type PlantType,
    type PlantUpdateReq,
} from "../types/plant.types.js";
import { AppError } from "../errors/AppError.js";

export const getAllPlants = async () => {
    try {
        const plants = await Plant.find().lean<PlantFromDB[] | null>();

        if ( !plants ) { 
            throw new AppError(404, "Plants not found")
        };

        const plantsIdToString: PlantType[] = plants.map((plant) => ({
            ...plant,
            _id: plant._id.toString()
        }));

        return { ok: true , plants: plantsIdToString }
        
    } catch ( error: any )  {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const getPlantById = async (
    _id: string
) => {
    try {
        const plant = await Plant.findById(_id).lean<PlantFromDB | null>();

        // Possible this does not catch, might need to change later
        if ( !plant ) {
            throw new AppError(404, "Plant not found");
        };

        const plantIdToString: PlantType = { ...plant, _id: plant._id.toString()};

        return { ok: true , plant: plantIdToString };

    } catch ( error: any ) {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const createPlant = async (
    data: PlantCreateReq
) => {
        try {
            const newPlant: HydratedDocument<NewPlant> = await Plant.create(data);
            
            
            const resPlant: PlantType = {
                _id: newPlant._id.toString(),
                plantName: newPlant.plantName,
                basePrice: newPlant.basePrice,
                unsemi: newPlant.unsemi,
                compacted: newPlant.compacted,
                organicMulch: newPlant.organicMulch,
                jute: newPlant.jute,
            }
            return { ok: true, plant: resPlant }
    
        } catch ( error: any) {
            if ( error.code === 110000 ) {
                throw new AppError( 409, "Plant already Exists")
            };
    
            if( error.name === "ValidationError" ) {
                throw new AppError( 400, "Invalid data" );
            };
    
            throw new AppError ( 500, "Server error" );
        }
};

export const updatePlant = async (
    _id: string,
    body: PlantUpdateReq
) => {
    try {
            const updatedPlant = await Plant.findByIdAndUpdate(
                _id,
                body,
                { new: true }
            ).lean<PlantFromDB| null>();
    
            if ( !updatedPlant ) {
                throw new AppError( 404, "Could not find planter");
            };
    
            const resPlant: PlantType = {
                _id: updatedPlant._id.toString(),
                plantName: updatedPlant.plantName,
                basePrice: updatedPlant.basePrice,
                unsemi: updatedPlant.unsemi,
                compacted: updatedPlant.compacted,
                organicMulch: updatedPlant.organicMulch,
                jute: updatedPlant.jute
            };
    
            return { ok: true, plant: resPlant }
    
        } catch ( error: any ){
            if ( error instanceof AppError ) throw error;
    
            throw new AppError( 500, "Server Error");
        }
};

export const deletePlant = async (
    _id: string
) => {
    try {
        const deletedPlant: DeleteResult = await Plant.deleteOne({ _id: _id })

        if ( deletedPlant.deletedCount === 0 ) {
            throw new AppError(400, "Could not delete plant");
        };

        return { ok: true, message: "Plant deleted successfully" }
    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;
    
        throw new AppError( 500, "Server Error");
    }
};
