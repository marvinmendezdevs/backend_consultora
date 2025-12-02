import { Request, Response, NextFunction } from "express"
import { prisma } from "@/config/database";
import { User } from "@/generated/prisma/client";
import { verifyTokenJwt } from "@/utils/jsonwebtoken.utils";

declare global {
    namespace Express {
        interface Request {
            user?: User,
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        const error = new Error('Debe iniciar sesión');
        return res.status(409).json({ msg: error.message });
    }

    const [, token] = authorization.split(" ");

    // Verificar el token:
    const tokenVerified = verifyTokenJwt(token!);

    if (!tokenVerified) {
        const error = new Error('Inicio de sesión no válido');
        return res.status(409).json({ msg: error.message });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: tokenVerified.id
            }
        });

        if (!user) {
            const error = new Error('Usuario no encontrado');
            return res.status(409).json({ msg: error.message });
        }

        req.user = user;

        next();
    } catch {
        const error = new Error('Error en el servidor');
        return res.status(500).json({ msg: error.message });
    }
}