import { type NextFunction, type Request, type Response } from "express";
import {
  type PlantType,
  type PlantsRes,
  type PlantParams,
  type PlantRes,
  type PlantCreateReq,
  type PlantUpdateReq,
  type PlantDeleteRes,
  type NewPlant
} from "../types/plant.types.js";
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant
} from "../services/plant.services.js"

export const getAllPlantsController = async (
  req: Request<{}, PlantsRes<PlantType>>,
  res: Response<PlantsRes<PlantType>>,
  next: NextFunction
) => {
  try {
    const plants = await getAllPlants();

    res.status(200).json(plants);
  } catch (error) {
    return next(error);
  };
};

export const getPlantByIdController = async (
  req: Request<PlantParams, PlantRes<PlantType>>,
  res: Response<PlantRes<PlantType>>,
  next: NextFunction
) => {
  try {

    const { _id } = req.params;
    const plant = await getPlantById(_id);

    res.status(200).json(plant);
  } catch (error) {
    return next(error);
  };
};

export const createPlantController = async (
  req: Request<{}, PlantRes<PlantType>, PlantCreateReq>,
  res: Response<PlantRes<PlantType>>,
  next: NextFunction
) => {
  try {
    console.log("here");
    const data = req.body;
    const newPlant = await createPlant(data);

    res.status(201).json(newPlant);
  } catch (error) {
    return next(error);
  }
};

export const updatePlantController = async (
  req: Request<PlantParams, PlantRes<PlantType>, PlantUpdateReq>,
  res: Response<PlantRes<PlantType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const data = req.body;
    const updatedPlant = await updatePlant(_id, data)

    res.status(200).json(updatedPlant);
  } catch (error) {
    return next(error);
  }
};

export const deletePlantController = async (
  req: Request<PlantParams, PlantDeleteRes>,
  res: Response<PlantDeleteRes>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const result = await deletePlant(_id);

    res.status(204).json(result);
  } catch (error) {
    return next(error);
  }
};
