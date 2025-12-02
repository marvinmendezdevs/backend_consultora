import { User } from "@/generated/prisma/client";
import { CreateTokenJwtType } from "@/types/auth.types";
import jwt, { JwtPayload } from "jsonwebtoken"

const secretJwt = process.env.AUTH_JWT_KEY!;

export const createTokenJwt = (payload: CreateTokenJwtType) => {
    return jwt.sign(payload, secretJwt, { expiresIn: '1d'});
}

export const verifyTokenJwt = (token: string) => {
    try {
        return jwt.verify(token, secretJwt) as JwtPayload;
    } catch (error) {
        return null;
    }
}