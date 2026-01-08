import { Router } from 'express'
import { verifyJwt } from './middlewares/verify-jwt.js'
import { authenticate } from './controllers/authenticate-controller.js'

const Routes = Router()

// Rota pública: Login/Autenticação
Routes.post('/sessions', authenticate)

/**
 * Rotas privadas (Exigem Token)
 * O middleware verifyJwt valida o token e preenche o req.user
 */
Routes.get('/me', verifyJwt, (req, res) => {
  // Se o TS reclamar de 'user', certifique-se de ter criado o @types/express.d.ts
  return res.status(200).send({ 
    userId: req.user.id 
  })
})

export { Routes }