import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFetchUsersService } from '../services/fetch-users.js'

export async function fetchUsers(req: Request, res: Response) {
  // 1. Validação dos Query Params (ex: /users?page=2)
  const fetchUsersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  // 2. Extração segura com Zod
  const { page } = fetchUsersQuerySchema.parse(req.query)

  try {
    const fetchUsersService = makeFetchUsersService()
    const { users } = await fetchUsersService.execute({ page })

    // 3. Higienização: Nunca enviar o password_hash na listagem
    const sanitizedUsers = users.map((user) => {
      const { password_hash, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return res.status(200).send({ 
      users: sanitizedUsers,
      currentPage: page 
    })
  } catch (err) {
    // Erros serão capturados pelo seu middleware de erro global
    throw err
  }
}