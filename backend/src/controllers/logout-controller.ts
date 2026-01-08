import { Request, Response } from 'express'

export async function logout(req: Request, res: Response) {
  return res
    .status(200)
    .cookie('refreshToken', '', {
      path: '/',
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
      expires: new Date(0), // Define a expiração para 1970 (passado)
    })
    .send({ message: 'Logout realizado com sucesso.' })
}