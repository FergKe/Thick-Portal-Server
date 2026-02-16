import { Router } from "express";
import {
    registerPlanterController,
    managerSignupController,
    planterLoginController,
    managerLoginController,
    getAllPlantersController,
    getPlanterProfileController,
    getManagerProfileController,
    updatePlanterProfileController,
    updateManagerProfileController,
    createPlanterController
} from "../controllers/profile.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationPlanter } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validation/validators.js";
import { idSchema, loginSchema, signupSchema, updateProfileSchema } from "../validation/validationSchemas.js";


const router = Router();

router.post('/createPlanter', validateRequest({ body: signupSchema }), createPlanterController);
router.post('/registerPlanter', registerPlanterController)
router.post('/signup/manager', validateRequest({ body: signupSchema }), managerSignupController);
router.post('/login', validateRequest({ body: loginSchema }), planterLoginController);
router.post('/login/manager', validateRequest({ body: loginSchema }), managerLoginController);
router.get('/planter', authenticateMiddleware, authorisationManagers, getAllPlantersController);
router.get('/planter/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, getPlanterProfileController);
router.get('/manager/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getManagerProfileController);
router.put('/planter/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, authorisationPlanter, updatePlanterProfileController);
router.put('/manager/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, authorisationManagers, updateManagerProfileController);

export default router;

// Manager creates Planter through email - Protected route for managers only
// Planter gets email to register account (User Name, Password and PhoneNubmer) updateUser Api call 
