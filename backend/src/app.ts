import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './errors/AppError.js';
import { Routes } from './routes.js';
import z from 'zod';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json'; // Certifique-se que o caminho está correto

const app = express();

// 1. Middlewares de Configuração
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// 2. Documentação Swagger (Recomendado vir antes das rotas da API)
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