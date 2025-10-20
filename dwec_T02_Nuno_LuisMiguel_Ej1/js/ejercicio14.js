console.log("T02 - Ejercicio 14");

let numero = parseInt(prompt("Introduce un número para comprobar si es abundante o no"));
if (isNaN (numero) || numero <= 0) {
    console.log("El valor introducido no es un número válido");
    alert("El valor introducido no es un número válido");
} else {
    
let sumaDivisores = 0;

for (let i = 1; i <= numero /2; i++) {
    if(numero % i === 0) {
        sumaDivisores += i;
    }  
}
if (sumaDivisores > numero) {
    alert(`El número ${numero} es abundante, ya que la suma de sus divisores (${sumaDivisores}) es mayor que ${numero}.`);
} else {
    alert(`El número ${numero} no es abundante, ya que la suma de sus divisores (${sumaDivisores}) no es mayor que ${numero}.`);
    }
}