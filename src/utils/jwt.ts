import  jwt  from "jsonwebtoken";
import { type JwtPayloadType } from "../types/auth.Types.js";
import { AppError } from "../errors/AppError.js";

export const signToken = (payload: JwtPayloadType) => {
    if ( !process.env.JWT_SECRET ) {
        throw new AppError( 500, "JWT secret not found" );
    };
    return jwt.sign( payload, process.env.JWT_SECRET)
}