import { body } from "express-validator";

export const loginValidations = [
    body('email').
        isEmail()
        .withMessage("Correo inválido"),
    body('password')
        .notEmpty()
        .withMessage("Digite un contraseña válida")
        .trim()
        .isLength({ min: 6, max: 8 })
        .withMessage('La contraseña debe tener entre 6 y 8 caracteres'),
];