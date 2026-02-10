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


const router = Router();

router.post('/signup', planterSignupController);
router.post('/signup/manager', managerSignupController);
router.post('/login', planterLoginController);
router.post('/login/manager', managerLoginController);
router.get('/planter', getAllPlantersController)
router.get('/planter/:id', getPlanterProfileController);
router.get('/manager/:id', getManagerProfileController);
router.put('/planter/:id', updatePlanterProfileController);
router.put('/manager/:id', updateManagerProfileController);

export default router;