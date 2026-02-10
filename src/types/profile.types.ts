import { Types } from "mongoose";

export type UserType = {
    _id: string
    username: string,
    email: string,
    phoneNumber: string
    role: string
};


export type UserFromDB = {
    _id: Types.ObjectId
    username: string,
    email: string,
    phoneNumber: string
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

export type UserRes<UserType> = 
    | { ok: boolean; user: UserType}
    | { ok: boolean; message: string };

export type UsersRes<UserType> = 
    | { ok: boolean; planters: Array<UserType> }
    | { ok: boolean; message: string }

export type UserSignupReqBody = {
    username: string,
    password: string,
    email: string,
    phoneNumber: string
};

export type NewUser = {
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: string
};
// Will edit this later
export type UserSignupResBody = 
    | { ok: boolean; username: string }
    | { ok: boolean; message: string };

export type UserLoginReqBody = {
    username: string,
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
