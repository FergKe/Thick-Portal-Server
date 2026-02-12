import { Router } from "express";
import {
    getAllTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController
} from "../controllers/nonPlantingTask.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", authenticateMiddleware, getAllTasksController);
router.get("/:_id", authenticateMiddleware, authorisationManagers,getTaskByIdController);
router.post("/", authenticateMiddleware, authorisationManagers, createTaskController);
router.put("/:_id", authenticateMiddleware, authorisationManagers, updateTaskController);
router.delete("/:_id", authenticateMiddleware, authorisationManagers, deleteTaskController);

export default router;