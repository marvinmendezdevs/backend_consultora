export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // isOperational = true significa: "Este es un error que conocemos y controlamos"
        // (ej: contraseña incorrecta, ID no existe).
        // Si es false, es un bug de programación.
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}