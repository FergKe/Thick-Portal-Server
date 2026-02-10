import { Router } from "express";
import {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController
} from "../controllers/job.controllers.js";

const router = Router();
// These should be protect routes for only managers
router.post("/job", createJobController);
router.get("/job", getAllJobsController); // Apart from this one
router.get("/job/:id", getJobByIdController);
router.put("/job/:id", updateJobController);
router.delete("job/:id", deleteJobController)

export default router;