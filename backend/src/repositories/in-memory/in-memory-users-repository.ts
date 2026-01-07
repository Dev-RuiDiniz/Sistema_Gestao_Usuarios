// src/repositories/in-memory/in-memory-users-repository.ts
import { type User, Prisma } from '@prisma/client';
import { type UsersRepository } from '../users-repository.js';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      role: data.role || 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);
    return user;
  }
}