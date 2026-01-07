// src/controllers/register-controller.ts
import { type Request, type Response } from 'express';
import { registerBodySchema } from '../schemas/user-schemas.js';
import { RegisterService } from '../services/register.js';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository.js';

export class RegisterController {
  async handle(req: Request, res: Response) {
    // Validação rigorosa com Zod
    const { email, password_hash } = registerBodySchema.parse(req.body);

    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      email,
      password_hash,
    });

    return res.status(201).send();
  }
}