import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteUserService } from '@/services/factories/make-delete-user-service.js' // Caminho corrigido
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export async function deleteUser(req: Request, res: Response) {
  const deleteUserParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = deleteUserParamsSchema.parse(req.params)

  // Agora o TS reconhecerá o .sub após ajustarmos o @types
  const adminId = req.user.sub 

  try {
    const deleteUserService = makeDeleteUserService()
    
    await deleteUserService.execute({ 
      userId, 
      adminId 
    })
    
    return res.status(204).send() 
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message })
    }
    throw err
  }
}