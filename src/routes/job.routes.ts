import { Router } from "express";
import {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController
} from "../controllers/job.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validation/validators.js";
import { createJobSchema, idSchema } from "../validation/validationSchemas.js";

const router = Router();
// These should be protect routes for only managers
router.post("/", validateRequest({ body: createJobSchema }), authenticateMiddleware, authorisationManagers, createJobController);
router.get("/", authenticateMiddleware, authorisationManagers, getAllJobsController);
router.get("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, getJobByIdController); // Apart from this one
router.put("/:_id", validateRequest({ body: createJobSchema, params: idSchema }), authenticateMiddleware, authorisationManagers, updateJobController);
router.delete("/:_id", validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, deleteJobController);

export default router;