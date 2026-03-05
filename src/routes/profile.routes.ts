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
    createPlanterController,
    getMeController
} from "../controllers/profile.controllers.js";
import { authenticateMiddleware, authorisationManagers, authorisationPlanter } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validation/validators.js";
import { idSchema, loginSchema, signupSchema, updateProfileSchema, registerPlanterSchema, createPlanterSchema } from "../validation/validationSchemas.js";


const router = Router();

router.post('/createPlanter', validateRequest({ body: createPlanterSchema }), createPlanterController);
router.post('/registerPlanter', authenticateMiddleware, authorisationManagers, registerPlanterController)
router.put('/registerPlanter/:_id', validateRequest({ params: idSchema, body: registerPlanterSchema }), registerPlanterController)
router.post('/signup/manager', validateRequest({ body: signupSchema }), managerSignupController);
router.post('/login', validateRequest({ body: loginSchema }), planterLoginController);
router.post('/login/manager', validateRequest({ body: loginSchema }), managerLoginController);
router.get('/me', authenticateMiddleware, getMeController);
router.get('/planter', authenticateMiddleware, authorisationManagers, getAllPlantersController);
router.get('/planter/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, getPlanterProfileController);
router.get('/manager/:_id', validateRequest({ params: idSchema }), authenticateMiddleware, authorisationManagers, getManagerProfileController);
router.put('/planter/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, updatePlanterProfileController);
router.put('/manager/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), authenticateMiddleware, authorisationManagers, updateManagerProfileController);

// router.post('/createPlanter', validateRequest({ body: createPlanterSchema }), createPlanterController);
// router.put('/registerPlanter/:_id', validateRequest({ params: idSchema, body: registerPlanterSchema }), registerPlanterController)
// router.post('/signup/manager', validateRequest({ body: signupSchema }), managerSignupController);
// router.post('/login', validateRequest({ body: loginSchema }), planterLoginController);
// router.post('/login/manager', validateRequest({ body: loginSchema }), managerLoginController);
// router.get('/me', authenticateMiddleware, getMeController);
// router.get('/planter', getAllPlantersController);
// router.get('/planter/:_id', validateRequest({ params: idSchema }), getPlanterProfileController);
// router.get('/manager/:_id', validateRequest({ params: idSchema }), getManagerProfileController);
// router.put('/planter/:_id', validateRequest({ params: idSchema, body: updateProfileSchema }), updatePlanterProfileController);
// router.put('/manager/:_id', validateRequest({ body: updateProfileSchema }), updateManagerProfileController);

export default router;

