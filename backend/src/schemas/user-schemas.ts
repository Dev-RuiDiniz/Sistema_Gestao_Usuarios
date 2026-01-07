// src/schemas/user-schemas.ts
import { z } from 'zod';

export const registerBodySchema = z.object({
  email: z.string().email("E-mail com formato inválido."),
  password_hash: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

// O Zod permite extrair o tipo TypeScript automaticamente do schema
export type RegisterBody = z.infer<typeof registerBodySchema>;