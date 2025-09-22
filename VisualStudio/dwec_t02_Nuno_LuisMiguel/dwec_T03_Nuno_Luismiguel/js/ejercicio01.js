console.log("T03 - Ejercicio 01");
/*La principal diferencia radica en cómo interpretan el parámetro de entrada:

toFixed(): Especifica el número de dígitos después del punto decimal.
El método redondea el número si es necesario y agrega ceros si el número de decimales es menor que el especificado.

toPrecision(): Especifica el número total de dígitos significativos que se deben mostrar.
Esto incluye los dígitos antes y después del punto decimal.
Si el número de dígitos significativos es menor que el de la parte entera, puede convertir el número a notación exponencial. */

let numero = 3.1415926535;

console.log(numero.toFixed(2)); // "3.14"
console.log(numero.toFixed(4)); // "3.1416"
console.log(numero.toFixed(10)); // "3.1415926535"

console.log(numero.toPrecision(2)); // "3.1"
console.log(numero.toPrecision(4)); // "3.142"
console.log(numero.toPrecision(10)); // "3.141592654"