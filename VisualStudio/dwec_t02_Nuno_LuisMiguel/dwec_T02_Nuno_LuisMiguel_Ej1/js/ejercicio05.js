console.log("T02 - Ejercicio 05");
let numero1 = Number(prompt("Dame un numero:"));
let numero2 = Number(prompt("Dame otro numero:"));
let numero3 = Number(prompt("Dame otro numero:"));
let numero4 = Number(prompt("Dame otro numero:"));
let numero5 = Number(prompt("Dame otro numero:"));

let media = (numero1 + numero2 + numero3 + numero4 + numero5) / 5;
let resultado = "Los siguientes números introducidos son superiores a la media (" + media + "): ";
if (numero1 > media) {
    resultado += numero1 + " ";
} 
if (numero2 > media) {
    resultado += numero2 + " ";
}
if (numero3 > media) {
    resultado += numero3 + " ";
}  
if (numero4 > media) {
    resultado += numero4 + " ";
}
if (numero5 > media) {
    resultado += numero5 + " ";
}
alert(resultado);
console.log(resultado);