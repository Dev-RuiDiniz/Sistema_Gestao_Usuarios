import { Prisma, type User, type Role } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

// 1. A Interface (O Contrato)
// Define o que qualquer repositório de usuário deve ser capaz de fazer
export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findManyPaginated(page: number): Promise<User[]>;
  updateRole(id: string, role: Role): Promise<User>; // Adicionado para Task 02
}

// 2. A Classe (A Implementação Real com Prisma)
export class PrismaUsersRepository implements UsersRepository {
  
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findManyPaginated(page: number) {
    const users = await prisma.user.findMany({
      take: 20,              // Limita a 20 resultados
      skip: (page - 1) * 20,  // Pula os registros baseados na página
      orderBy: {
        createdAt: 'desc',   // Garante que os novos usuários apareçam primeiro
      },
    });

    return users;
  }

  async updateRole(id: string, role: Role) {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return user;
  }
}