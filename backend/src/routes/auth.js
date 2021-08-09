import { Router } from 'express';

import {
  autenticarUsuario,
  authValidacion,
  usuarioAutenticado,
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const auth = Router();

auth.get('/', authMiddleware, usuarioAutenticado);
auth.post('/', authValidacion, autenticarUsuario);

export default auth;
