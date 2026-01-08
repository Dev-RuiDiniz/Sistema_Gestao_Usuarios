// src/services/authenticate.ts
import { compare } from 'bcryptjs'
import { type UsersRepository } from '../repositories/users-repository.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { type User } from '@prisma/client'

interface AuthenticateServiceRequest {
  email: string
  password_hash: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password_hash,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    // 1. Buscar usuário pelo email
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // 2. Comparar a senha enviada com o hash do banco
    const doesPasswordMatch = await compare(password_hash, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    // 3. Retornar usuário em caso de sucesso
    return { user }
  }
}