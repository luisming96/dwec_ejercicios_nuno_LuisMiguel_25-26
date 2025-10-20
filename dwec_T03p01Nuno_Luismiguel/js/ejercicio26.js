console.log("T03 - Ejercicio 26");
let cadena = prompt("Introduce una cadena de texto:");
if (cadena === null) {
  console.log("Cancelado.");
} else {
  cadena = cadena.trim();
  if (cadena.length === 0) {
    console.log("Cadena vacía.");
  } else {

    let letraOriginal = prompt("Introduce la letra que quieres reemplazar:");
    if (letraOriginal === null) {
      console.log("Cancelado.");
    } else {
      letraOriginal = letraOriginal.trim();
      if (letraOriginal.length !== 1) {
        console.log("Debes introducir exactamente una letra.");
      } else {

        let letraNueva = prompt("Introduce la letra de reemplazo:");
        if (letraNueva === null) {
          console.log("Cancelado.");
        } else {
          letraNueva = letraNueva.trim();
          if (letraNueva.length !== 1) {
            console.log("Debes introducir exactamente una letra.");
          } else {
            
            let regex = new RegExp(letraOriginal, "gi");
            if (!regex.test(cadena)) {
              console.log("ERROR: La letra '" + letraOriginal + "' no existe en la cadena.");
            } else {
              let cadenaModificada = cadena.replace(regex, letraNueva);
              console.log("Cadena original: " + cadena);
              console.log("Cadena modificada: " + cadenaModificada);
            }
          }
        }
      }
    }
  }
}