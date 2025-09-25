console.log("T03 - Ejercicio 09");
let cantidad = parseInt(prompt("¿Cuántos números quieres introducir?"));
let numeros = [];

for (let i = 0; i < cantidad; i++) {
    let num = parseFloat(prompt("Introduce el número " + (i + 1) + ":"));
    numeros.push(num);
}

let mayor = Math.max(...numeros); // ...toma el array de numeros y lo convierte en una lista de argumentos separados.
let menor = Math.min(...numeros);

console.log("Números introducidos: " + numeros.join(", "));
console.log("El mayor es: " + mayor);
console.log("El menor es: " + menor);