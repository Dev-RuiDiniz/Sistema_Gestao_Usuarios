// src/services/register.ts
import { AppError } from '../errors/AppError.js';
import { type UsersRepository } from '../repositories/users-repository.js';
import { generateHash } from '../utils/hash-password.js';
import { type User } from '@prisma/client';

// 1. Definimos os dados necessários para o registro
interface RegisterServiceRequest {
  email: string;
  password_hash: string;
}

// 2. Definimos o que o serviço retorna
interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  // Injeção de Dependência: O serviço recebe o repositório no construtor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password_hash,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    
    // 1. Verifica se o usuário já existe
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
    throw new AppError('User with same email already exists.', 409); // 409 Conflict
    }

    // 2. Criptografa a senha usando nosso utilitário
    const hashedPassword = await generateHash(password_hash);

    // 3. Salva no banco de dados via repositório
    const user = await this.usersRepository.create({
      email,
      password_hash: hashedPassword,
    });

    return {
      user,
    };
  }
}