import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authContext from '../../context/auth/authContext';

export default function RutaPrivada({ component: Component, ...props }) {
  const { autenticado, cargando, usuarioAutenticado } = useContext(authContext);

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Route
        {...props}
        render={(props) =>
          !autenticado && !cargando ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </div>
  );
}
