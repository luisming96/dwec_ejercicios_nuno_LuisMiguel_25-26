console.log("T03 - Ejercicio 17");
let anio1 = parseInt(prompt("Introduce el año de la primera fecha:"));
let mes1 = parseInt(prompt("Introduce el mes de la primera fecha (1-12):"));

let anio2 = parseInt(prompt("Introduce el año de la segunda fecha:"));
let mes2 = parseInt(prompt("Introduce el mes de la segunda fecha (1-12):"));

let totalMeses1 = anio1 * 12 + mes1;
let totalMeses2 = anio2 * 12 + mes2;

if (totalMeses1 > totalMeses2) {
  console.log("La primera fecha es mayor");
} else if (totalMeses2 > totalMeses1) {
  console.log("La segunda fecha es mayor");
} else {
  console.log("Ambas fechas son iguales");
}

let diferencia = Math.abs(totalMeses1 - totalMeses2);
console.log("La diferencia entre ambas fechas es de " + diferencia + " meses");