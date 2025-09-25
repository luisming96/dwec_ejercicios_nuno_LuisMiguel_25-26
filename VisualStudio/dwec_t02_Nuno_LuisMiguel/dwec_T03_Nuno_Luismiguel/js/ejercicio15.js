console.log("T03 - Ejercicio 15");
let fechaNac = prompt("Introduce tu fecha de nacimiento (DD/MM/YYYY):");
let partes = fechaNac.split("/");

if (partes.length === 3) {
  let dia = parseInt(partes[0]);
  let mes = parseInt(partes[1]) - 1;
  let anio = parseInt(partes[2]);

  let fecha = new Date(anio, mes, dia);

  if (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes &&
    fecha.getDate() === dia
  ) {
    let hoy = new Date();
    let edad = hoy.getFullYear() - anio;

    if (
      hoy.getMonth() < mes ||
      (hoy.getMonth() === mes && hoy.getDate() < dia)
    ) {
      edad--;
    }

    console.log("Tu edad actual es: " + edad + " años.");
  } else {
    console.log("La fecha introducida no es válida.");
  }
} else {
  console.log("Formato incorrecto. Usa DD/MM/YYYY.");
}
