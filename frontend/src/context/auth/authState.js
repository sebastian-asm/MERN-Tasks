import { useReducer } from 'react';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from '../../types';
import authReducer from './authReducer';
import authContext from './authContext';

export default function AuthState({ children }) {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (usuario) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/usuarios`;
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: REGISTRO_EXITOSO,
          payload: data.token,
        });

        usuarioAutenticado();
      } else {
        const alerta = {
          msg: data.msg,
          categoria: 'alerta-error',
        };
        dispatch({
          type: REGISTRO_ERROR,
          payload: alerta,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iniciarSesion = async (usuario) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth`;
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: LOGIN_EXITOSO,
          payload: data.token,
        });

        usuarioAutenticado();
      } else {
        const alerta = {
          msg: data?.errores ? data.errores[0] : data.msg,
          categoria: 'alerta-error',
        };
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    const headers = new Headers();

    if (token) headers.append('x-auth-token', token);
    else headers.delete('x-auth-token');

    try {
      const url = `${process.env.REACT_APP_API_URL}/auth`;
      const resp = await fetch(url, { headers });
      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: OBTENER_USUARIO,
          payload: data.usuario,
        });
      } else {
        const alerta = {
          msg: data.msg,
          categoria: 'alerta-error',
        };
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
