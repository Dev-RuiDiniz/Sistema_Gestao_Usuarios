import { type Request, type Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env/index' 
import { makeAuthenticateService } from '@/services/authenticate.js' 
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'

export async function authenticate(req: Request, res: Response) {
  // 1. Esquema de Validação com Zod
  const authenticateBodySchema = z.object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    password_hash: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  })

  try {
    // Validação dos dados de entrada
    const { email, password_hash } = authenticateBodySchema.parse(req.body)

    // 2. Chamada do Service através da Factory
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({
      email,
      password_hash,
    })

    // 3. Geração do Access Token (Vida Curta: 15 min)
    const token = jwt.sign(
      { role: user.role }, 
      env.JWT_SECRET, 
      {
        subject: user.id,
        expiresIn: '15m',
      }
    )

    // 4. Geração do Refresh Token (Vida Longa: 7 dias)
    const refreshToken = jwt.sign(
      { role: user.role }, 
      env.JWT_SECRET, 
      {
        subject: user.id,
        expiresIn: '7d',
      }
    )

    // 5. Resposta com Cookie Seguro e Access Token no corpo
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, 
        sameSite: 'strict',
        httpOnly: true,
      })
      .send({
        token,
      })

  } catch (err) {
    // Se o erro for de validação do Zod
    if (err instanceof z.ZodError) {
      return res.status(400).send({ 
        message: 'Erro de validação.', 
        errors: err.format() 
      })
    }

    // Erro de credenciais (e-mail ou senha errados)
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    // Middleware global de erros capturará outros tipos de erro
    throw err 
  }
}