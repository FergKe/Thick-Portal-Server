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
import { validateRequest } from "../validation/validators.js";
import { idSchema, loginSchema, signupSchema, updateProfileSchema } from "../validation/validationSchemas.js";


const router = Router();

router.post('/signup', validateRequest({ body: signupSchema }), planterSignupController);
router.post('/signup/manager', validateRequest({ body: signupSchema }), managerSignupController);
router.post('/login', validateRequest({ body: loginSchema }), planterLoginController);
router.post('/login/manager', validateRequest({ body: loginSchema }), managerLoginController);
router.get('/planter', authenticateMiddleware, authorisationManagers, getAllPlantersController);
router.get('/planter/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, getPlanterProfileController);
router.get('/manager/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getManagerProfileController);
router.put('/planter/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, authorisationPlanter, updatePlanterProfileController);
router.put('/manager/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, authorisationManagers, updateManagerProfileController);

export default router;