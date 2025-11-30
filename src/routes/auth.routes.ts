import { Router } from "express";
import { login, register } from "@/controllers/auth.controller";
import { validator } from "@/middlewares/validations";
import { loginValidations, registerValidations } from "@/utils/validation.utils";


const router = Router();

router.post('/register', registerValidations, validator, register)
router.post('/login', loginValidations, validator, login);

export default router;