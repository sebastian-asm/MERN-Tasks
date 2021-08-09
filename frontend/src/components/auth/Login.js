import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/auth/authContext';

export default function Login({ history }) {
  const { mensaje, autenticado, iniciarSesion } = useContext(authContext);
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  useEffect(() => {
    if (autenticado) history.push('/proyectos');
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    // eslint-disable-next-line
  }, [mensaje, autenticado, history]);

  const [usuario, setUsuario] = useState({
    email: 'seba@seba.com',
    password: '123456',
  });

  const { email, password } = usuario;

  const handleChange = ({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '')
      return mostrarAlerta('Todos los datos son necesarios', 'alerta-error');

    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primario btn-block">
              Iniciar sesión
            </button>
          </div>
        </form>

        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Crear nueva cuenta
        </Link>
      </div>
    </div>
  );
}
