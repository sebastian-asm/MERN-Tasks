import { useContext, useEffect } from 'react';

import authContext from '../../context/auth/authContext';

export default function Barra() {
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario && (
        <p className="nombre-usuario">
          Hola! <span>{usuario.nombre}</span>
        </p>
      )}

      <nav className="nav-principal">
        <button
          onClick={() => cerrarSesion()}
          className="btn btn-blank cerrar-sesion"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
