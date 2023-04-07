let cantTareas = prompt("Cuantas tareas desea registrar?");
let tareas = [];
let finalizadas = 0;
let sinFinalizar = 0;

function agregarTarea() {
    tareas.push(prompt("Ingrese la tarea: "));
}

function preguntarFinalizada(tarea) {
    let tareaFinalizada = prompt("Finalizo la tarea " + tarea + " ? Ingrese Si o No: ").toLowerCase();
    if (tareaFinalizada === "si") {
        finalizadas++;
    } else {
        sinFinalizar++;
    }
}

for (let contadorTareas = 1; contadorTareas <= cantTareas; contadorTareas++) {
    agregarTarea();
}

for (let contadorTareas2 = 0; contadorTareas2 < tareas.length; contadorTareas2++) {
    preguntarFinalizada(tareas[contadorTareas2]);
}

let porcentajeFinalizadas = (finalizadas / cantTareas) * 100;
alert("Cantidad de tareas registradas: " + cantTareas);
alert("Cantidad de tareas sin finalizar: " + sinFinalizar);
alert("Cantidad de tareas finalizadas: " + finalizadas);
alert("Porcentaje de tareas finalizadas: " + porcentajeFinalizadas.toFixed(2) + "%");
