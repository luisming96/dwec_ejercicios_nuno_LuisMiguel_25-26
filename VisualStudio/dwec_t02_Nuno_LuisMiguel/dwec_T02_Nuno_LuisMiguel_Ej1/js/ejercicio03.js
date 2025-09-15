console.log("T02 - Ejercicio 03");
let repetir = "s";
let actual = new Date().getFullYear();

while (repetir === "s") {
let anio = Number(prompt("Introduce un año (>= 0):"));

if (anio < 0 || anio > actual) {
    alert("Año fuera de rango");
    console.log("Año fuera de rango");
}

if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
    alert(anio + " es bisiesto");
    console.log(anio + " es bisiesto");
} else {
    alert(anio + " no es bisiesto");
    console.log(anio + " no es bisiesto");
}

repetir = prompt("¿Quieres comprobar otro año? (s/n)").toLowerCase();
}