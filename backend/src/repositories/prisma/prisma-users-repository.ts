import { prisma } from '@/lib/prisma.js'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }

  // --- ADICIONE OS MÉTODOS ABAIXO PARA SATISFAZER A INTERFACE ---

  async findManyPaginated(page: number) {
    const users = await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return users
  }

  async updateRole(id: string, role: 'ADMIN' | 'USER') {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    })
    return user
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: { id },
    })
  }
}