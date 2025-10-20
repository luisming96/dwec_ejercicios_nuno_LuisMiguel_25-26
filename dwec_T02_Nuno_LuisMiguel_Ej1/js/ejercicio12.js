console.log("T02 - Ejercicio 12");
let capitalInicial = parseFloat(prompt("Ingrese la cantidad de dinero a invertir:"));
let interesAnual = parseFloat(prompt("Ingrese el interés anual (en porcentaje):"));
let anios = parseInt(prompt("Ingrese el número de años que desea invertir:"));

let tasaInteres = interesAnual / 100;
let capitalFinal = capitalInicial * Math.pow(1 + tasaInteres, anios);

alert("El capital final obtenido es: " + capitalFinal.toFixed(2));
console.log("El capital final obtenido es: " + capitalFinal.toFixed(2));