console.log("T03p01 - Ejercicio 18");
let fechaNacimiento = prompt("Dame la fecha de nacimiento así: DD/MM/AAAA: ");

if (fechaNacimiento.length !== 10) {
    console.log("Error: la fecha que introduciste no tiene una longitud válida");
} else {

    let partes = fechaNacimiento.split('/');

    if (partes.length !== 3) {
        console.log("Error: no cumple el formato requerido DD/MM/AAAA");
    } else {
        let diaStr = partes[0];
        let mesStr = partes[1];
        let anioStr = partes[2];

        if (diaStr.length !== 2 || mesStr.length !== 2 || anioStr.length !== 4) {
            console.log("Error: día o mes deben tener 2 dígitos y año 4 dígitos");
        }
        else if (isNaN(diaStr) || isNaN(mesStr) || isNaN(anioStr)) {
            console.log("Error: la fecha debe contener solo números");
        }
        else {
            let dia = parseInt(diaStr);
            let mes = parseInt(mesStr) - 1;
            let anio = parseInt(anioStr);

            let fechaNaciFormat = new Date(anio, mes, dia);
            let fechaActual = new Date();
            let diaHoy = fechaActual.getDate();
            let mesHoy = fechaActual.getMonth();
            let anioHoy = fechaActual.getFullYear();

            let edad = anioHoy - fechaNaciFormat.getFullYear();

            if (mesHoy < mes || (mesHoy === mes && diaHoy < dia)) {
                edad--;
            }

            if (diaHoy == dia && mesHoy == mes) {
                console.log("Felicidades hoy es tu cumpleaño disfruta");
                console.log("Tu edad es : " + edad);
            } else {

                let proximoCumple = new Date(anioHoy, mes, dia);

                if (fechaActual > proximoCumple) {
                    proximoCumple.setFullYear(anioHoy + 1);
                }

                let diferenciaTiempo = proximoCumple.getTime() - fechaActual.getTime(); 
                let diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
                console.log("Faltan " + diasRestantes + " días para tu próximo cumpleaños.");
            }
        }
    }
}