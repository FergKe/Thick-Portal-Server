import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import type { AuthRequest, JwtPayloadType } from "../types/auth.Types.js";

const getCookie = (req: Request, name: string): string | undefined => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return undefined;
    
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const parts = cookie.trim().split('=');
        const key = parts[0];
        const value = parts[1];
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>);
    
    return cookies[name];
};

export const authenticateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = getCookie(req, 'token');

        if (!token) {
            throw new AppError(401, "Missing authentication token");
        }

        const decoded: JwtPayloadType = verifyToken(token);

        (req as AuthRequest).user = decoded;

        next();

    } catch ( error: any ) {
        if ( error instanceof AppError ) throw error;

        throw new AppError( 403, "Invalid or expired token");
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