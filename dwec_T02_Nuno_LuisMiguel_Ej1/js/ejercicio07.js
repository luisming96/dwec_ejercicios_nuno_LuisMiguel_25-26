console.log("T02 - Ejercicio 07");
let num1 = Number(prompt("Introduce el primer número (o 0 o igual al segundo para terminar):"));
let num2 = Number(prompt("Introduce el segundo número (o 0 o igual al primero para terminar):"));

while (num1 !== num2 && num1 !== 0 && num2 !== 0) {
    if (isNaN(num1) || isNaN(num2)) {
        alert("Entrada no válida. Por favor, introduce solo números.");
    } else {
        alert(`Has introducido: ${num1} y ${num2}. No cumplen la condición.`)
    }
    
    num1 = Number(prompt("Introduce el primer número de nuevo:"));
    num2 = Number(prompt("Introduce el segundo número de nuevo:"));
}

if (num1 === num2) {
    alert(`¡Los números ${num1} y ${num2} son iguales! Fin del programa.`);
} else if (num1 === 0 || num2 === 0) {
    alert(`Uno de los números es cero. Fin del programa.`);
}