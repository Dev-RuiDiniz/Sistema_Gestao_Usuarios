// src/routes.ts
import { Router } from 'express';
import { RegisterController } from './controllers/register-controller.js';

const routes = Router();
const registerController = new RegisterController();

routes.post('/users', registerController.handle);

export { routes };