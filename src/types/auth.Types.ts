import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";

export type JwtPayloadType = JwtPayload & {
    role: string
}

export type AuthRequest = Request & {
    user: JwtPayloadType
}

