import { Request, Response } from 'express'
import { makeGetUserProfileService } from '@/services/get-user-profile.js'

export async function profile(req: Request, res: Response) {
  try {
    const getUserProfile = makeGetUserProfileService()

    const { user } = await getUserProfile.execute({
      userId: req.user.sub, // Alterado de .id para .sub
    })

    // Retornamos os dados exceto a senha
    return res.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (err) {
    return res.status(404).send({ message: 'Usuário não encontrado.' })
  }
}