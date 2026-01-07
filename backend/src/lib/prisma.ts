// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// 1. Criamos um tipo para estender o objeto global do Node
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 2. Instanciamos o cliente ou reaproveitamos o existente no objeto global
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
});

// 3. Se não estivermos em produção, salvamos a instância no global
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;