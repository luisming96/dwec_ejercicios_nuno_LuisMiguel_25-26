console.log("T02 - Ejercicio 10");
let numero = parseInt (prompt ("introduce un numero "));

if (isNaN(numero) || numero < 0) {
    if (isNaN(numero)) {
        alert("Entrada no válida. Por favor, introduce un número entero.");
        console.log("Entrada no válida. Por favor, introduce un número entero.");
    } else {
        alert("El factorial no está definido para números negativos.");
        console.log("El factorial no está definido para números negativos.");
    }
} else {
    if (numero === 0 || numero === 1) {
        let resultado = 1;
        alert(`El factorial de ${numero} es: ${resultado}`);
    } 
    else {
        let resultado = 1;
        for (let i = 1; i <= numero; i++) {
            resultado = resultado * i;
        }
        alert(`El factorial de ${numero} es: ${resultado}`);
        console.log(`El factorial de ${numero} es: ${resultado}`);
    }
}