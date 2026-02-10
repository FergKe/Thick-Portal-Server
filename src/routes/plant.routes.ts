import { Router } from "express";
import {
    getAllPlantsController,
    getPlantByIdController,
    createPlantController,
    updatePlantController,
    deletePlantController
} from "../controllers/plant.controllers.js";

const router = Router();

router.get("/", getAllPlantsController);
router.get("/:_id", getPlantByIdController);
router.post("/", createPlantController);
router.put("/:_id", updatePlantController);
router.delete("/:id", deletePlantController);

export default router;