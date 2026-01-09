import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Configuração da conexão nativa
const connectionString = `${process.env.DATABASE_URL}`

if (!connectionString || connectionString === 'undefined') {
  throw new Error('❌ DATABASE_URL não encontrada no .env')
}

// 2. Criamos o pool e o adaptador
// O Prisma v7 (engineType = client) usa este adapter como motor de conexão
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

// 3. Inicialização do Client
// Quando usamos 'adapter', não passamos 'datasources' ou 'datasourceUrl'
// O Prisma extrai tudo o que precisa do próprio objeto adapter.
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = 'admin@admin.com'
  
  try {
    console.log('🌱 Iniciando o seed do banco de dados...')

    const adminExists = await prisma.user.findUnique({
      where: { email }
    })

    if (!adminExists) {
      const password_hash = await hash('admin123', 6)

      await prisma.user.create({
        data: {
          email,
          password_hash,
          role: 'ADMIN',
        }
      })

      console.log('✅ Usuário ADMIN padrão criado com sucesso!')
      console.log('📧 Email: admin@admin.com')
      console.log('🔑 Senha: admin123')
    } else {
      console.log('ℹ️ Usuário ADMIN já existe no banco de dados.')
    }
  } catch (error) {
    console.error('❌ Erro durante a execução do seed:', error)
    process.exit(1)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end() // Importante fechar o pool para o processo encerrar
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })