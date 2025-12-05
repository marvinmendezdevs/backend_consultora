import { Request, Response, NextFunction } from "express"
import { prisma } from "@/config/database";
import type { User } from "@/generated/prisma/client";
import { verifyTokenJwt } from "@/utils/jsonwebtoken.utils";
import { catchAsync } from "@/utils/catchAsync.utils";
import { AppError } from "@/utils/AppError";

declare global {
    namespace Express {
        interface Request {
            user?: User,
        }
    }
}

export const authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError('Debe iniciar sesión', 401);
    }

    const [, token] = authorization.split(" ");

    // Verificar el token:
    const tokenVerified = verifyTokenJwt(token!);

    if (!tokenVerified) {
        throw new AppError('Inicio de sesión no válido', 401);
    }

    const user = await prisma.user.findFirst({ where: { id: tokenVerified.id } });

    if (!user) {
        throw new AppError('Usuario no encontrado', 404);
    }

    req.user = user;
    next();
});