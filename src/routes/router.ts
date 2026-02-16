import { Router } from "express";
import profileRoutes from "./profile.routes.js";
import jobRoutes from "./job.routes.js";
import jobSheetRoutes from "./jobSheet.routes.js";
import plantRoutes from "./plant.routes.js";
import nonPlantingTaskRoutes from "./nonPlantingTask.routes.js";
import teamLeadJobSheetRoutes from "./teamLeadJobSheet.routes.js";

const router = Router();

router.use("/api/user", profileRoutes);
router.use("/api/job", jobRoutes);
router.use("/api/jobSheet", jobSheetRoutes);
router.use("/api/plant", plantRoutes);
router.use("/api/nonPlantingTask", nonPlantingTaskRoutes);
router.use("/api/teamleadjobsheet", teamLeadJobSheetRoutes);

export default router;