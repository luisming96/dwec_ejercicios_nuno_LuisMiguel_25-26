console.log("T03 - Ejercicio 27");
let cadena = prompt("Introduce una cadena de texto:");
if (cadena === null) {
  console.log("Cancelado.");
} else {
  cadena = cadena.trim();
  if (cadena.length === 0) {
    console.log("La cadena está vacía. Tiene 0 palabras.");
  } else {
    let regex = new RegExp("[^ \\t]+", "g");
    let palabras = cadena.match(regex);
    if (palabras === null) {
      console.log("No se encontraron palabras. Tiene 0 palabras.");
    } else {
      console.log("La cadena tiene " + palabras.length + " palabras.");
    }
  }
}
