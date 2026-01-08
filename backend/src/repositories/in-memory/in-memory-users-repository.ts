import { type User, Prisma, Role } from '@prisma/client'
import { type UsersRepository } from '../users-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findManyPaginated(page: number) {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    return user || null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      role: (data.role as Role) || 'USER', // Garantindo a tipagem do Enum
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.items.push(user)
    return user
  }

  // IMPLEMENTAÇÃO PARA RESOLVER O ERRO TS2420:
  async updateRole(id: string, role: Role) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    // Atualiza o objeto no array
    this.items[userIndex].role = role
    this.items[userIndex].updatedAt = new Date()

    return this.items[userIndex]
  }
}