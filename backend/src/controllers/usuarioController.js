import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/Usuario.js';

export const usuarioValidacion = [
  check('nombre', 'El nombre es necesario').trim().not().isEmpty(),
  check('email', 'El email válido es necesario').trim().isEmail(),
  check('password', 'La contraseña debe tener mínimo 6 carácteres')
    .trim()
    .isLength({ min: 6 }),
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

export const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario)
      return res.status(400).json({
        ok: false,
        msg: 'El email ya existe',
      });

    usuario = new Usuario(req.body);

    // Encriptación del password
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

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
