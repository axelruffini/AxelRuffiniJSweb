// Obtener referencias a los elementos del DOM
const formulario = document.querySelector('form');
const nombreTareaInput = document.querySelector('#nombre-tarea');
const descTareaInput = document.querySelector('#desc-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');

// Función de orden superior para agregar funcionalidad de eliminar tarea
function agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index) {
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    tareaDiv.remove();
    tareas.splice(index, 1);
    guardarTareasEnStorage(tareas);
  });
  tareaDiv.appendChild(botonEliminar);
}

// Maneja el evento de envío del formulario
formulario.addEventListener('submit', function (evento) {
  // Prevenir la recarga de la página
  evento.preventDefault();

  // Obtener el valor del campo de nombre de tarea y descripción
  const nombreTareaTexto = nombreTareaInput.value.trim();
  const descTareaTexto = descTareaInput.value.trim();

  // Crear un nuevo elemento de div para la tarea y agregarlo al contenedor
  if (nombreTareaTexto && descTareaTexto) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    nombreTareaNode.textContent = nombreTareaTexto;
    descTareaNode.textContent = descTareaTexto;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    contenedorTareas.appendChild(tareaDiv);

    // Agregar la funcionalidad de eliminar tarea
    const tareas = obtenerTareasDelStorage();
    const index = tareas.length;
    agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);

    // Limpiar los campos de nombre de tarea y descripción
    nombreTareaInput.value = '';
    descTareaInput.value = '';

    // Guardar la tarea en el almacenamiento local
    tareas.push({ nombre: nombreTareaTexto, descripcion: descTareaTexto });
    guardarTareasEnStorage(tareas);
  }
});

// Obtiene las tareas almacenadas en el almacenamiento local
function obtenerTareasDelStorage() {
  const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  return tareas;
}

// Guardar las tareas en el almacenamiento local
function guardarTareasEnStorage(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Cargar las tareas almacenadas en el almacenamiento local y mostrarlas en la página
function cargarTareas() {
  const tareas = obtenerTareasDelStorage();
  for (const tarea of tareas) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    nombreTareaNode.textContent = tarea.nombre;
    descTareaNode.textContent = tarea.descripcion;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    contenedorTareas.appendChild(tareaDiv);
  }
}

// Cargar las tareas al cargar la página
window.addEventListener('carga', function () {
  cargarTareas();
});
