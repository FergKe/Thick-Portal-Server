import { Router } from "express";
import {
    planterSignupController,
    managerSignupController,
    planterLoginController,
    managerLoginController,
    getAllPlantersController,
    getPlanterProfileController,
    getManagerProfileController,
    updatePlanterProfileController,
    updateManagerProfileController
} from "../controllers/profile.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationPlanter } from "../middleware/authMiddleware.js";


const router = Router();

router.post('/signup', planterSignupController);
router.post('/signup/manager', managerSignupController);
router.post('/login', planterLoginController);
router.post('/login/manager', managerLoginController);
router.get('/planter', authenticateMiddleware, authorisationManagers, getAllPlantersController)
router.get('/planter/:_id', authenticateMiddleware, getPlanterProfileController);
router.get('/manager/:_id', authenticateMiddleware, authorisationManagers, getManagerProfileController);
router.put('/planter/:_id', authenticateMiddleware, authorisationPlanter, updatePlanterProfileController);
router.put('/manager/:_id', authenticateMiddleware, authorisationManagers, updateManagerProfileController);

export default router;