import { Router } from "express";
import {
    createJobSheetController,
    getAllJobSheetsController,
    getJobSheetByIdController,
    updateJobSheetController,
    getJobSheetsByJobIdController,
    deleteJobSheetController
} from "../controllers/jobSheet.controllers.js";

const router = Router();

router.post("/jobsheet", createJobSheetController);
router.get("/jobsheet", getAllJobSheetsController);
router.get("/jobsheet/:id", getJobSheetByIdController);
router.get("/jobsheet/job/:id", getJobSheetsByJobIdController);
router.put("/jobsheet/:id", updateJobSheetController);
router.delete("/jobsheet/:id", deleteJobSheetController);

export default router;