import Planter from "../models/planter.model.js"
import Manager from "../models/manager.model.js"
import bcrypt from "bcrypt"
import { type HydratedDocument } from "mongoose"
import {

  type UserLoginReqBody,
  type UserUpdateReqBody,
  type CreatePlanterResBody,
  type CreatePlanterReqBody,
  type RegisterPlanterReqBody,
  type ManagerSignupReqBody,
  type PlanterFromDB,
  type PlanterRes,
  type ManagerRes,
  type ManagerFromDB,
  type LoginPlanterType,
  type LoginManagerType,
  type ManagerCleanReqBody
} from "../types/profile.types.js";
import { AppError } from "../errors/AppError.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import type { JwtPayloadType } from "../types/auth.Types.js";
import { sendPlanterInvite } from "../utils/serviceFunction.js";

export const createPlanter = async (
    planter: CreatePlanterReqBody
) => {
    try {
        const newPlanter = await Planter.create(planter);
        sendPlanterInvite(planter.email, newPlanter._id.toString())

        return {
            ok: true,
            message: `Invitation email sent successfully to ${planter.email}.`,
        };

    } catch ( error: any) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Email or phone number already exists")
        };

        if( error.name === "ValidationError" ) {
            throw new AppError( 400, "Invalid data" );
        };

        throw new AppError ( 500, "Server error" );
    }
};

export const registerPlanter = async (
    _id: string,
    body: RegisterPlanterReqBody
) => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 8);
        body.password = hashedPassword;

        const registeredPlanter = await Planter.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<PlanterFromDB | null>();

        if ( !registeredPlanter ) {
            throw new AppError( 404, "Could not find Planter")
        };

        const token:string = signToken({
            sub: registeredPlanter._id.toString(),
            role: registeredPlanter.role
        })

        return { ok: true, token: token };

    } catch ( error ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error" );
    }
};

export const createManager = async (
    manager: ManagerSignupReqBody
) => {
    try {
        const cleanManager: ManagerCleanReqBody = {
            username: manager.username,
            email: manager.email,
            password: manager.password,
        }
        console.log(cleanManager);
        const newManager: HydratedDocument<ManagerFromDB> = await Manager.create(cleanManager);
        console.log(newManager);
        const token:string = signToken({
            userId: newManager._id.toString(),
            role: newManager.role
        });

        const resManager = {
            _id: newManager._id.toString(),
            username: newManager.username,
            email: newManager.email,
            role: newManager.role
        };

        return { ok: true, token: token, user: resManager }

    } catch ( error: any) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Email or phone number already exists")
        };

        if( error.name === "ValidationError" ) {
            throw new AppError( 400, error.message );
        };

        throw new AppError ( 500, `${error.message}` );
    }
};

export const loginPlanter = async (
    planterLogin: UserLoginReqBody
) => {
    try {
        const existingPlanter = await Planter.findOne({email: planterLogin.email}).lean<LoginPlanterType | null>();
        
        if ( !existingPlanter ) {
            throw new AppError( 401, "Invalid email" );
        };

        const isPasswordMatch: Boolean = await bcrypt.compare( 
            planterLogin.password, existingPlanter.password
        );

        if ( !isPasswordMatch ) {
            throw new AppError( 401, "Invalid password")
        };

        const token:string = signToken({
            sub: existingPlanter._id.toString(),
            role: existingPlanter.role
        });
        
        const resPlanter = {
            ...existingPlanter,
            _id: existingPlanter._id.toString(),
        };


        return {ok: true, token: token, user: resPlanter};

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        if ( error.name === "ValidationError" ) {
            throw new AppError( 400, error.message );
        };

        throw new AppError( 500, "Server error" );
    }
};

