console.log("T02 - Ejercicio 13");
let palabra = prompt("Introduce una palabra:");
palabra = palabra.toLocaleLowerCase();
let palabrainvertida = '';

for (let i = palabra.length - 1; i >= 0; i--) {
    palabrainvertida += palabra[i];
}
    if (palabra === palabrainvertida) {
        alert(`"${palabra}" es un palíndromo.`);
}   else {
        alert(`"${palabra}" no es un palíndromo.`);
}