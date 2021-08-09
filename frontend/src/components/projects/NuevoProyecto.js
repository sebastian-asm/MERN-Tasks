import { useState, useContext } from 'react';

import proyectoContext from '../../context/projects/proyectoContext';

export default function NuevoProyecto() {
  const {
    formNuevoProyecto,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = useContext(proyectoContext);

  const [proyecto, setProyecto] = useState({
    nombre: '',
  });

  const { nombre } = proyecto;

  const handleChange = ({ target }) => {
    setProyecto({
      ...proyecto,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '') return mostrarError();
    agregarProyecto(proyecto); // Se pasa el proyecto al contexto global

    // Reiniciar formulario
    setProyecto({
      nombre: '',
    });
  };

  return (
    <>
      <button
        onClick={() => mostrarFormulario()}
        className="btn btn-primario btn-block"
      >
        Nuevo proyecto
      </button>

      {formNuevoProyecto && (
        <form onSubmit={handleSubmit} className="formulario-nuevo-proyecto">
          <input
            onChange={handleChange}
            value={nombre}
            type="text"
            className="input-text"
            name="nombre"
            placeholder="Nombre del proyecto"
          />
          <button type="submit" className="btn btn-primario btn-block">
            Agregar
          </button>
        </form>
      )}

      {errorFormulario && (
        <p className="mensaje error">El nombre del proyecto es necesario</p>
      )}
    </>
  );
}
