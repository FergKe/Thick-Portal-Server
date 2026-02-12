import { Router } from "express";
import {
    getAllPlantsController,
    getPlantByIdController,
    createPlantController,
    updatePlantController,
    deletePlantController
} from "../controllers/plant.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateMiddleware, getAllPlantsController);
router.get("/:_id", authenticateMiddleware, authorisationManagers, getPlantByIdController);
router.post("/", authenticateMiddleware, authorisationManagers, createPlantController);
router.put("/:_id", authenticateMiddleware, authorisationManagers, updatePlantController);
router.delete("/:_id", authenticateMiddleware, authorisationManagers, deletePlantController);

export default router;