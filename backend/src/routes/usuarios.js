import { Router } from 'express';

import {
  usuarioValidacion,
  crearUsuario,
} from '../controllers/usuarioController.js';

const usuarios = Router();

usuarios.post('/', usuarioValidacion, crearUsuario);

export default usuarios;
