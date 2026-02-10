import { Router } from "express";
import {
    getAllTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController
} from "../controllers/nonPlantingTask.controllers.js";


const router = Router();

router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;