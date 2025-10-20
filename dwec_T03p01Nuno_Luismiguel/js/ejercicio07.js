console.log("T03 - Ejercicio 07");
let horaUsuario = prompt("Introduce una una hora con los siguientes formatos (HH:MM || HH-MM || HH.MM): ").trim();
let separador;
if (horaUsuario.includes(":")) {
    separador = ":";
} else if (horaUsuario.includes("-")) {
    separador = "-";
} else {
    separador = "."; 
}

let fechaTrasSeparador = horaUsuario.split(separador);
let hora = Number(fechaTrasSeparador[0]);
let minutos = Number(fechaTrasSeparador[1]);

if (!Number.isInteger(hora) || !Number.isInteger(minutos)) {
    console.log("Hora o minutos no son números válidos");
} else if (hora < 0 || hora > 23) { 
    console.log("Hora inválida"); 
} else if (minutos < 0 || minutos > 59) {
    console.log("Minutos inválidos"); 
} else { 
    console.log("La hora es válida");

    let objetoDate = new Date();
    objetoDate.setHours(hora);
    objetoDate.setMinutes(minutos);
    objetoDate.setSeconds(0);
    objetoDate.setMilliseconds(0);

    console.log("Objeto Date:",objetoDate);
}