import { type Request, type Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env/index' 
import { makeAuthenticateService } from '@/services/authenticate.js' 
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'
import { PrismaUsersRepository } from '@/repositories/users-repository.js'

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(6),
  })

  // Validação dos dados de entrada
  const { email, password_hash } = authenticateBodySchema.parse(req.body)

  try {
    // Instancia o serviço através da factory
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = makeAuthenticateService(usersRepository)

    const { user } = await authenticateService.execute({
      email,
      password_hash,
    })

    // GERAÇÃO DO ACCESS TOKEN (JWT)
    const token = jwt.sign(
      { 
        role: user.role 
      }, 
      env.JWT_SECRET, 
      {
        subject: user.id,   // ID único do usuário (sub)
        expiresIn: '15m',   // Tempo de expiração curto para segurança
      }
    )

    // Retorna o token para o cliente (Frontend/Insomnia)
    return res.status(200).send({
      token,
    })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    // Middleware global de erros capturará outros tipos de erro (como Zod)
    throw err 
  }
}