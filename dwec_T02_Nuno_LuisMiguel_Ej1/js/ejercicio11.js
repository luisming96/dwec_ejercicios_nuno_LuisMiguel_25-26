console.log("T02 - Ejercicio 11");
let resultado;
let num = Number.parseInt(prompt("Dame un número: "));
if (isNaN(num)) {
    console.log("No es un numero");
    alert("No es un numero");
} else {
    resultado = factorialImpar(num);
    console.log(resultado);
    alert(resultado);
}

function factorialImpar(num) {
    if (num % 2 === 0) {
        num = num - 1;
    }
    if (num <= 1) {  
        return 1;  
    }
    return num * factorialImpar(num - 2);
}