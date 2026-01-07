// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config'; // Garante o carregamento das variáveis aqui

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Pegamos a URL e validamos se ela existe
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

// 1. Criamos o pool de conexão
const pool = new pg.Pool({ connectionString });

// 2. Criamos o adaptador
const adapter = new PrismaPg(pool);

// 3. Instanciamos o PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;