import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import type { AuthRequest, JwtPayloadType } from "../types/auth.Types.js";


export const authenticateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const header: string | undefined = req.headers.authorization;
    
        if ( !header || !header.startsWith("Bearer")) {
            throw new AppError( 401, "Missing authorization header")
        };

        const token: string | undefined = header.split(" ")[1];

        if (!token) throw new AppError(401, "Invalid token");

        const decoded: JwtPayloadType = verifyToken(token);

        (req as AuthRequest).user = decoded;

        next();

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 403, "Server Error");
    };
    
};

export const authorisationManagers = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = (req as AuthRequest).user;
    if ( !user || user.role !== "manager" ) {
        throw new AppError( 403, "Forbidden access / Not a manager ");
    };
    next();
};
export const authorisationPlanter = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = (req as AuthRequest).user;
    if ( !user || (user.role !== "planter" && user.role !== "teamLead") ) {
        throw new AppError( 403, "Forbidden access / Not a Planter ");
    };
    next();
};

export const authorisationTeamLead = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = (req as AuthRequest).user;
    if ( !user || user.role !== "teamLead" ) {
        throw new AppError( 403, "Forbidden access / Not a Planter ");
    };
    next();
};