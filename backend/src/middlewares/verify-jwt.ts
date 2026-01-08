import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@/env/index'

interface JwtPayload {
  sub: string
  role: string
}

export async function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  // 1. Verifica se o header Authorization está presente
  if (!authHeader) {
    return res.status(401).send({ message: 'Token não fornecido.' })
  }

  // 2. O formato esperado é "Bearer <TOKEN>"
  const [, token] = authHeader.split(' ')

  try {
    // 3. Valida o token usando a chave secreta
    const { sub } = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    // 4. Anexa o ID do usuário à requisição (para uso nos controllers)
    req.user = {
      id: sub,
    }

    return next() // Segue para o próximo controller/middleware
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido ou expirado.' })
  }
}