export const loginManager = async (
    managerLogin: UserLoginReqBody
) => {
    try {
        const existingManager = await Manager.findOne({email: managerLogin.email}).lean<LoginManagerType | null>();
        
        if ( !existingManager ) {
            throw new AppError( 401, "Invalid email" );
        };

        const isPasswordMatch: Boolean = await bcrypt.compare( 
            managerLogin.password, existingManager.password
        );

        if ( !isPasswordMatch ) {
            throw new AppError( 401, "Invalid password")
        };

        const resManager = {
            ...existingManager,
            _id: existingManager._id.toString(),
        };

        const token:string = signToken({
            userId: existingManager._id.toString(),
            role: existingManager.role
        })

        return {ok: true, token: token, user: resManager};

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        if ( error.name === "ValidationError" ) {
            throw new AppError( 400, error.message );
        };

        throw new AppError( 500, "Server error" );
    }
};

export const getAllPlanters = async () => {
    try {
        const planters = await Planter.find().lean<PlanterFromDB[] | null>();

        if ( !planters  ) {
            throw new AppError( 404, "No planters found" )
        };

        const updatedPlanter: PlanterRes[] = planters.map((planter) => ({
            ...planter,
            _id: planter._id.toString()
        }))

        return { ok: true, planters: updatedPlanter };

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError ( 500, "Server error" );
    };
};

export const getPlanterById = async (
    _id: string
) => {
    try { 
        const planter = await Planter.findById(_id).lean<PlanterFromDB | null>();

        if ( !planter ) {
            throw new AppError ( 404, "No planter found")
        };

        const planterIdToString: PlanterRes = { ...planter, _id: planter._id.toString()};

        return { ok: true, planter: planterIdToString }

    } catch ( error: any ) {
        throw new AppError( 500, "server error");
    }
};

export const getManagerById = async (
    _id: string
) => {
    try { 
        const manager = await Manager.findById(_id).lean<ManagerFromDB| null>();

        if ( !manager ) {
            throw new AppError ( 404, "No manager found")
        };

        const ManagerIdToString: ManagerRes = { ...manager, _id: manager._id.toString()} 

        return { ok: true, manager: ManagerIdToString }

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "server error");
    }
};

export const updatePlanter = async (
    _id: string,
    body: UserUpdateReqBody
) => {
    try {
        const updatedPlanter= await Planter.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<PlanterFromDB| null>();

        if ( !updatedPlanter ) {
            throw new AppError( 404, "Could not find planter")
        };

        const resPlanter: PlanterRes = {
            ...updatedPlanter,
            _id: updatedPlanter._id.toString(),
        };

        return { ok: true, planter: resPlanter }

    } catch ( error: any ){
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};

export const updateManager = async (
    _id: string,
    body: UserUpdateReqBody
) => {
    try {
        const updatedManager = await Manager.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<ManagerFromDB | null>();

        if ( !updatedManager ) {
            throw new AppError( 404, "Could not find updatedManager")
        };

        const resupdatedManager: ManagerRes = {
            ...updatedManager,
            _id: updatedManager._id.toString(),
        };

        return { ok: true, manager: resupdatedManager };

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};

export const getMeProfile = async (token: string) => {
    try {
        const payload: JwtPayloadType = verifyToken(token);
        const id = payload.sub
        const role = payload.role;

        if (!id) {
            throw new AppError(401, "Invalid token payload");
        }

        if (role === "manager") {
            const manager = await Manager.findById(id).lean<ManagerFromDB | null>();
            if (!manager) {
                throw new AppError(404, "Manager not found");
            }
            return { ok: true, profile: { ...manager, _id: manager._id.toString() } };
        } else if (role === "planter" || role === "teamlead") {
            const planter = await Planter.findById(id).lean<PlanterFromDB | null>();
            if (!planter) {
                throw new AppError(404, "Planter not found");
            }
            return { ok: true, profile: { ...planter, _id: planter._id.toString() } };
        } else {
            throw new AppError(403, "Invalid role");
        }
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError(401, "Invalid or expired token");
    }
};