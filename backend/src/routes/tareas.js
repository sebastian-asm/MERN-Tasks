import { Router } from 'express';
import { check } from 'express-validator';

import {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
} from '../controllers/tareaController.js';
import auth from '../middlewares/auth.js';

const tareas = Router();

tareas.get('/', auth, obtenerTareas);
tareas.post(
  '/',
  auth,
  [
    check('nombre', 'El nombre de la tarea es necesario').not().isEmpty(),
    check('proyecto', 'El proyecto es importante').not().isEmpty(),
  ],
  crearTarea
);
tareas.put('/:id', auth, actualizarTarea);
tareas.delete('/:id', auth, eliminarTarea);

export default tareas;
