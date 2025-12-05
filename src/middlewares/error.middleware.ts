import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Prisma } from '@/generated/prisma/client';
import { Env } from '@/utils/env.utils';

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): AppError => {
  switch (err.code) {
    case 'P2002': // Violación de unicidad (Unique constraint)
      // err.meta.target nos dice qué campo falló (ej: email)
      const target = (err.meta?.target as string[]) || ['campo'];
      return new AppError(`El valor del campo '${target[0]}' ya existe. Usa otro.`, 400);

    case 'P2025': // Registro no encontrado (Record not found)
      return new AppError('El registro solicitado no existe o fue eliminado.', 404);

    case 'P2003': // Fallo de llave foránea (Foreign key constraint)
      return new AppError('Operación inválida: El registro relacionado no existe.', 400);

    default:
      return new AppError(`Error de base de datos: ${err.message}`, 500);
  }
};

const handleJWTError = () =>
  new AppError('Token inválido. Por favor inicie sesión nuevamente.', 401);

const handleJWTExpiredError = () =>
  new AppError('Tu sesión ha expirado. Por favor inicie sesión nuevamente.', 401);

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // MODO DESARROLLO: Queremos ver todo el detalle
  if (Env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // MODO PRODUCCIÓN: Mensajes limpios para el usuario
  else {
    let error = { ...err };
    error.message = err.message;

    // Detectar y traducir errores específicos
    if (err instanceof Prisma.PrismaClientKnownRequestError) error = handlePrismaError(err);
    if (err instanceof JsonWebTokenError) error = handleJWTError();
    if (err instanceof TokenExpiredError) error = handleJWTExpiredError();
    // Si usaras Zod, aquí agregarías: if (err instanceof ZodError) ...

    // A. Error Operacional (Conocido): Enviar mensaje confiable
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
    // B. Error Desconocido (Bug): No filtrar detalles técnicos al cliente
    else {
      console.error('ERROR CRÍTICO 💥', err);

      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal. Por favor intente más tarde.',
      });
    }
  }
};