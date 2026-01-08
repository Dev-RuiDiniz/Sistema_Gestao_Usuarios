// src/app.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './errors/AppError.js';
import { routes } from './routes.js';
import z from 'zod';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser())
// 1. Middlewares de Configuração (Devem vir ANTES das rotas)
app.use(cors());
app.use(express.json()); // Essencial para ler o corpo da requisição POST

// 2. Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 3. Definição das Rotas da API
app.use(routes);

// 4. Middleware Global de Erros (Deve ser SEMPRE o último)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // O TypeScript agora reconhece que 'err' é um ZodError aqui dentro
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      message: 'Dados inválidos.',
      errors: err.format(), // Agora o TS reconhece o .format()
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