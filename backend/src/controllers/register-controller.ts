// src/controllers/register-controller.ts
import { type Request, type Response } from 'express';
import { z } from 'zod';
import { RegisterService } from '../services/register.js';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository.js';
import { AppError } from '../errors/AppError.js';

export class RegisterController {
  async handle(req: Request, res: Response) {
    // 1. Definição do esquema de validação
    const registerBodySchema = z.object({
      email: z.string().email({ message: "Formato de e-mail inválido" }),
      password_hash: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    });

    // 2. Validação dos dados de entrada
    const result = registerBodySchema.safeParse(req.body);

    if (!result.success) {
      // Retorna os erros do Zod formatados
      return res.status(400).json({ 
        message: "Erro de validação", 
        errors: result.error.format() 
      });
    }

    const { email, password_hash } = result.data;

    try {
      // 3. Instanciação das dependências (Pode ser melhorado com Injeção de Dependência automática no futuro)
      const usersRepository = new PrismaUsersRepository();
      const registerService = new RegisterService(usersRepository);

      // 4. Execução da lógica de negócio
      await registerService.execute({
        email,
        password_hash,
      });

      // 5. Resposta de sucesso (201 Created)
      return res.status(201).send();
      
    } catch (err) {
      if (err instanceof AppError) {
        throw err; // O nosso Global Error Handler vai capturar isso
      }

      throw err;
    }
  }
}