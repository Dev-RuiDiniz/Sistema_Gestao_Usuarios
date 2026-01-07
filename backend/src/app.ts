// src/app.ts
import express from 'express';
import cors from 'cors';
// Importaremos nossas rotas futuramente aqui
// import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// app.use(routes);

export { app };