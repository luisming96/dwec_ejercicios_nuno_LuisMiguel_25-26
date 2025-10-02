console.log("T03 - Ejercicio 25");
let cadena = prompt("Introduce la cadena de texto:");

if (cadena === null) {
  console.log("Cancelado.");
} else {
  cadena = cadena.trim();
  if (cadena.length === 0) {
    console.log("Cadena vacía.");
  } else {
    let letra = prompt("Introduce una letra a contar:");
    if (letra === null) {
      console.log("Cancelado.");
    } else {
      letra = letra.trim();
      if (letra.length !== 1) {
        console.log("Debes introducir exactamente una letra.");
      } else {
        let patron = new RegExp(letra, "gi");
        let coincidencias = cadena.match(patron);
        if (coincidencias === null) {
          console.log("ERROR: La letra no existe en la cadena.");
        } else {
          console.log("La letra '" + letra + "' aparece " + coincidencias.length +" veces.");
        }
      }
    }
  }
}