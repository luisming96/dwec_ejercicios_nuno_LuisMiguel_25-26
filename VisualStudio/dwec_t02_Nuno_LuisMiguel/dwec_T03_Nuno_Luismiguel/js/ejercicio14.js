console.log("T03 - Ejercicio 14");
let anioNacimiento = parseInt(
  prompt("Introduce el año de tu nacimiento (AAAA)")
);
let mesNacimiento = parseInt(prompt("Introduce tu mes de nacimiento (1-12)"));
let diaNacimiento = parseInt(
  prompt("Introduce el dia de tu nacimiento (1-31)")
);

let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
let mesActual = fechaActual.getMonth() + 1;
let diaActual = fechaActual.getDate();

let edadCandidata = anioActual - anioNacimiento;
let edadFinal = edadCandidata;

if (mesNacimiento > mesActual) {
  edadFinal = edadCandidata - 1;
} else if (mesNacimiento === mesActual && diaNacimiento > diaActual) {
  edadFinal = edadCandidata - 1;
}
console.log("Tu edad actual es: " + edadFinal + " años.");
