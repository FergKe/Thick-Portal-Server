import Planter from "../models/planter.model.js"
import Manager from "../models/manager.model.js"
import bcrypt from "bcrypt"
import { type HydratedDocument } from "mongoose"
import {
  type NewUser,
  type UserSignupResBody,
  type UserSignupReqBody,
  type UserLoginReqBody,
  type LoginUserType,
  type UserFromDB,
  type UserType,
  type UserUpdateReqBody
} from "../types/profile.types.js";
import { AppError } from "../errors/AppError.js";
import { signToken } from "../utils/jwt.js";

export const createPlanter = async (
    planter: UserSignupReqBody
) => {
    try {
        planter.role = "planter"
        const newPlanter: HydratedDocument<NewUser> = await Planter.create(planter);
        const resPlanter: UserSignupResBody = {
            ok: true,
            username: newPlanter.username,
        };
        return resPlanter

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

export const createManager = async (
    manager: UserSignupReqBody
) => {
    try {
        const newManager: HydratedDocument<NewUser> = await Manager.create(manager);
        const resManager: UserSignupResBody = {
            ok: true,
            username: newManager.username,
        };
        return resManager

    } catch ( error: any) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Email or phone number already exists")
        };

        if( error.name === "ValidationError" ) {
            throw new AppError( 400, error.message );
        };

        throw new AppError ( 500, "Server error" );
    }
};

export const loginPlanter = async (
    planterLogin: UserLoginReqBody
) => {
    try {
        const existingPlanter = await Planter.findOne({email: planterLogin.email}).lean<LoginUserType | null>();
        
        if ( !existingPlanter ) {
            throw new AppError( 401, "Invalid email" );
        };

        if ( existingPlanter.username !== planterLogin.username ) {
            throw new AppError( 401, "Invalid username" );
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
        })

        return {ok: true, token: token};

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
        const existingManager = await Manager.findOne({email: managerLogin.email}).lean<LoginUserType | null>();
        
        if ( !existingManager ) {
            throw new AppError( 401, "Invalid email" );
        };

        if ( existingManager.username !== managerLogin.username ) {
            throw new AppError( 401, "Invalid username" );
        };

        const isPasswordMatch: Boolean = await bcrypt.compare( 
            managerLogin.password, existingManager.password
        );

        if ( !isPasswordMatch ) {
            throw new AppError( 401, "Invalid password")
        };

        const token:string = signToken({
            userId: existingManager._id.toString(),
            role: existingManager.role
        })

        return {ok: true, token: token};

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
        const planters = await Planter.find().lean<UserFromDB[] | null>();

        if ( !planters  ) {
            throw new AppError( 404, "No planters found" )
        };

        const updatedPlanter: UserType[] = planters.map((planter) => ({
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
        const planter = await Planter.findById(_id).lean<UserFromDB | null>();

        if ( !planter ) {
            throw new AppError ( 404, "No planter found")
        };

        const planterIdToString: UserType = { ...planter, _id: planter._id.toString()} 

        return { ok: true, user: planterIdToString }

    } catch ( error: any ) {
        throw new AppError( 500, "server error");
    }
};

export const getManagerById = async (
    _id: string
) => {
    try { 
        const manager = await Manager.findById(_id).lean<UserFromDB | null>();

        if ( !manager ) {
            throw new AppError ( 404, "No manager found")
        };

        const ManagerIdToString: UserType = { ...manager, _id: manager._id.toString()} 

        return { ok: true, user: ManagerIdToString }

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
        ).lean<UserFromDB| null>();

        if ( !updatedPlanter ) {
            throw new AppError( 404, "Could not find planter")
        };

        const resPlanter: UserType = {
            _id: updatedPlanter._id.toString(),
            username: updatedPlanter.username,
            email: updatedPlanter.email,
            phoneNumber: updatedPlanter.phoneNumber,
            role: updatedPlanter.role
        };

        return { ok: true, user: resPlanter }

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
        ).lean<UserFromDB | null>();

        if ( !updatedManager ) {
            throw new AppError( 404, "Could not find updatedManager")
        };

        const resupdatedManager: UserType = {
            _id: updatedManager._id.toString(),
            username: updatedManager.username,
            email: updatedManager.email,
            phoneNumber: updatedManager.phoneNumber,
            role: updatedManager.role
        };

        return { ok: true, user: resupdatedManager }

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};