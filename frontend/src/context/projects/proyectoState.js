import { useReducer } from 'react';

// import { v4 } from 'uuid';

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from '../../types';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

const ProyectoState = ({ children }) => {
  const initialState = {
    proyectos: [],
    formNuevoProyecto: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null,
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/proyectos`;
      const resp = await fetch(url, {
        headers: {
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (!data.ok) {
        return dispatch({
          type: PROYECTO_ERROR,
          payload: {
            msg: data.msg,
            categoria: 'alerta-error',
          },
        });
      }

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: data.proyectos,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: 'Error en servidor',
          categoria: 'alerta-error',
        },
      });
    }
  };

  const agregarProyecto = async (proyecto) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/proyectos`;
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(proyecto),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (!data.ok) {
        return dispatch({
          type: PROYECTO_ERROR,
          payload: {
            msg: data.msg,
            categoria: 'alerta-error',
          },
        });
      }

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: data.proyecto,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: 'Error en servidor',
          categoria: 'alerta-error',
        },
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  // Obtener proyecto seleccionado
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/proyectos/${proyectoId}`;
      const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (!data.ok) {
        return dispatch({
          type: PROYECTO_ERROR,
          payload: {
            msg: data.msg,
            categoria: 'alerta-error',
          },
        });
      }

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: 'Error en servidor',
          categoria: 'alerta-error',
        },
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formNuevoProyecto: state.formNuevoProyecto,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
