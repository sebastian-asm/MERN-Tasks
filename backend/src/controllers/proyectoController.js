import { check, validationResult } from 'express-validator';

import Proyecto from '../models/Proyecto.js';

export const proyectoValidacion = [
  check('nombre', 'El nombre del proyecto es necesario').trim().not().isEmpty(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty())
      return res.status(400).json({
        ok: false,
        errores: errores.array(),
      });
    next();
  },
];

export const crearProyecto = async (req, res) => {
  try {
    let proyecto = new Proyecto(req.body);
    proyecto.creador = req.id;

    await proyecto.save();

    res.json({
      ok: true,
      proyecto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const obtenerProyectos = async (req, res) => {
  try {
    const { id } = req;
    const proyectos = await Proyecto.find({ creador: id }).sort({
      creado: -1,
    });

    res.json({
      ok: true,
      proyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const actualizarProyecto = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;
  let nuevoProyecto = {};

  if (nombre) nuevoProyecto.nombre = nombre;

  try {
    await Proyecto.findById(id, (err, proyecto) => {
      if (err || !proyecto)
        return res.status(404).json({
          ok: false,
          msg: 'Proyecto no encontrado',
        });

      if (proyecto.creador.toString() !== req.userId)
        return res.status(401).json({
          ok: false,
          msg: 'No autorizado',
        });
    });

    let proyecto = await Proyecto.findByIdAndUpdate(
      { _id: id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({
      ok: true,
      msg: 'Proyecto actualizado',
      proyecto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    await Proyecto.findById(id, (err, proyecto) => {
      if (err || !proyecto)
        return res.status(404).json({
          ok: false,
          msg: 'Proyecto no encontrado',
        });

      if (proyecto.creador.toString() !== req.id)
        return res.status(401).json({
          ok: false,
          msg: 'No autorizado',
        });
    });

    await Proyecto.findOneAndRemove({ _id: id });

    res.json({
      ok: true,
      msg: 'Proyecto eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
