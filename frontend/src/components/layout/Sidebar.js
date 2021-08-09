import NuevoProyecto from '../projects/NuevoProyecto';
import ListadoProyectos from '../projects/ListadoProyectos';

export default function Sidebar() {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>Tus proyectos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
}
