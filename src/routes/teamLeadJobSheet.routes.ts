import { Router } from "express";
import {
    createTeamLeadJobSheetController,
    getAllTeamLeadJobSheetsController,
    getTeamLeadJobSheetByIdController,
    updateTeamLeadJobSheetController,
    deleteTeamLeadJobSheetController
} from "../controllers/teamLeadJobSheet.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationTeamLead } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateMiddleware, authorisationTeamLead, createTeamLeadJobSheetController);
router.get("/",authenticateMiddleware, authorisationManagers, getAllTeamLeadJobSheetsController);
router.get("/:_id",authenticateMiddleware, authorisationManagers, getTeamLeadJobSheetByIdController);
router.put("/:_id", authenticateMiddleware, authorisationTeamLead, updateTeamLeadJobSheetController);
router.delete("/:_id", authenticateMiddleware, authorisationManagers, deleteTeamLeadJobSheetController);

export default router;