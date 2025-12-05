import { body } from "express-validator";

export const registerValidations = [
    body('name')
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    body('email').
        isEmail()
        .withMessage("Correo inválido"),
    body('password')
        .notEmpty()
        .withMessage("Digite un contraseña válida")
        .trim()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('telephone')
        .notEmpty()
        .withMessage('Digite el teléfono'),
    body('companyId')
        .notEmpty()
        .withMessage('Indique a qué empresa pertenece el usuario'),
    body('jobTitle')
        .notEmpty()
        .withMessage('Debe especificar el título del cargo'),
    body('roleId')
        .notEmpty()
        .withMessage('Debe especificar el tipo de usuario')
];

export const loginValidations = [
    body('email')
        .isEmail()
        .withMessage("Correo inválido"),
    body('password')
        .notEmpty()
        .withMessage("Digite un contraseña válida")
        .trim()
        .withMessage('La contraseña debe tener entre 6 y 8 caracteres'),
];