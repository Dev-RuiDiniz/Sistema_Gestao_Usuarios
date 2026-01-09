import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'; // Importação do Rate Limit
import { AppError } from './errors/AppError.js';
import { Routes } from './routes.js';
import z from 'zod';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

// 1. Configuração de Segurança: Rate Limiting
// Limita cada IP a 100 requisições por janela de 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100, // Limite de 100 reqs por IP
  standardHeaders: 'draft-7', // Retorna info de limite nos headers 'RateLimit-*'
  legacyHeaders: false, // Desabilita headers antigos 'X-RateLimit-*'
  message: {
    status: 'error',
    message: 'Muitas requisições vindas deste IP, tente novamente após 15 minutos.'
  }
});

// Aplica o limitador em todas as rotas
app.use(limiter);

// 2. Middlewares de Configuração
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 3. Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 4. Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 5. Definição das Rotas da API
app.use(Routes);

// 6. Middleware Global de Erros
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