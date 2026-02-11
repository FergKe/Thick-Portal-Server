import { Router } from "express";
import {
    createTeamLeadJobSheetController,
    getAllTeamLeadJobSheetsController,
    getTeamLeadJobSheetByIdController,
    updateTeamLeadJobSheetController,
    deleteTeamLeadJobSheetController
} from "../controllers/teamLeadJobSheet.controllers.js";

const router = Router();

router.post("/teamleadjobsheet", createTeamLeadJobSheetController);
router.get("/teamleadjobsheet", getAllTeamLeadJobSheetsController);
router.get("/teamleadjobsheet/:id", getTeamLeadJobSheetByIdController);
router.put("/teamleadjobsheet/:id", updateTeamLeadJobSheetController);
router.delete("/teamleadjobsheet/:id", deleteTeamLeadJobSheetController);

export default router;