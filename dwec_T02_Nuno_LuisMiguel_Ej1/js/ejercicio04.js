console.log("T02 - Ejercicio 04");
let num1 = Number(prompt("Dame un numero:"));

function esPrimo(num1){
    if(!Number.isInteger(num1) || num1 < 2) return false;

    for(let i = 2; i <= Math.sqrt(num1); i++){
        if(num1 % i === 0) return false;
    }
    return true;
}

if(esPrimo(num1)){
    alert("El número "+ num1 + " es primo");
    console.log("El número "+ num1 + " es primo");
}else{
    alert("El número "+ num1 + " no es primo");
    console.log("El número "+ num1 + " no es primo");
}