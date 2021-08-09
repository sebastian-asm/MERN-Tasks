import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import morgan from 'morgan';

import auth from './src/routes/auth.js';
import conectarDB from './src/config/db.js';
import proyectos from './src/routes/proyectos.js';
import usuarios from './src/routes/usuarios.js';
import tareas from './src/routes/tareas.js';

const server = express();
const router = Router();

// Configuraciones
dotenv.config();
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

// Conexión MongoDB
conectarDB();

// Rutas
server.use('/api', router);
router.use('/usuarios', usuarios);
router.use('/auth', auth);
router.use('/proyectos', proyectos);
router.use('/tareas', tareas);

server.listen(process.env.PORT, () =>
  console.log('Servidor en puerto:', process.env.PORT)
);
