import { Router } from "express";
import {
    getAllPlantsController,
    getPlantByIdController,
    createPlantController,
    updatePlantController,
    deletePlantController
} from "../controllers/plant.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validation/validators.js";
import { createPlantSchema, idSchema, updatePlantSchema } from "../validation/validationSchemas.js";

const router = Router();

router.get("/", authenticateMiddleware, getAllPlantsController);
router.get("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getPlantByIdController);
router.post("/", validateRequest({ body: createPlantSchema }), authenticateMiddleware, authorisationManagers, createPlantController);
router.put("/:_id", validateRequest({ params: idSchema, body: updatePlantSchema }), authenticateMiddleware, authorisationManagers, updatePlantController);
router.delete("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, deletePlantController);

export default router;