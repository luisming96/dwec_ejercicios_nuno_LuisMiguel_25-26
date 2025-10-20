let output = document.getElementById("output");

function validarDNI(cadena) {
    let patronDNI = new RegExp("^[0-9]{8}[A-Z]$");
    if (!patronDNI.test(cadena)) return false;
    let numero = parseInt(cadena.substring(0, 8), 10);
    let letra = cadena.charAt(8);
    let letras = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
    let letraEsperada = letras[numero % 23];
    return letra === letraEsperada;
}

function validarCIF(cadena) {
    let patronCIF = new RegExp("^[A-Z][0-9]{7}[0-9A-JXP]$");
    if (!patronCIF.test(cadena)) return false;

    let letraInicial = cadena[0];
    let digitos = cadena.substring(1, 8);
    let controlFinal = cadena[8];

    let sumaPares = parseInt(digitos[1], 10) + parseInt(digitos[3], 10) + parseInt(digitos[5], 10);
    let sumaImpares = 0;
    for (let i = 0; i < digitos.length; i += 2) {
        let doble = parseInt(digitos[i], 10) * 2;
        if (doble >= 10) {
            let cifras = String(doble);
            let suma = parseInt(cifras[0], 10) + parseInt(cifras[1], 10);
            sumaImpares += suma;
        } else {
            sumaImpares += doble;
        }
    }

    let sumaTotal = sumaPares + sumaImpares;
    let resto = sumaTotal % 10;
    let codeControl = 10 - resto;
    if (codeControl === 10) codeControl = 0;

    if (letraInicial === 'X' || letraInicial === 'P') {
        let letraEsperada = String.fromCharCode(64 + codeControl);
        return controlFinal === letraEsperada;
    }

    if (!isNaN(controlFinal)) {
        return parseInt(controlFinal, 10) === codeControl;
    } else {
        let letrasControl = ['A','B','C','D','E','F','G','H','I','J'];
        return controlFinal === letrasControl[codeControl - 1];
    }
}

function validarDNIyCIF(cadena) {
    if (!cadena) return false;
    cadena = cadena.trim().toUpperCase();
    return validarDNI(cadena) || validarCIF(cadena);
}

let entrada = prompt("Introduce un DNI o un CIF:");
if (entrada === null) {
    console.log("Cancelado");
} else {
    let doc = entrada.toUpperCase();
    if (validarDNIyCIF(doc)) {
        console.log("El documento " + doc + " es VÁLIDO.");
    } else {
        console.log("El documento " + doc + " NO es válido.");
    }
}