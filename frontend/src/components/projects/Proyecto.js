import { useContext } from 'react';

import proyectoContext from '../../context/projects/proyectoContext';
import tareaContext from '../../context/tasks/tareaContext';

export default function Proyecto({ proyecto }) {
  const { proyectoActual } = useContext(proyectoContext);
  const { obtenerTareas } = useContext(tareaContext);
  const { _id, nombre } = proyecto;

  const seleccionarProyecto = (id) => {
    proyectoActual(id); // Fijar el proyecto seleccionado
    obtenerTareas(id); // Obtener las tareas del proyecto seleccionado
  };

  return (
    <li>
      <button
        onClick={() => seleccionarProyecto(_id)}
        className="btn btn-blank"
      >
        {nombre}
      </button>
    </li>
  );
}
