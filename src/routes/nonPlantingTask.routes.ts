import { Router } from "express";
import {
    getAllTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController
} from "../controllers/nonPlantingTask.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validation/validators.js";
import { createTaskSchema, idSchema, updateTaskSchema } from "../validation/validationSchemas.js";


const router = Router();

router.get("/", authenticateMiddleware, getAllTasksController);
router.get("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getTaskByIdController);
router.post("/", validateRequest({ body: createTaskSchema }), authenticateMiddleware, authorisationManagers, createTaskController);
router.put("/:_id", validateRequest({ params: idSchema, body: updateTaskSchema }), authenticateMiddleware, authorisationManagers, updateTaskController);
router.delete("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, deleteTaskController);

export default router;