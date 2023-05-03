// Obtener referencias a los elementos del DOM
const formulario = document.querySelector('form');
const nombreTareaInput = document.querySelector('#nombre-tarea');
const descTareaInput = document.querySelector('#desc-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');

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

    // Limpiar los campos de nombre de tarea y descripción
    nombreTareaInput.value = '';
    descTareaInput.value = '';

    // Guardar la tarea en el almacenamiento local
    const tareas = obtenerTareasDelStorage();
    tareas.push({ nombre: nombreTareaTexto, descripcion: descTareaTexto });
    guardarTareasEnStorage(tareas);
  }
});

// Obtiene las tareas almacenadas en el almacenamiento local
function obtenerTareasDelStorage() {
  let tareas = localStorage.getItem('tareas');
  if (!tareas) {
    tareas = [];
  } else {
    tareas = JSON.parse(tareas);
  }
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
    tareaDiv.appendChild(nombreTareaNodo);
    tareaDiv.appendChild(descTareaNodo);
    contenedorTareas.appendChild(tareaDiv);
  }
}

// Cargar las tareas al cargar la página
window.addEventListener('cargar', function () {
  cargarTareas();
});