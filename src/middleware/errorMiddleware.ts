import { type Request,
    type Response,
    type NextFunction
} from "express";
import { AppError } from "../errors/AppError.js";
import { type ErrorRes } from "../types/error.types.js";


export const errorHandlingMiddleware = (
    error: unknown,
    req: Request,
    res: Response<ErrorRes>,
    next: NextFunction
) => {
    
    if (error instanceof AppError) {
        console.error("Handled error: ", error)
        return res.status( error.statusCode ).json({
            ok:false,
            message: error.message,
            ...( process.env.NODE_ENV === 'development' && { stack: error.stack} )
        });
    }

    console.error("Unhandled error: ", error);

    return res.status(500).json({
        ok: false,
        message: "Internal Server Error",
        ...(process.env.NODE_ENV === 'development' &&
            error instanceof Error && { stack: error.stack} )
    });
};