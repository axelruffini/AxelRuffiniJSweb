let tareas = [];
let finalizadas = 0;
let SinFinalizar = 0;

///////////////////////////////////////////////  Ingreso de datos   /////////////////////////////////////////////////////////

let cantTareas = prompt("Cuantas tareas desea registrar?"); //Cuadro de texto cantidad de tareas

function agregarTarea() { //Objeto para el almacenamiento de tareas
  let tareaNombre = prompt("Ingrese el nombre de la tarea: ");
  let tareaDescripcion = prompt("Ingrese la descripción de la tarea: ");
  tareas.push({nombre: tareaNombre, descripcion: tareaDescripcion});
}

function preguntarFinalizada(tarea) {
  let tareaFinalizada;
  do {
    tareaFinalizada = prompt("¿Finalizó la tarea " + tarea.nombre + "? Ingrese Si o No: ").toUpperCase();
  } while (tareaFinalizada !== "SI" && tareaFinalizada !== "NO");
  
  if (tareaFinalizada === "SI") {
    finalizadas++;
  } else {
    SinFinalizar++;
  }
}


///////////////////////////////////////////////  Procesamiento de los datos   /////////////////////////////////////////////////////////
for (let contadorTareas = 0; contadorTareas < cantTareas; contadorTareas++) { //Cuadro de texto para ingresar las tareas
  agregarTarea();
}

for (let contadorTareas2 = 0; contadorTareas2 < tareas.length; contadorTareas2++) { //Cuadro de texto para ingresar las tareas
  preguntarFinalizada(tareas[contadorTareas2]);
}

let porcentajeFinalizadas = (finalizadas / cantTareas) * 100;



let listaTareas = "Tareas registradas: \n";

for (let i = 0; i < tareas.length; i++) { //Crea el listado
  listaTareas += (i + 1) + ". " + tareas[i].nombre + " - " + tareas[i].descripcion + "\n";
}

let buscarTarea = prompt("¿Qué tarea desea buscar?");

let tareaBuscada = tareas.find(
  (unaTarea) => unaTarea.nombre.toUpperCase() === buscarTarea.toUpperCase()
);

if (tareaBuscada) {
  alert("La tarea: " + tareaBuscada.nombre + " fue encontrada, la decripcion es: " + tareaBuscada.descripcion);
} else {
  alert("La tarea no fue encontrada");
}


////////////////////////////////////////  Muestra de datos  ////////////////////////////////////////////////////////////////

alert("Cantidad de tareas registradas: " + cantTareas); //Contador de tareas totales
alert(listaTareas); //Muestra un listado de tareas
alert("Cantidad de tareas finalizadas: " + finalizadas); //Muestra las tareas Finalizadas
alert("Cantidad de tareas sin finalizar: " + SinFinalizar); //Muestra las tareas sin finalizar
alert("Porcentaje de tareas finalizadas: " + porcentajeFinalizadas.toFixed(2) + "%"); //Muestra el porcentaje de tareas finalizadas