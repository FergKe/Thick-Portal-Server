import { Router } from "express";
import {
    createTeamLeadJobSheetController,
    getAllTeamLeadJobSheetsController,
    getTeamLeadJobSheetByIdController,
    updateTeamLeadJobSheetController,
    deleteTeamLeadJobSheetController
} from "../controllers/teamLeadJobSheet.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationTeamLead } from "../middleware/authMiddleware.js";
import { createTeamLeadJobSheetSchema, idSchema, updateTeamLeadJobSheetSchema } from "../validation/validationSchemas.js";
import { validateRequest } from "../validation/validators.js";

const router = Router();

router.post("/", validateRequest({ body: createTeamLeadJobSheetSchema }), authenticateMiddleware, authorisationTeamLead, createTeamLeadJobSheetController);
router.get("/", authenticateMiddleware, authorisationManagers, getAllTeamLeadJobSheetsController);
router.get("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getTeamLeadJobSheetByIdController);
router.put("/:_id", validateRequest({ params: idSchema, body: updateTeamLeadJobSheetSchema }), authenticateMiddleware, authorisationTeamLead, updateTeamLeadJobSheetController);
router.delete("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, deleteTeamLeadJobSheetController);

export default router;