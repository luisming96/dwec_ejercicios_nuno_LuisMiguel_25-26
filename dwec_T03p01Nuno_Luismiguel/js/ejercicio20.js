console.log("T03 - Ejercicio 20");
function validarMiReal(precio) {
    let patt = new RegExp(/^[0-9]{1,6}([\.,][0-9]{2})?$/);
    return patt.test(precio);
}

function convertirMiReal(precioValido) {
    if (validarMiReal(precioValido)) {
        return Number(precioValido.replace(',', '.'));
    }
    return NaN;
}

let precioPrueba1 = "123456,78";
let precioPrueba2 = "99.99";
let precioPrueba3 = "1234567,89";
let precioPrueba4 = "123";

let esValido1 = validarMiReal(precioPrueba1);
let numeroReal1 = convertirMiReal(precioPrueba1);

let esValido2 = validarMiReal(precioPrueba2);
let numeroReal2 = convertirMiReal(precioPrueba2);

let esValido3 = validarMiReal(precioPrueba3);
let numeroReal3 = convertirMiReal(precioPrueba3);

let esValido4 = validarMiReal(precioPrueba4);
let numeroReal4 = convertirMiReal(precioPrueba4);

console.log(precioPrueba1 + "  Válido: " + esValido1 + ", Número: " + numeroReal1);
console.log(precioPrueba2 + "  Válido: " + esValido2 + ", Número: " + numeroReal2);
console.log(precioPrueba3 + "  Válido: " + esValido3 + ", Número: " + numeroReal3);
console.log(precioPrueba4 + "  Válido: " + esValido4 + ", Número: " + numeroReal4);