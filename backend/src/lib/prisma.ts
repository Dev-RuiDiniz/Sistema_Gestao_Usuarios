import 'dotenv/config'; // DEVE ser a primeira linha
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Debug para você ter certeza no terminal
if (!process.env.DATABASE_URL) {
  console.error("❌ ERRO: DATABASE_URL não encontrada no arquivo .env");
}

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
})

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })