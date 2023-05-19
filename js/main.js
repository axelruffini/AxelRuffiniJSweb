
// Obtener referencias a los elementos del DOM
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

// Maneja el evento de envío del formulario
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // Prevenir la recarga de la página

  // Obtener el valor del campo de nombre de tarea y descripción
  const nombreTareaTexto = nombreTareaInput.value.trim();
  const descTareaTexto = descTareaInput.value.trim();

  if (nombreTareaTexto && descTareaTexto) {
    // Crear un nuevo elemento de div para la tarea y agregarlo al contenedor
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    nombreTareaNode.textContent = nombreTareaTexto;
    descTareaNode.textContent = descTareaTexto;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    contenedorTareas.appendChild(tareaDiv);

    // Agregar la funcionalidad de eliminar tarea
    try {
      const tareas = await obtenerTareasDelStorage();
      const index = tareas.length;
      agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
      await guardarTareasEnStorage(tareas.concat({ nombre: nombreTareaTexto, descripcion: descTareaTexto }));

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

// Guardar las tareas en el almacenamiento local
function guardarTareasEnStorage(tareas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem('tareas', JSON.stringify(tareas));
      resolve();
    }, 0);
  });
}

// Cargar las tareas almacenadas en el almacenamiento local y mostrarlas en la página
async function cargarTareas() {
  try {
    const tareas = await obtenerTareasDelStorage();
    for (const tarea of tareas) {
      const tareaDiv = document.createElement('div');
      const nombreTareaNode = document.createElement('h3');
      const descTareaNode = document.createElement('p');
      nombreTareaNode.textContent = tarea.nombre;
      descTareaNode.textContent = tarea.descripcion;
      tareaDiv.appendChild(nombreTareaNode);
      tareaDiv.appendChild(descTareaNode);
      contenedorTareas.appendChild(tareaDiv);

      // Agregar la funcionalidad de eliminar tarea
      const index = tareas.indexOf(tarea);
      agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Cargar las tareas al cargar la página
window.addEventListener('load', cargarTareas);

// Agregar manejo de promesas con fetch usando JSONPlaceholder
function obtenerTareas() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(tareas => tareas.slice(0, 10))
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}

async function cargarTareas() {
  try {
    const tareas = await obtenerTareas();
    for (const tarea of tareas) {
      const tareaDiv = document.createElement('div');
      const nombreTareaNode = document.createElement('h3');
      const descTareaNode = document.createElement('p');
      nombreTareaNode.textContent = tarea.title;
      descTareaNode.textContent = tarea.completed ? 'Completada' : 'Pendiente';
      tareaDiv.appendChild(nombreTareaNode);
      tareaDiv.appendChild(descTareaNode);
      contenedorTareas.appendChild(tareaDiv);


      // Agregar la funcionalidad de eliminar tarea
      const index = tareas.indexOf(tarea);
      agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

window.addEventListener('load', cargarTareas);