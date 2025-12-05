import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";
import { AppError } from "./utils/AppError";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

//app.all('*', (req, res, next) => next(new AppError(`No se encontró la ruta ${req.originalUrl} en este servidor`, 404)));
app.use(globalErrorHandler);

export default app;