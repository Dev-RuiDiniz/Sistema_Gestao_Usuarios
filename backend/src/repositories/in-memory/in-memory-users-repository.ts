import { type User, Prisma, Role } from '@prisma/client'
import { type UsersRepository } from '../users-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  // Nosso "banco de dados" temporário
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    return user || null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    return user || null
  }

  async findManyPaginated(page: number) {
    // Simula a paginação do banco de dados fatiando o array
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      role: (data.role as Role) || 'USER', // Garante o tipo Enum Role
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)
    return user
  }

  async updateRole(id: string, role: Role) {
    const userIndex = this.items.findIndex((item) => item.id === id)
    
    // Atualiza o cargo e a data de modificação
    this.items[userIndex].role = role
    this.items[userIndex].updatedAt = new Date()

    return this.items[userIndex]
  }

  async delete(id: string) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    // Se o usuário existir no array, removemos ele
    if (userIndex >= 0) {
      this.items.splice(userIndex, 1)
    }
  }
}