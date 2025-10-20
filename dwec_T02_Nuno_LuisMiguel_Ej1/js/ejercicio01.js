console.log("T02 - Ejercicio 01");
let numero1 = parseFloat (prompt ("introduzca la primera nota"));
let numero2 = parseFloat (prompt ("introduzca la segunda nota"));
let numero3 = parseFloat (prompt ("introduzca la tercera nota"));

let media = (numero1 + numero2 + numero3) / 3;

let calificacion;

if (media < 5) {
    calificacion = "suspenso";
} else if (media < 7) {
    calificacion = "aprobado";
} else if (media < 8.5){
    calificacion ="notable";
} else if (media < 10 ) {
    calificacion ="sobresaliente";
} else {
    calificacion = "La media es mayor que 10. Revisa los valores.";
}
console.log ("la media de las notas introducidas es " + media + "\n" + "la calificacion es: " + calificacion);
alert ("la media de las notas introducidas es " + media + "\n" + "la calificacion es: " + calificacion);