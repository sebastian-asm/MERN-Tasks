import { useReducer } from 'react';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

export default function AlertaState({ children }) {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Ocultar la alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
      {children}
    </alertaContext.Provider>
  );
}
