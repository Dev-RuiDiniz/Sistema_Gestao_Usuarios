import { NextFunction, Request, Response } from 'express'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return res.status(401).send({ message: 'Não autorizado: Permissão insuficiente.' })
    }

    return next()
  }
}