import { type Request, type Response } from 'express';
import { registerBodySchema } from '../schemas/user-schemas.js';
import { makeRegisterService } from '../services/factories/make-register-service.js';

export async function register(req: Request, res: Response) {
  // 1. Validação com Zod
  const { email, password_hash } = registerBodySchema.parse(req.body);

  // 2. Uso da Factory para obter o serviço com as dependências injetadas
  const registerService = makeRegisterService();

  // 3. Execução da regra de negócio
  await registerService.execute({
    email,
    password_hash,
  });

  // 4. Resposta de sucesso
  return res.status(201).send();
}