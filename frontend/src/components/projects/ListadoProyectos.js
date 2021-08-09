import { useContext, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import alertaContent from '../../context/alertas/alertaContext';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/projects/proyectoContext';

export default function ListadoProyectos() {
  const { mensaje, proyectos, obtenerProyectos } = useContext(proyectoContext);
  const { alerta, mostrarAlerta } = useContext(alertaContent);

  useEffect(() => {
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria); // Si existe un error
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0) return <p>Aun no tiene proyectos.</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}

      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={300} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}
