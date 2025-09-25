console.log("T03 - Ejercicio 12");

function generarNumeros() {
  return Math.floor(Math.random() * 10);
}

let unidades, decenas, centenas, unidadesMillar, decenasMillar;

decenasMillar = generarNumeros();
unidadesMillar = generarNumeros();
centenas = generarNumeros();
decenas = generarNumeros();
unidades = generarNumeros();

console.log(
  `El número premiado es: ${decenasMillar}${unidadesMillar}${centenas}${decenas}${unidades}`
);
