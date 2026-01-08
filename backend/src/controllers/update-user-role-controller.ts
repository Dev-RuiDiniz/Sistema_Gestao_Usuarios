import { Request, Response } from 'express'
import { z } from 'zod'
import { makeUpdateUserRoleService } from '@/services/update-user-role.js'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export async function updateUserRole(req: Request, res: Response) {
  const updateUserRoleParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const updateUserRoleBodySchema = z.object({
    role: z.enum(['ADMIN', 'USER']), // Alinhado com seu schema.prisma
  })

  const { userId } = updateUserRoleParamsSchema.parse(req.params)
  const { role } = updateUserRoleBodySchema.parse(req.body)

  try {
    const updateUserRoleService = makeUpdateUserRoleService()
    await updateUserRoleService.execute({ userId, role })
    
    return res.status(204).send() // 204 No Content para atualizações de sucesso
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message })
    }
    throw err
  }
}