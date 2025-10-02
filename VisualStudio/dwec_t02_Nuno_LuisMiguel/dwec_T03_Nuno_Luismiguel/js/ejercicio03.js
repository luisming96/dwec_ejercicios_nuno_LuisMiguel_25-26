console.log("T03 - Ejercicio 03");
let texto = prompt("Escribe una cadena de texto:");

let palabras = texto.split(" ").filter(p => p !== "");

console.log("Número de palabras: " + palabras.length);
console.log("Las palabras son:");
console.log(palabras.join("\n"));