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

export const createPlantSchema = Joi.object({
    plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    basePrice: Joi.number().required(),
    unsemi: Joi.number().required(),
    compacted: Joi.number().required(),
    organicMulch: Joi.number().required(),
    jute: Joi.number().required(),
});

export const updatePlantSchema = Joi.object({
    plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).optional(),
    basePrice: Joi.number().optional(),
    unsemi: Joi.number().optional(),
    compacted: Joi.number().optional(),
    organicMulch: Joi.number().optional(),
    jute: Joi.number().optional(),
});

export const idSchema = Joi.object({
    _id: Joi.string().hex().length(24).required()
});

export const createTaskSchema = Joi.object({
    taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    pricePerHour: Joi.number().required(),
});

export const updateTaskSchema = Joi.object({
    taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    pricePerHour: Joi.number().required(),
});

export const createJobSchema = Joi.object({
    jobName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    client: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    location: Joi.string().min(3).max(50).pattern(/^[a-zA-Z0-9_]+$/).required(),
    description: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
    crew: Joi.array().items(Joi.string().hex().length(24)).required(),
    teamLead: Joi.string().hex().length(24).required(),
});

export const updateJobSchema = Joi.object({
    description: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
    crew: Joi.array().items(Joi.string().hex().length(24)).required(),
    teamLead: Joi.string().hex().length(24).required(),
    jobSheets: Joi.array().items(Joi.string().hex().length(24)).required(),
    status: Joi.string().valid(['in_progress', 'completed']).required(),
});

export const createJobSheetSchema = Joi.object({
    jobId: Joi.string().hex().length(24).required(),
    planterId: Joi.string().hex().length(24).required(),
    plants: Joi.array().items(Joi.object({
        plantId: Joi.string().hex().length(24).required(),
        plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        quantity: Joi.number().required(),
        basePrice: Joi.number().optional(),
        unsemi: Joi.number().optional(),
        compacted: Joi.number().optional(),
        organicMulch: Joi.number().optional(),
        jute: Joi.number().optional(),
    })).optional(),
    nonPlantingTask: Joi.array().items(Joi.object({
        taskId: Joi.string().hex().length(24).required(),
        taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        taskDescription: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
        timeStart: Joi.date().required(),
        timeEnd: Joi.date().required(),
    })).optional(),
    notes: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
});

export const updateJobSheetSchema = Joi.object({
    plants: Joi.array().items(Joi.object({
        plantId: Joi.string().hex().length(24).required(),
        plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        quantity: Joi.number().required(),
        basePrice: Joi.number().optional(),
        unsemi: Joi.number().optional(),
        compacted: Joi.number().optional(),
        organicMulch: Joi.number().optional(),
        jute: Joi.number().optional(),
    })).optional(),
    nonPlantingTask: Joi.array().items(Joi.object({
        taskId: Joi.string().hex().length(24).required(),
        taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        taskDescription: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
        timeStart: Joi.date().required(),
        timeEnd: Joi.date().required(),
    })).optional(),
    notes: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).optional(),
});

export const createTeamLeadJobSheetSchema = Joi.object({
    jobId: Joi.string().hex().length(24).required(),
    teamLeadId: Joi.string().hex().length(24).required(),
    clientName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    plants: Joi.array().items(Joi.object({
        plantId: Joi.string().hex().length(24).required(),
        plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        quantity: Joi.number().required(),
        basePrice: Joi.number().optional(),
        unsemi: Joi.number().optional(),
        compacted: Joi.number().optional(),
        organicMulch: Joi.number().optional(),
        jute: Joi.number().optional(),
    })).optional(),
    nonPlantingTask: Joi.array().items(Joi.object({
        taskId: Joi.string().hex().length(24).required(),
        taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        taskDescription: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
        timeStart: Joi.date().required(),
        timeEnd: Joi.date().required(),
    })).optional(),
    notes: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
});

export const updateTeamLeadJobSheetSchema = Joi.object({
    clientName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
    plants: Joi.array().items(Joi.object({
        plantId: Joi.string().hex().length(24).required(),
        plantName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        quantity: Joi.number().required(),
        basePrice: Joi.number().optional(),
        unsemi: Joi.number().optional(),
        compacted: Joi.number().optional(),
        organicMulch: Joi.number().optional(),
        jute: Joi.number().optional(),
    })).optional(),
    nonPlantingTask: Joi.array().items(Joi.object({
        taskId: Joi.string().hex().length(24).required(),
        taskName: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/).required(),
        taskDescription: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).required(),
        timeStart: Joi.date().required(),
        timeEnd: Joi.date().required(),
    })).optional(),
    notes: Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_]+$/).optional(),
});