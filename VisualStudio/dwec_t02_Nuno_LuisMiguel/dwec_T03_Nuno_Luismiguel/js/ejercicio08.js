console.log("T03 - Ejercicio 08");
/*
match(): Extrae todas las coincidencias de una expresión regular y devuelve un array.
search(): Busca la primera coincidencia de una expresión regular y devuelve su índice.
includes(): Verifica si una cadena contiene otra y devuelve un valor booleano (true o false)
 */

const frase = "el sol es amarillo y el cielo es azul";

console.log(frase.includes ("sol"));
console.log(frase.search ("sol"));
console.log(frase.match ("sol"));