console.log("T02 - Ejercicio 02");
let numero = parseInt(prompt("Introduzca un numero para comprobar si es multiplo de 2, 5, ambos o ninguno"));
if(isNaN(numero)) {   
console.log("Error: No ha introducido un número válido");
alert("Error: Por favor, introduzca un número válido.");

} else {
if (numero % 2 === 0 && numero % 5 === 0) {
    console.log("El número introducido es multiplo de 2 y 5");
    alert("El número " + numero + " es múltiplo de 2 y de 5.");
} else if (numero % 2 === 0) {
    console.log("El número introducido es multiplo de 2");
    alert("El número " + numero + " es múltiplo de 2.");
} else if (numero % 5 === 0) {
    console.log("El número introducido es multiplo de 5");
    alert("El número " + numero + " es múltiplo de 5.");
} else {
    console.log("El número introducido no es multiplo de 2 ni de 5");
    alert("El número " + numero + " no es múltiplo de 2 ni de 5.");
}
    }