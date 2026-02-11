import { Router } from "express";
import profileRoutes from "./profile.routes.js"
import jobRoutes from "./job.routes.js"
import jobSheetRoutes from "./jobSheet.routes.js"
import plantRoutes from "./plant.routes.js"
import nonPlantingTaskRoutes from "./nonPlantingTask.routes.js"
import teamLeadJobSheetRoutes from "./teamLeadJobSheet.routes.js"

const router = Router();

router.use("/user", profileRoutes);
router.use("/job", jobRoutes);
router.use("/jobSheet", jobSheetRoutes);
router.use("/plant", plantRoutes);
router.use("/nonPlantingTask", nonPlantingTaskRoutes);
router.use("/teamleadjobsheet", teamLeadJobSheetRoutes);

export default router