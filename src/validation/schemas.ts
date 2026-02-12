import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^(?:\+61|0)[2-478](?:[ -]?\d){8}$/).required(),

    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    email: Joi.string().email().required(),

    role: Joi.string().valid(['manager', 'planter', 'teamLead']).required(),
});

export const updateProfileSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).optional(),
    phoneNumber: Joi.string().pattern(/^(?:\+61|0)[2-478](?:[ -]?\d){8}$/).optional()
})

export const createPlantSchema =