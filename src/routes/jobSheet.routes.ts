import { Router } from "express";
import {
    createJobSheetController,
    getAllJobSheetsController,
    getJobSheetByIdController,
    updateJobSheetController,
    getJobSheetsByJobIdController,
    deleteJobSheetController
} from "../controllers/jobSheet.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationPlanter } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateMiddleware, authorisationPlanter, createJobSheetController);
router.get("/", authenticateMiddleware, authorisationManagers, getAllJobSheetsController);
router.get("/:_id", authenticateMiddleware,getJobSheetByIdController);
router.get("/job/:_id", authenticateMiddleware, getJobSheetsByJobIdController);
router.put("/:_id", authenticateMiddleware, authorisationPlanter,updateJobSheetController);
router.delete("/:_id", authenticateMiddleware, authorisationManagers ,deleteJobSheetController);

export default router;