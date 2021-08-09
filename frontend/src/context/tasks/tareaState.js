import { useReducer } from 'react';

// import { v4 } from 'uuid';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from '../../types';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

const TareaState = ({ children }) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = async (proyecto) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/tareas?proyecto=${proyecto}`;
      const resp = await fetch(url, {
        headers: {
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: TAREAS_PROYECTO,
          payload: data.tareas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTarea = async (tarea) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/tareas`;
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(tarea),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: AGREGAR_TAREA,
          payload: data.tarea,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (tareaId, proyectoId) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/tareas/${tareaId}?proyecto=${proyectoId}`;
      const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: ELIMINAR_TAREA,
          payload: tareaId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarTarea = async (tarea) => {
    const token = localStorage.getItem('token') || null;

    try {
      const url = `${process.env.REACT_APP_API_URL}/tareas/${tarea._id}`;
      const resp = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(tarea),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      const data = await resp.json();

      if (data.ok) {
        dispatch({
          type: ACTUALIZAR_TAREA,
          payload: tarea,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
      }}
    >
      {children}
    </tareaContext.Provider>
  );
};

export default TareaState;
