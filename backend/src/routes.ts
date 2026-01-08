import { Router } from 'express'
import { verifyJwt } from './middlewares/verify-jwt.js'
import { verifyUserRole } from './middlewares/verify-user-role.js'
import { authenticate } from './controllers/authenticate-controller.js'

const Routes = Router()

/** * ROTAS PÚBLICAS 
 */
Routes.post('/sessions', authenticate)

/**
 * ROTAS PRIVADAS (Requerem login)
 * O middleware verifyJwt decodifica o token e preenche req.user
 */
Routes.get('/me', verifyJwt, (req, res) => {
  return res.status(200).send({ 
    userId: req.user.id,
    role: req.user.role // Agora acessível após a Task 07
  })
})

/**
 * ROTAS ADMINISTRATIVAS (Requerem login + Role ADMIN)
 */
Routes.get('/admin/users-report', 
  verifyJwt, 
  verifyUserRole('ADMIN'), 
  (req, res) => {
    return res.status(200).send({ message: 'Relatório acessado com sucesso.' })
  }
)

export { Routes }