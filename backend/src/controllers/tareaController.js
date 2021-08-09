import { validationResult } from 'express-validator';

import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

export const obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    await Proyecto.findById(proyecto, (err, proyecto) => {
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

    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

    res.json({
      ok: true,
      tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const crearTarea = async (req, res) => {
  // Obteniendo los errores de la validación
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({
      ok: false,
      errores: errores.array(),
    });

  try {
    const { proyecto } = req.body;

    await Proyecto.findById(proyecto, (err, proyecto) => {
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

    const tarea = new Tarea(req.body);
    await tarea.save();

    res.status(201).json({
      ok: true,
      msg: 'Tarea creada exitosamente',
      tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;
    const { id } = req.params;
    let nuevaTarea = {};

    await Tarea.findById(id, (err, tarea) => {
      if (err || !tarea)
        return res.status(404).json({
          ok: false,
          msg: 'La tarea no existe',
        });
    });

    await Proyecto.findById(proyecto, (err, proyecto) => {
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

    // Capturando los nuevos datos enviado para actualizar
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    const tarea = await Tarea.findOneAndUpdate({ _id: id }, nuevaTarea, {
      new: true,
    });

    res.json({
      ok: true,
      msg: 'Tarea actualizada',
      tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;
    const { id } = req.params;

    await Tarea.findById(id, (err, tarea) => {
      if (err || !tarea)
        return res.status(404).json({
          ok: false,
          msg: 'La tarea no existe',
        });
    });

    await Proyecto.findById(proyecto, (err, proyecto) => {
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

    await Tarea.findOneAndRemove({ _id: id });

    res.json({
      ok: true,
      msg: 'Tarea eliminada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
