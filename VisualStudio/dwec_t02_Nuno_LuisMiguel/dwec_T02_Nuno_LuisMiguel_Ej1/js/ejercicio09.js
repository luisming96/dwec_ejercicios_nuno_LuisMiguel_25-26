console.log("T02 - Ejercicio 09");
let numero;
do{
    numero =Number(prompt("Introduce un número"));
    if (isNaN(numero) || numero <= 0) {
        console.log("El valor introducido no es un número válido");
        alert("El valor introducido no es un número válido");
    }
} while (isNaN(numero));

function esMultiploDe2(numero) {
    return numero % 2 === 0;
} 
function esMultiploDe3(numero) {
    return numero % 3 === 0;
} 
function esMultiploDe5(numero) {
    return numero % 5 === 0;
}

let mensaje;
let opcion;

do {
    opcion = Number(prompt("Elige una opción: \n1. Múltiplo de 2.\n2. Múltiplo de 3.\n3. Múltiplo de 5.\n0. Salir"));
    switch (opcion) {
        case 1:
            mensaje = esMultiploDe2(numero) ? `El número ${numero} es múltiplo de 2` : `El número ${numero} no es múltiplo de 2`;
            break;
        case 2:
            mensaje = esMultiploDe3(numero) ? `El número ${numero} es múltiplo de 3` : `El número ${numero} no es múltiplo de 3`;
            break;
        case 3:
            mensaje = esMultiploDe5(numero) ? `El número ${numero} es múltiplo de 5` : `El número ${numero} no es múltiplo de 5`;
            break;
        case 0:
            mensaje = "Saliendo del programa...";
            break;
        default:
            mensaje = "Opción no válida.";
            break;
    }
    if (opcion !== 0) {
        alert(mensaje);
        console.log(mensaje);
    }
} while (opcion !== 0);

alert(mensaje);
console.log(mensaje);