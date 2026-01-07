// prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Forma mais moderna de carregar o .env no ESM

// Opcional: Validar se a variável existe para evitar erros silenciosos
if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não foi definida no arquivo .env');
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});