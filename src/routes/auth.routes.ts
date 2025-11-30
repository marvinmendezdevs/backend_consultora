import { Router } from "express";
import { login } from "@/controllers/auth.controller";
import { validator } from "@/middlewares/validations";
import { loginValidations } from "@/utils/validation.utils";


const router = Router();

router.post('/login', loginValidations, validator, login);

export default router;