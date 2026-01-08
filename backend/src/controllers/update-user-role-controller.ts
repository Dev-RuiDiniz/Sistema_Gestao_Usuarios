import { Request, Response } from 'express'
import { z } from 'zod'
import { makeUpdateUserRoleService } from '@/services/factories/make-update-user-role-service.js' // Caminho corrigido
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export async function updateUserRole(req: Request, res: Response) {
  const updateUserRoleParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const updateUserRoleBodySchema = z.object({
    role: z.enum(['ADMIN', 'USER']), 
  })

  const { userId } = updateUserRoleParamsSchema.parse(req.params)
  const { role } = updateUserRoleBodySchema.parse(req.body)

  // Captura o ID do Admin que está logado (para o Log de auditoria)
  const adminId = req.user.sub 

  try {
    const updateUserRoleService = makeUpdateUserRoleService()
    
    // Agora passamos o adminId para o execute
    await updateUserRoleService.execute({ 
      userId, 
      role,
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