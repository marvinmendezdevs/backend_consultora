import { Request, Response, NextFunction } from "express";

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    res.send(req.user);
}