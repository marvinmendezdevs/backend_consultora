import { RegisterData } from "@/types/auth.types"
import jwt from "jsonwebtoken"

type CreateTokenJwtType = Omit<RegisterData, 'password'>
const secretJwt = process.env.AUTH_JWT_KEY!;

export const createTokenJwt = (payload: CreateTokenJwtType) => {
    return jwt.sign(payload, secretJwt, { expiresIn: '1d'});
}