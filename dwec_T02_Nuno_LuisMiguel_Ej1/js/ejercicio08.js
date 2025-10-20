console.log("T02 - Ejercicio 08");
let numero1 = Number (prompt ("introduce el primer numero"));
let numero2 = Number (prompt ("introduce el segundo numero"));

function calcular_menor (num1, num2) {
    if (num1 < num2) {
        return num1;
    } else {
        return num2;
    }
}
let menor = calcular_menor (numero1, numero2);
let mayor;

if (numero1 === menor) {
    mayor = numero2;
} else {
    mayor = numero1;
}

let numeros_entre = "";
let contador = 0;

for (let i = menor + 1; i < mayor; i++) {
    if (i > menor + 1) {
    numeros_entre += ", ";
    }
    numeros_entre += i;
    contador++;
}
alert(`El numero menor es ${menor}. Entre ${menor} y ${mayor} hay ${contador} numeros: ${numeros_entre}`);
console.log(`El numero menor es ${menor}. Entre ${menor} y ${mayor} hay ${contador} numeros: ${numeros_entre}`);