import { useContext } from 'react';

import proyectoContext from '../../context/projects/proyectoContext';
import tareaContext from '../../context/tasks/tareaContext';

export default function Tarea({ tarea }) {
  const { proyecto } = useContext(proyectoContext);
  const {
    eliminarTarea,
    obtenerTareas,
    guardarTareaActual,
    actualizarTarea,
  } = useContext(tareaContext);
  const { _id, nombre, estado } = tarea;

  const [proyectoActual] = proyecto;

  const eliminar = (tareaId) => {
    eliminarTarea(tareaId, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  const cambiarEstado = (tarea) => {
    tarea.estado = tarea.estado ? false : true;
    actualizarTarea(tarea);
  };

  const selecionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{nombre}</p>
      <div className="estado">
        {estado ? (
          <button onClick={() => cambiarEstado(tarea)} className="completo">
            Completo
          </button>
        ) : (
          <button onClick={() => cambiarEstado(tarea)} className="incompleto">
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          onClick={() => selecionarTarea(tarea)}
          className="btn btn-primario"
        >
          Editar
        </button>
        <button onClick={() => eliminar(_id)} className="btn btn-secundario">
          Eliminar
        </button>
      </div>
    </li>
  );
}
