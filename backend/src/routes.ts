import { Router } from 'express'
import { authenticate } from './controllers/authenticate-controller.js'
import { logout } from './controllers/logout-controller.js'
import { profile } from './controllers/profile-controller.js'
import { fetchUsers } from './controllers/fetch-users-controller.js' // Adicionado
import { updateUserRole } from './controllers/update-user-role-controller.js'
import { deleteUser } from './controllers/delete-user-controller.js'
import { verifyJwt } from './middlewares/verify-jwt.js'
import { verifyUserRole } from './middlewares/verify-user-role.js'

const Routes = Router()

/**
 * 🔓 Rotas Públicas
 */
Routes.post('/sessions', authenticate)
Routes.post('/logout', logout)

/**
 * 🔒 Rotas Privadas (Qualquer usuário autenticado)
 */
Routes.get('/me', verifyJwt, profile)

/**
 * 🛡️ Rotas Administrativas (Apenas ADMIN)
 */

// Listar todos os usuários (Paginado)
Routes.get('/users', 
  verifyJwt, 
  verifyUserRole('ADMIN'), 
  fetchUsers
)

// Promover/Rebaixar usuários
Routes.patch('/users/:userId/role', 
  verifyJwt, 
  verifyUserRole('ADMIN'), 
  updateUserRole
)

// Deletar usuários
Routes.delete('/users/:userId', 
  verifyJwt, 
  verifyUserRole('ADMIN'), 
  deleteUser
)

export { Routes }