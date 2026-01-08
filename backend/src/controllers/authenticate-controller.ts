// src/http/controllers/authenticate-controller.ts
import { type Request, type Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env' // Seu loader de variáveis de ambiente
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service.js'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(6),
  })

  const { email, password_hash } = authenticateBodySchema.parse(req.body)

  try {
    // Usamos uma factory para instanciar o service com suas dependências
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({
      email,
      password_hash,
    })

    // GERAÇÃO DO ACCESS TOKEN
    const token = jwt.sign(
      { 
        role: user.role // Payload: dados para o front-end
      }, 
      env.JWT_SECRET, 
      {
        subject: user.id,   // O "sub" (ID do usuário)
        expiresIn: '15m',   // Vida curta por segurança
      }
    )

    return res.status(200).send({
      token,
    })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err // Deixa o middleware global tratar erros inesperados
  }
}