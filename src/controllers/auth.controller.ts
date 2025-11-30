import { Request, Response } from "express"
import type { LoginData } from "@/types/auth.types";
import { prisma } from "@/config/database";

export const login = async (req: Request, res: Response) => {
    const { email, password }: LoginData = req.body;

    try {
        // Buscar si ya existe un usuario
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if(userExists){
            const error = new Error('El usuario ya está registrado');
            return res.status(409).json({msg: error.message}); 
        }

        res.send(req.body);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error en el servidor"});
    }
}