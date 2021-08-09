import { useContext } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import proyectoContext from '../../context/projects/proyectoContext';
import Tarea from './Tarea';
import tareaContext from '../../context/tasks/tareaContext';

export default function ListadoTareas() {
  const { proyecto, eliminarProyecto } = useContext(proyectoContext);
  const { tareasProyecto } = useContext(tareaContext);

  if (!proyecto) return <h2>Seleccione un proyecto</h2>;

  const [proyectoActual] = proyecto;
  const { _id, nombre } = proyectoActual;

  return (
    <>
      <h2>Proyecto: {nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length !== 0 ? (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={300} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        )}
      </ul>
      <button
        onClick={() => eliminarProyecto(_id)}
        className="btn btn-eliminar"
      >
        &times; Eliminar proyecto
      </button>
    </>
  );
}
