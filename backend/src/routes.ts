import { Router } from 'express'
import { verifyJwt } from './middlewares/verify-jwt.js'
import { authenticate } from './controllers/authenticate-controller.js'
import { profile } from './controllers/profile-controller.js'

const Routes = Router()

// Pública
Routes.post('/sessions', authenticate)

// Privada
Routes.get('/me', verifyJwt, profile)

export { Routes }