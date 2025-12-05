import { prisma } from "@/config/database";
import type { User } from "@/generated/prisma/client";
import { LoginData } from "@/types/auth.types";
import { AppError } from "@/utils/AppError";
import { hashPassword, verifyPassword } from "@/utils/bcrypt.utils";
import { createTokenJwt } from "@/utils/jsonwebtoken.utils";

export const AuthService = {
    register: async (userData: User) => {
        const { email, password } = userData;

        // Buscar si ya existe un usuario
        const userExists = await prisma.user.findFirst({ where: { email } });

        if (userExists) {
            throw new AppError('El usuario ya está registrado', 409);
        }

        const passwordHash = await hashPassword(password);

        // Creamos el nuevo usuario
        const newUser = await prisma.user.create({
            data: { ...userData, password: passwordHash }
        });

        return newUser;
    },

    login: async (dataLogin: LoginData) => {
        const { email, password } = dataLogin;

        // Buscar si ya existe un usuario
        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new AppError('El usuario no está registrado', 404);
        }

        // Verificar si la contrase;a es correcta
        const checkPassword = await verifyPassword(password, user.password);

        if (!checkPassword) {
            throw new AppError('La contraseña no coincide con este usuario', 401);
        }

        const token = createTokenJwt({ id: user.id, email: user.email });

        return token;
    }
}