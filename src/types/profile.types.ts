import { Types } from "mongoose";

export type UserFromDB = {
    _id: Types.ObjectId
    username: string,
    email: string,
    phoneNumber?: string
    role: string
};


export type LoginUserType = {
     _id: Types.ObjectId
    username: string,
    email: string,
    password: string,
    phoneNumber: string
    role: string
};

export type UserParams = {
    _id: string,
};



export type UserLoginReqBody = {
    password: string,
    email: string,
};

export type UserLoginResBody = 
    | { ok: boolean; token: string, }
    | { ok: boolean; message: string};

export type LoginReqBody = {
    username: string,
    password: string,
    email: string,
};

export type UserUpdateReqBody = Partial <{
    username: string,
    phoneNumber: string,
}>;

export type RegisterPlanterReqBody = {
    username: string,
    password: string,
    phoneNumber: string
};

export type PlanterRes = {
    _id: string,
    username?: string | undefined,
    email: string,
    phoneNumber?: string | undefined
    role: "planter" | "teamLead"
};

export type PlanterFromDB = {
    _id: Types.ObjectId
    username?: string,
    email: string,
    phoneNumber?: string
    role: "planter" | "teamLead"
};

export type LoginPlanterType = {
    _id: Types.ObjectId
    username?: string,
    email: string,
    password: string,
    phoneNumber?: string
    role: "planter" | "teamLead"
};

export type PlanterResBody<PlanterRes> =
    | { ok: boolean; planter: PlanterRes }
    | { ok: boolean; message: string };

    
export type CreatePlanterReqBody = {
    email: string,
};

export type CreatePlanterResBody = {
    ok: boolean; message: string
};

export type PlantersRes<PlanterRes> = 
    | { ok: boolean; planters: Array<PlanterRes> }
    | { ok: boolean; message: string }


export type ManagerFromDB = {
    _id: Types.ObjectId,
    username: string,
    email: string,
    phoneNumber?: string | null,
    role: "manager"
};

export type LoginManagerType = {
    _id: Types.ObjectId,
    username: string,
    email: string,
    password: string,
    phoneNumber?: string | null,
    role: "manager"
}

export type ManagerRes = {
    _id: string,
    username: string,
    email: string,
    phoneNumber?: string | null
    role: "manager"
};

export type ManagerResBody<ManagerRes> =
    | { ok: boolean; manager: ManagerRes }
    | { ok: boolean; message: string };

export type ManagerSignupReqBody = {
    username: string,
    password: string,
    email: string,
};
