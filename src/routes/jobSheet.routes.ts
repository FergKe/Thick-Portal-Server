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
import { validateRequest } from "../validation/validators.js";
import { createJobSheetSchema, idSchema, updateJobSheetSchema } from "../validation/validationSchemas.js";

const router = Router();

router.post("/", validateRequest({ body: createJobSheetSchema }), authenticateMiddleware, authorisationPlanter, createJobSheetController);
router.get("/", authenticateMiddleware, authorisationManagers, getAllJobSheetsController);
router.get("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, getJobSheetByIdController);
router.get("/job/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, getJobSheetsByJobIdController);
router.put("/:_id", validateRequest({ params: idSchema, body: updateJobSheetSchema }), authenticateMiddleware, authorisationPlanter, updateJobSheetController);
router.delete("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, deleteJobSheetController);

export default router;