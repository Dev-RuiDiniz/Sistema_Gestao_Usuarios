import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteUserService } from '@/services/delete-user.js'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export async function deleteUser(req: Request, res: Response) {
  const deleteUserParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = deleteUserParamsSchema.parse(req.params)

  try {
    const deleteUserService = makeDeleteUserService()
    await deleteUserService.execute({ userId })
    
    return res.status(204).send() // Sucesso sem conteúdo
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message })
    }
    throw err
  }
}