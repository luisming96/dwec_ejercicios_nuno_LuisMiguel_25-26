console.log("T02 - Ejercicio 03");
let repetir = "s";

while (repetir === "s") {
let actual = new Date().getFullYear();
let entrada = prompt("Introduce un año entre 0 y " + actual + ":");
let anio = Number(entrada);

if (anio >= 0 && anio <= actual) {
    if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
    alert(anio + " es bisiesto");
    console.log(anio + " es bisiesto");
    } else {
    alert(anio + " no es bisiesto");
    console.log(anio + " no es bisiesto");
    }
} else {
    alert("El año debe estar entre 0 y " + actual);
}

repetir = prompt("¿Quieres comprobar otro año? (s/n)").toLowerCase();
}
