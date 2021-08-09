import { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/projects/proyectoContext';
import tareaContext from '../../context/tasks/tareaContext';

export default function FormTarea() {
  const { proyecto } = useContext(proyectoContext);
  const {
    tareaSeleccionada,
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
  } = useContext(tareaContext);

  const [tarea, setTarea] = useState({
    nombre: '',
  });

  const { nombre } = tarea;

  // Detectar si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada) setTarea(tareaSeleccionada);
    else setTarea({ nombre: '' });
  }, [tareaSeleccionada]);

  if (!proyecto) return null;

  // Obteniendo los datos del proyecto seleccionado
  const [proyectoActual] = proyecto;
  const { _id } = proyectoActual;

  const handleChange = ({ target }) => {
    setTarea({
      ...tarea,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '') return validarTarea();

    // Verificar si se agrega nueva tarea o actualiza
    if (!tareaSeleccionada) {
      tarea.proyecto = _id; // Agregando el id del proyecto actual
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    obtenerTareas(_id); // Mostrar las tareas el proyecto actual

    setTarea({
      nombre: '',
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            onChange={handleChange}
            value={nombre}
            type="text"
            className="input-text"
            name="nombre"
            placeholder="Nombre de la tarea..."
          />
        </div>

        <div className="contenedor-input">
          <button
            type="submit"
            className="btn btn-primario btn-submit btn-block"
          >
            {tareaSeleccionada ? 'Actualizar tarea' : 'Agregar tarea'}
          </button>
        </div>
      </form>

      {errorTarea && (
        <p className="mensaje error">Debe agregar un nombre a la tarea</p>
      )}
    </div>
  );
}
