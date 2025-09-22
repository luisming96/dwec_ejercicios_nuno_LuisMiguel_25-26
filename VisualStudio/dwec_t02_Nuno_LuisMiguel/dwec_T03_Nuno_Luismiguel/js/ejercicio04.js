console.log("T03 - Ejercicio 04");
let frase = prompt("Escribe una frase:");
let palabra = prompt("Escribe una palabra a buscar:");

let palabras = frase.split(" ").filter(p => p !== "");

let contador = 0;
for(let i = 0; i < palabras.length; i++) {
    if(palabras[i] === palabra) {
        contador++;
    }
}

if(contador > 0) {
    console.log("La palabra '" + palabra + "' aparece " + contador + " veces en la frase.");
} else {
    console.log("Error: La palabra '" + palabra + "' no se encuentra en la frase.");
}