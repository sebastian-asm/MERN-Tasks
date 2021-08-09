import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/auth/authContext';

export default function NuevaCuenta({ history }) {
  const { mensaje, autenticado, registrarUsuario } = useContext(authContext);
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  useEffect(() => {
    if (autenticado) history.push('/proyectos');
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    // eslint-disable-next-line
  }, [mensaje, autenticado, history]);

  const [usuario, setUsuario] = useState({
    nombre: 'seba',
    email: 'seba@seba.com',
    password: '123456',
    password2: '123456',
  });
  const { nombre, email, password, password2 } = usuario;

  const handleChange = ({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      password2.trim() === ''
    )
      return mostrarAlerta('Todos los campos son necesarios', 'alerta-error');

    if (password.length < 6)
      return mostrarAlerta(
        'La contraseña debe contener mínimo 6 carácteres',
        'alerta-error'
      );

    if (password !== password2)
      return mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');

    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}

      <div className="contenedor-form sombra-dark">
        <h1>Crear nueva cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              onChange={handleChange}
              value={nombre}
              type="text"
              id="nombre"
              name="nombre"
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password2">Confirmar contraseña</label>
            <input
              onChange={handleChange}
              value={password2}
              type="password"
              id="password2"
              name="password2"
            />
          </div>

          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Crear cuenta
            </button>
          </div>
        </form>

        <Link to="/" className="enlace-cuenta">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
