import { Request, Response } from "express"
import type { LoginData, RegisterData } from "@/types/auth.types";
import { prisma } from "@/config/database";
import { hashPassword, verifyPassword } from "@/utils/bcrypt.utils";
import { createTokenJwt } from "@/utils/jsonwebtoken.utils";

export const register = async (req: Request, res: Response) => {
    const { email, password }: RegisterData = req.body;

    try {
        // Buscar si ya existe un usuario
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (userExists) {
            const error = new Error('El usuario ya está registrado');
            return res.status(409).json({ msg: error.message });
        }

        // Hasheo de password:
        const passwordHash = await hashPassword(password);
        req.body.password = passwordHash;

        const response = await prisma.user.create({
            data: req.body
        });

        if(response){
            return res.status(201).json({ msg: "Usuario creado con éxito"});
        }

        return res.status(500).json({ msg: "Error en el servidor" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password: passwordForm }: LoginData = req.body;

    try {
        // Buscar si ya existe un usuario
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!userExists) {
            const error = new Error('El usuario no está registrado');
            return res.status(409).json({ msg: error.message });
        }

        // Verificar si la contrase;a es correcta
        const checkPassword = await verifyPassword(passwordForm, userExists.password);

        if (!checkPassword) {
            const error = new Error('La contraseña no coincide con este usuario');
            return res.status(409).json({ msg: error.message });
        }

        // Creando el Token para autenticar
        const {password, ...rest} = userExists;
        const token = createTokenJwt(rest);

        res.status(201).json({
            msg: "Usuario autenticado con éxito",
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}