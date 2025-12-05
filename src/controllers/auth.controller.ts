import { Request, Response } from "express"
import { catchAsync } from "@/utils/catchAsync.utils";
import { AuthService } from "@/services/auth.services";


export const register = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    await AuthService.register(data);
    res.status(201).json({ msg: "Usuario creado con éxito..." });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const token = await AuthService.login(data);
    res.status(201).json({
        msg: "Usuario autenticado con éxito",
        token
    });
});