import { Router } from "express";
import {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController
} from "../controllers/job.controllers.js";
import { authenticateMiddleware, authorisationManagers } from "../middleware/authMiddleware.js";

const router = Router();
// These should be protect routes for only managers
router.post("/", authenticateMiddleware, authorisationManagers, createJobController);
router.get("/", authenticateMiddleware, authorisationManagers ,getAllJobsController); 
router.get("/:_id",authenticateMiddleware, getJobByIdController); // Apart from this one
router.put("/:_id", authenticateMiddleware, authorisationManagers, updateJobController);
router.delete("/:_id", authenticateMiddleware, authorisationManagers, deleteJobController)

export default router;