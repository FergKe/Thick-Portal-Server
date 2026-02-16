import { type NextFunction, type Request, type Response } from "express";
import {
  type UserLoginResBody,
  type UserLoginReqBody,
  type UserParams,
  type UserUpdateReqBody,
  type CreatePlanterResBody,
  type CreatePlanterReqBody,
  type RegisterPlanterReqBody,
  type ManagerSignupReqBody,
  type PlanterResBody,
  type PlanterRes,
  type ManagerResBody,
  type ManagerRes,
  type PlantersRes
} from "../types/profile.types.js";
import {
  createPlanter,
  createManager,
  loginPlanter,
  loginManager,
  getAllPlanters,
  getPlanterById,
  getManagerById,
  updatePlanter,
  updateManager,
  registerPlanter
} from "../services/profile.services.js";



export const createPlanterController = async (
  req: Request<{}, {}, CreatePlanterReqBody>,
  res: Response<CreatePlanterResBody>,
  next: NextFunction
) => {
  try {
    const planter = req.body;
    const resPlanter = await createPlanter(planter);

    res.status(201).json(resPlanter);
  } catch (error) {
    next(error);
  }
};

export const registerPlanterController = async (
  req: Request<UserParams, {}, RegisterPlanterReqBody>,
  res: Response<UserLoginResBody>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    const resPlanter = await registerPlanter(_id, body);

    res.status(201).json(resPlanter);
  } catch ( error ) {
    next(error);
  };
};

export const managerSignupController = async (
  req: Request<{}, {}, ManagerSignupReqBody>,
  res: Response<UserLoginResBody>,
  next: NextFunction
) => {
  try {
    const manager = req.body;
    const resManager = await createManager(manager);

    res.status(201).json(resManager);
  } catch (error) {
    next(error);
  };
};

export const planterLoginController = async (
  req: Request<{}, UserLoginResBody, UserLoginReqBody>,
  res: Response<UserLoginResBody>,
  next: NextFunction
) => {
  try {
    const planterLogin = req.body;
    const resLogin = await loginPlanter(planterLogin); 

    res.status(200).json(resLogin);
  } catch (error) {
    next(error);
  }
};

export const managerLoginController = async (
  req: Request<{}, UserLoginResBody,UserLoginReqBody>, 
  res: Response<UserLoginResBody>,
  next: NextFunction
) => {
  try {
    const managerLogin = req.body;
    const resLogin = await loginManager(managerLogin); 

    res.status(200).json(resLogin);
  } catch (error) {
    next(error);
  }
};

export const getAllPlantersController = async (
  req: Request<{}, PlantersRes<PlanterRes>>,
  res: Response <PlantersRes<PlanterRes>>,
  next: NextFunction
) => {
  try {
    const planters = await getAllPlanters();

    res.status(200).json(planters)
  } catch (error) {
    next(error);
  }
};

export const getPlanterProfileController = async (
  req: Request<UserParams, PlanterResBody<PlanterRes>>,
  res: Response<PlanterResBody<PlanterRes>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const planter = await getPlanterById(_id);

    res.status(200).json(planter);
  } catch (error) {
    next(error);
  }
};

export const getManagerProfileController = async (
  req: Request<UserParams, ManagerResBody<ManagerRes>>,
  res: Response<ManagerResBody<ManagerRes>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const manager = await getManagerById(_id);

    res.status(200).json(manager)
  } catch (error) {
    next(error);
  }
};

export const updatePlanterProfileController = async (
  req: Request<UserParams, PlanterResBody<PlanterRes>, UserUpdateReqBody>, 
  res: Response<PlanterResBody<PlanterRes>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    const planter = await updatePlanter(_id, body);

    res.status(200).json(planter);
  } catch (error) {
    next(error);
  }
};

export const updateManagerProfileController = async (
  req: Request<UserParams, ManagerResBody<ManagerRes>, UserUpdateReqBody>, 
  res: Response<ManagerResBody<ManagerRes>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    const manager = await updateManager(_id, body);

    res.status(200).json(manager);
  } catch (error) {
    next(error);
  }
};

