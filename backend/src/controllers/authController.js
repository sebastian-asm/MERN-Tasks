import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/Usuario.js';

export const authValidacion = [
  check('email', 'El email válido es necesario').trim().isEmail(),
  check('password', 'La contraseña debe tener mínimo 6 carácteres')
    .trim()
    .isLength({ min: 6 }),
  (req, res, next) => {
    const { errors } = validationResult(req);
    console.log(errors);
    if (errors.length > 0)
      return res.status(400).json({
        ok: false,
        errores: errors.map((error) => error.msg),
      });
    next();
  },
];

export const usuarioAutenticado = async (req, res) => {
  const { id } = req;

  try {
    const usuario = await Usuario.findById(id).select('-password');
    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });

    const pass = bcryptjs.compareSync(password, usuario.password);
    if (!pass)
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales inválidas',
      });

    // Creación del token
    const payload = {
      id: usuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.json({ ok: true, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
