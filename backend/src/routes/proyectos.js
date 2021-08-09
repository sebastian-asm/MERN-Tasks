import { Router } from 'express';

import {
  crearProyecto,
  proyectoValidacion,
  obtenerProyectos,
  actualizarProyecto,
  eliminarProyecto,
} from '../controllers/proyectoController.js';
import auth from '../middlewares/auth.js';

const proyectos = Router();

proyectos.get('/', auth, obtenerProyectos);
proyectos.post('/', auth, proyectoValidacion, crearProyecto);
proyectos.put('/:id', auth, proyectoValidacion, actualizarProyecto);
proyectos.delete('/:id', auth, eliminarProyecto);

export default proyectos;
