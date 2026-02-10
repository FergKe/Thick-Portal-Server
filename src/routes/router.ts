import { Router } from "express";
import profileRoutes from "./profile.routes.js"
import jobRoutes from "./job.routes.js"
import jobSheetRoutes from "./jobSheet.routes.js"
import plantRoutes from "./plant.routes.js"
import nonPlantingTaskRoutes from "./nonPlantingTask.routes.js"

const router = Router();

router.use("/user", profileRoutes);
router.use("/job", jobRoutes);
router.use("/jobSheet", jobSheetRoutes);
router.use("/plant", plantRoutes);
router.use("/nonPlantingTask", nonPlantingTaskRoutes);


export default router