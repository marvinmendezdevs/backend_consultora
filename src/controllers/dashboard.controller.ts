import { DashboardService } from "@/services/dashboard.services";
import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync.utils";
import { Request, Response, NextFunction } from "express";

export const dashboard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        throw new AppError('Usuario no encontrado', 404);
    }
    const stadistics = await DashboardService.stadistics(user.companyId);
    res.status(200).json(stadistics);
});