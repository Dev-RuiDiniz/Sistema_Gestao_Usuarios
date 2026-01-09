import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@admin.com'
  
  // Verifica se o admin já existe para evitar duplicidade
  const adminExists = await prisma.user.findUnique({
    where: { email }
  })

  if (!adminExists) {
    const password_hash = await hash('admin123', 6)

    await prisma.user.create({
      data: {
        email,
        password_hash,
        role: 'ADMIN', // Define explicitamente como ADMIN
      }
    })

    console.log('✅ Usuário ADMIN padrão criado com sucesso!')
    console.log('📧 Email: admin@admin.com')
    console.log('🔑 Senha: admin123')
  } else {
    console.log('ℹ️ Usuário ADMIN já existe no banco de dados.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })