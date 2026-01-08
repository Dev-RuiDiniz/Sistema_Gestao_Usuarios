import { Router } from 'express'
import { authenticate } from './controllers/authenticate-controller.js'
import { logout } from './controllers/logout-controller.js' // Novo import
import { verifyJwt } from './middlewares/verify-jwt.js'
import { profile } from './controllers/profile-controller.js'
import { updateUserRole } from './controllers/update-user-role-controller.js'
import { verifyUserRole } from './middlewares/verify-user-role.js'

const Routes = Router()

// Públicas
Routes.post('/sessions', authenticate)
Routes.post('/logout', logout) // Rota de Logout

// Rota para promover/rebaixar usuários (Apenas Admin)
Routes.patch('/users/:userId/role', 
  verifyJwt, 
  verifyUserRole('ADMIN'), 
  updateUserRole
)

// Privadas
Routes.get('/me', verifyJwt, profile)

export { Routes }