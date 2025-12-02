import { prisma } from "@/config/database";
import { Request, Response, NextFunction } from "express";

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    try {
        const [clients] = await Promise.all([
            prisma.clients.count({
                where: {
                    companyId: user.companyId,
                }
            }),
        ]);

        res.json({
            clients
        });
        
    } catch (error) {
        return res.status(500).json({msg: "Error en el servidor"});
    }
}