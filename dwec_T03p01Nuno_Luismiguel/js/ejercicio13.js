console.log("T03 - Ejercicio 13");

Math.random2 = function (lim_inf, lim_sup) {
  return Math.floor(Math.random() * (lim_sup - lim_inf + 1) + lim_inf);
};

let unidades, decenas, centenas, unidadesMillar, decenasMillar;

decenasMillar = Math.random2(0, 9);
unidadesMillar = Math.random2(0, 9);
centenas = Math.random2(0, 9);
decenas = Math.random2(0, 9);
unidades = Math.random2(0, 9);

console.log(
  `El número premiado es: ${decenasMillar}${unidadesMillar}${centenas}${decenas}${unidades}`
);
