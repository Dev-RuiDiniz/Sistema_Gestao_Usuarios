import { Router } from 'express'
import { authenticate } from './controllers/authenticate-controller.js'
import { logout } from './controllers/logout-controller.js' // Novo import
import { verifyJwt } from './middlewares/verify-jwt.js'
import { profile } from './controllers/profile-controller.js'

const Routes = Router()

// Públicas
Routes.post('/sessions', authenticate)
Routes.post('/logout', logout) // Rota de Logout

// Privadas
Routes.get('/me', verifyJwt, profile)

export { Routes }