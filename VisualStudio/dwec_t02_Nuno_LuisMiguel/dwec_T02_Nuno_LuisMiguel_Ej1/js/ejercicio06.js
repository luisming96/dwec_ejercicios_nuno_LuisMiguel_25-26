console.log("T02 - Ejercicio 06");

let num1, num2;

    do {
num1 = parseInt(prompt("Introduce el primer número entero:"));
num2 = parseInt(prompt("Introduce el segundo número entero:"));
}   while (isNaN(num1) || isNaN(num2));

let mult = 0;
let esNegativo = (num1 < 0 && num2 > 0) || (num1 > 0 && num2 < 0);

let num1Absoluto = Math.abs(num1);
let num2Absoluto = Math.abs(num2);

    for (let i = 0; i < num2Absoluto; i++) {
    mult += num1Absoluto;
}

    if (esNegativo) {
    mult = -mult;
}

alert("El resultado de la multiplicación es " + mult);
console.log("El resultado de la multiplicación es " + mult);