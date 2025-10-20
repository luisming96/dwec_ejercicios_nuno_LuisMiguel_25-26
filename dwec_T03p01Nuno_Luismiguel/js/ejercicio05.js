console.log("T03 - Ejercicio 05");
let cadena = prompt('Introduce una cadena con el formato "1, 2, 3, 4":');

let sinEspacios = cadena.replaceAll(" ", "");

let arrayNumeros = sinEspacios.split(",").map(num => Number(num));

console.log("Array de números:", arrayNumeros);
