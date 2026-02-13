import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../errors/AppError.js";

interface ValidationSchemas {
    body?: Joi.ObjectSchema,
    params?: Joi.ObjectSchema
};

export const validateRequest = ( schema: ValidationSchemas = {}) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if ( schema.body ) {
            const { error, value } = schema.body.validate( req.body );

            if ( error ) {
                throw new AppError( 400 ,error.message );
            };
            req.body = value;
        };

        if ( schema.params ) {
            const { error, value } = schema.params.validate( req.params );

            if ( error ) {
                throw new AppError( 400 ,error.message );
            };
            req.params = value;
        };
        next()
    };
};
