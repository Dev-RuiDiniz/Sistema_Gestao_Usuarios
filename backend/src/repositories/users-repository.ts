import { Prisma, type User, type Role } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

// 1. A Interface (Contrato)
// Qualquer classe que gerencie usuários DEVE ter estes métodos
export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findManyPaginated(page: number): Promise<User[]>;
  updateRole(id: string, role: Role): Promise<User>;
  delete(id: string): Promise<void>; // Método necessário para a Task 03
}

// 2. A Implementação Real (Prisma)
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findManyPaginated(page: number) {
    return await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRole(id: string, role: Role) {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }
}