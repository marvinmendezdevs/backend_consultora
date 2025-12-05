import { Router } from "express";
import { getUser, login, register } from "@/controllers/auth.controller";
import { validator } from "@/middlewares/validations.middleware";
import { loginValidations, registerValidations } from "@/utils/validation.utils";
import { authenticate } from "@/middlewares/auth.middleware";


const router = Router();

router.post('/register', registerValidations, validator, register)
router.post('/login', loginValidations, validator, login);
router.get('/user', authenticate, getUser);

export default router;