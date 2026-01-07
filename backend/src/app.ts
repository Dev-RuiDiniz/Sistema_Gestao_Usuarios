// src/app.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import 'express-async-errors'; // Importante para capturar erros em rotas assíncronas
import cors from 'cors';
import { AppError } from './errors/AppError.js';
import { routes } from './routes.js';

const app = express();

app.use(routes);
app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Middleware Global de Erros (Deve ser o ÚLTIMO app.use)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Se o erro for uma instância da nossa classe, é um erro "conhecido"
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Erro inesperado (Bug, queda de banco, etc)
  console.error(err); // Logamos para o desenvolvedor ver no terminal

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };