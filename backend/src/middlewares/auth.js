import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({
      ok: false,
      msg: 'Permiso no válido',
    });

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.id = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
}
