import { Prisma, type User } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

// 1. A Interface (O Contrato)
export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findManyPaginated(page: number): Promise<User[]>; // Interface exige este método
}

// 2. A Classe (A Implementação)
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

  // ADICIONE ESTE MÉTODO PARA RESOLVER O ERRO:
  async findManyPaginated(page: number) {
    const users = await prisma.user.findMany({
      take: 20,              // Quantidade por página
      skip: (page - 1) * 20,  // Lógica de pulo de registros
      orderBy: {
        createdAt: 'desc',   // Ordenar pelos mais recentes
      },
    });

    return users;
  }
}