// prisma.config.ts
import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env para o process.env
dotenv.config();

export default defineConfig({
  datasource: {
    // Agora garantimos que esta string não estará vazia
    url: process.env.DATABASE_URL,
  },
});