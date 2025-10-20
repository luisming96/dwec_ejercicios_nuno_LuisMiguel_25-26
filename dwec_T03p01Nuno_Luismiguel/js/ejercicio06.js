console.log("T03 - Ejercicio 06");
console.log("T03 - Ejercicio 06");
let fechaIngresada = prompt('Introduce una fecha ("DD-MM-YYYY", "DD/MM/YYYY" o "DD MM YYYY"):');
let separador = "";

if (fechaIngresada.indexOf("-") !== -1) {
    separador = "-";
} else if (fechaIngresada.indexOf("/") !== -1) {
    separador = "/";
} else {
    separador = " ";
}

let partes = fechaIngresada.split(separador);
let dia = parseInt(partes[0]);
let mes = parseInt(partes[1]) - 1
let anio = parseInt(partes[2]);

let fechaObjeto = new Date(anio, mes, dia);

let valido = fechaObjeto.getFullYear() === anio &&
            fechaObjeto.getMonth() === mes &&
            fechaObjeto.getDate() === dia;

console.log("Separador detectado: '" + separador + "'");
console.log("Fecha introducida: " + fechaIngresada);
console.log("Objeto Date generado: " + fechaObjeto);
console.log(valido ? "La fecha es válida" : "La fecha no es válida");