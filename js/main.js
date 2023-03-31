let cantTareas = prompt("Cuantas tareas desea registrar?");
let tareas = [];
let finalizadas = 0;
let SinFinalizar = 0;

for (let contadorTareas = 1; contadorTareas <= cantTareas; contadorTareas++) {
    tareas[tareas.length] = prompt("Ingrese la tarea: ");
}

for (let contadorTareas2 = 0; contadorTareas2 < tareas.length; contadorTareas2++) {
    let tareaFinalizada = prompt("Finalizo la tarea " + tareas[contadorTareas2] + " ? Ingrese Si o No: ");
    if (tareaFinalizada === "si") {
        finalizadas++;
    } else {
        SinFinalizar++;
    }
}

let porcentajeFinalizadas = (finalizadas / cantTareas) * 100;
alert("Cantidad de tareas registradas: " + cantTareas);
alert("Cantidad de tareas sin finalizar: " + SinFinalizar);
alert("Cantidad de tareas finalizadas: " + finalizadas);
alert("Porcentaje de tareas finalizadas: " + porcentajeFinalizadas.toFixed(2) + "%");