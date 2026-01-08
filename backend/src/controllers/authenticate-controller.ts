import { type Request, type Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env/index' 
import { makeAuthenticateService } from '@/services/authenticate.js' 
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(6),
  })

  // 1. Validação dos dados de entrada
  const { email, password_hash } = authenticateBodySchema.parse(req.body)

  try {
    // 2. Instancia o serviço (a factory já cuida do repository internamente)
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({
      email,
      password_hash,
    })

    // 3. GERAÇÃO DO ACCESS TOKEN (Vida Curta: 15 minutos)
    const token = jwt.sign(
      { 
        role: user.role 
      }, 
      env.JWT_SECRET, 
      {
        subject: user.id,
        expiresIn: '15m',
      }
    )

    // 4. GERAÇÃO DO REFRESH TOKEN (Vida Longa: 7 dias)
    const refreshToken = jwt.sign(
      { 
        role: user.role 
      }, 
      env.JWT_SECRET, 
      {
        subject: user.id,
        expiresIn: '7d',
      }
    )

    // 5. Retorna o Access Token no corpo e o Refresh Token via Cookie Seguro
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        path: '/',            // Acessível em todo o site
        secure: true,        // HTTPS apenas (em produção)
        sameSite: 'strict',  // Proteção contra ataques CSRF
        httpOnly: true,      // Impede leitura via JavaScript (Proteção XSS)
      })
      .send({
        token,
      })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err 
  }
}