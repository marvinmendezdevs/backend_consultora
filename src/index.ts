import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

export default app;