import { Router } from "express";
import { login, register } from "@/controllers/auth.controller";
import { validator } from "@/middlewares/validations.middleware";
import { loginValidations, registerValidations } from "@/utils/validation.utils";
import { authenticate } from "@/middlewares/auth.middleware";


const router = Router();

router.post('/register', registerValidations, validator, register)
router.post('/login', loginValidations, validator, login);

router.get('/user', authenticate, (req, res) => {
    const { password, ...rest } = req.user;

    res.status(200).json(rest);
});

export default router;