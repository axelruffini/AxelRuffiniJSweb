// Obtiene referencias a los elementos del DOM
const formulario = document.querySelector('form');
const nombreTareaInput = document.querySelector('#nombre-tarea');
const descTareaInput = document.querySelector('#desc-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');
// Función de orden superior para agregar funcionalidad de eliminar tarea
function agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index) {
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.classList.add('btn-eliminar');
  botonEliminar.addEventListener('click', async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      tareaDiv.remove();
      tareas.splice(index, 1);
      await guardarTareasEnStorage(tareas);
      Swal.fire(
        '¡Eliminada!',
        'La tarea ha sido eliminada.',
        'success'
      );
    }
  });
  tareaDiv.appendChild(botonEliminar);
}
//  funcionalidad para cambiar estado la tarea
function agregarFuncionalidadCambiarEstadoTarea(tareaDiv, tareas, index, estadoTareaNode) {
  const botonEstado = document.createElement('button');
  botonEstado.textContent = 'Completado / Pendiente';
  botonEstado.classList.add('btn-cambiar-estado');
  botonEstado.addEventListener('click', async () => {
    const tarea = tareas[index];
    tarea.completed = !tarea.completed;
    await guardarTareasEnStorage(tareas);
    estadoTareaNode.textContent = tarea.completed ? 'Completada' : 'Pendiente';
  });
  tareaDiv.appendChild(botonEstado);
}
// Maneja el evento de envío del formulario
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // Prevenir la recarga de la página
  // Obtiene el valor del campo de nombre de la tarea y descripción
  const nombreTareaTexto = nombreTareaInput.value.trim();
  const descTareaTexto = descTareaInput.value.trim();
  if (nombreTareaTexto && descTareaTexto) {
    // Crea un nuevo elemento de div para la tarea y lo agrega al contenedor
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    const estadoTareaNode = document.createElement('span'); // Agregar un elemento span para mostrar el estado de la tarea
    nombreTareaNode.textContent = nombreTareaTexto;
    descTareaNode.textContent = descTareaTexto;
    estadoTareaNode.textContent = 'Pendiente'; // Establecer el estado inicial de la tarea como pendiente
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    tareaDiv.appendChild(estadoTareaNode); // Agregar el elemento span al div de la tarea
    contenedorTareas.appendChild(tareaDiv);
    // Agrega la funcionalidad de eliminar tarea
    try {
      const tareas = await obtenerTareasDelStorage();
      const index = tareas.length;
      agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
      agregarFuncionalidadCambiarEstadoTarea(tareaDiv, tareas, index, estadoTareaNode); // Pasar el elemento span como argumento
      await guardarTareasEnStorage(tareas.concat({ nombre: nombreTareaTexto, descripcion: descTareaTexto, completed: false })); // Agregar el estado de la tarea como falso (pendiente)
      // Limpiar los campos de nombre de tarea y descripción
      nombreTareaInput.value = '';
      descTareaInput.value = '';
    } catch (error) {
      console.error('Error:', error);
    }
  }
});
// Obtiene las tareas almacenadas en el almacenamiento local
function obtenerTareasDelStorage() {
  return new Promise((resolve, reject) => {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    resolve(tareas);
  });
}
// Obtiene la referencia al botón de borrar todas las tareas
const btnBorrarTodas = document.querySelector('#btn-borrar-todas');
// Función para borrar todas las tareas
function borrarTodasLasTareas() {
  // Eliminar todas las tareas del DOM
  while (contenedorTareas.firstChild) {
    contenedorTareas.removeChild(contenedorTareas.firstChild);
  }
  // Eliminar todas las tareas del almacenamiento local
  localStorage.removeItem('tareas');
}
// Agregar el evento de clic al botón de borrar todas las tareas
btnBorrarTodas.addEventListener('click', async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará todas las tareas',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar todas',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
    borrarTodasLasTareas();
    Swal.fire(
      '¡Eliminadas!',
      'Todas las tareas han sido eliminadas.',
      'success'
    );
  }
});
// Guarda las tareas en el almacenamiento local
function guardarTareasEnStorage(tareas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem('tareas', JSON.stringify(tareas));
      resolve();
    }, 0);
  });
}
// Carga las tareas al cargar la página
function obtenerTareas() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(tareas => tareas.slice(0, 2))
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}
// Carga las tareas almacenadas en el almacenamiento local y mostrarlas en la página
async function cargarTareas() {
  try {
    // Cargar tareas almacenadas localmente
    const tareasLocalStorage = await obtenerTareasDelStorage();
    mostrarTareas(tareasLocalStorage);
    // Cargar tareas de la API JSONPlaceholder
    const tareasAPI = await obtenerTareas();
    mostrarTareas(tareasAPI);
  } catch (error) {
    console.error('Error:', error);
  }
}
function mostrarTareas(tareas) {
  for (const tarea of tareas) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    const estadoTareaNode = document.createElement('span');
    nombreTareaNode.textContent = tarea.nombre || tarea.title;
    descTareaNode.textContent = tarea.descripcion || '';
    estadoTareaNode.textContent = tarea.completed ? 'Completo' : 'Pendiente';
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    tareaDiv.appendChild(estadoTareaNode);
    contenedorTareas.appendChild(tareaDiv);
    const index = tareas.indexOf(tarea);
    agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
    agregarFuncionalidadCambiarEstadoTarea(tareaDiv, tareas, index, estadoTareaNode);
  }
}
window.addEventListener('load', cargarTareas);