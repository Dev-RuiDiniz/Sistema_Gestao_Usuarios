import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './errors/AppError.js';
import { Routes } from './routes.js';
import z from 'zod';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

// 1. Configuração de Middlewares
app.use(cookieParser());

// CONFIGURAÇÃO DO CORS: 
// Permitir apenas o domínio do frontend e o uso de cookies/headers de autorização
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Necessário para o envio de cookies (Refresh Token)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 3. Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 4. Definição das Rotas da API
app.use(Routes);

// 5. Middleware Global de Erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      message: 'Dados inválidos.',
      errors: err.format(),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('❌ Internal Error:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };