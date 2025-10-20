console.log("T03 - Ejercicio 23");
let output = document.getElementById("output");

function validarFormatoFecha(cadena) {
    let patron = /^(\d{2})([-\/])(\d{2})\2(\d{2}|\d{4})$/;
    let m = cadena.match(patron);

    if (!m) return false;

    let dia = parseInt(m[1], 10);
    let mes = parseInt(m[3], 10);
    let anoTexto = m[4];
    let anio = parseInt(anoTexto, 10);

    if (anoTexto.length === 2) anio += 2000;

    if (mes < 1 || mes > 12) return false;

    let fechaObjeto = new Date(anio, mes - 1, dia);

    if (fechaObjeto.getFullYear() !== anio || fechaObjeto.getMonth() !== mes - 1 || fechaObjeto.getDate() !== dia) {
        return false;
    }
    return true;
}

let entrada = prompt("Introduce una fecha (DD-MM-YYYY, DD-MM-YY, DD/MM/YYYY o DD/MM/YY):");

if (entrada === null) {
    output.innerHTML = "Cancelado";
} else {
    entrada = entrada.trim();
    if (entrada.length === 0) {
        output.innerHTML = "Vacío";
    } else {
        let esValida = validarFormatoFecha(entrada);
        if (esValida) {
            output.innerHTML = "Formato y fecha correctos";
        } else {
            output.innerHTML = "Formato o fecha incorrectos";
        }
    }
}