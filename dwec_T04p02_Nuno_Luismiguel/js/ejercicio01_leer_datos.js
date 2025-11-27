class LeerDatos {
    leerEntero(mensaje) { 
        throw new Error("Método no implementado");}
    leerEnteroHasta(mensaje) { 
        throw new Error("Método no implementado");}
    leerReal(mensaje) { 
        throw new Error("Método no implementado");}
    leerEnteroEntre(mensaje, min, max) { 
        throw new Error("Método no implementado");}
    leerEnteroEntreHasta(mensaje, min, max) { 
        throw new Error("Método no implementado");}
    leerCadena(mensaje, longitud, patron) { 
        throw new Error("Método no implementado");}
    leerCadenaHasta(mensaje, longitud, patron) { 
        throw new Error("Método no implementado");}
}

class LeerDatosPrompt extends LeerDatos {
    leerEntero(mensaje) {
        const valor = prompt(mensaje);
        
        if (!Util.validarEntero(valor)) {
            throw new Error("El valor introducido no es un número entero válido.");
        }
        return Number(valor);
    }

    leerEnteroHasta(mensaje) {
        let valor;
        let esValido = false;
        do {
            try {
                valor = this.leerEntero(mensaje);
                esValido = true;
            } catch (error) {
                console.log(error.message);
            }
        } while (!esValido);
        return valor;
    }

    leerReal(mensaje) {
        const valor = prompt(mensaje);
        if (!Util.validarReal(valor)) {
            throw new Error("El valor introducido no es un número real válido.");
        }
        return Number(valor);
    }

    leerRealHasta(mensaje) {
        let valor;
        let esValido = false;
        do {
            try {
                valor = this.leerReal(mensaje);
                esValido = true;
            } catch (error) {
                console.log(error.message);
            }
        } while (!esValido);
        return valor;
    }

    leerEnteroEntre(mensaje, min, max) {
        const valor = this.leerEntero(mensaje);
        if (valor < min || valor > max) {
            throw new Error(`El número debe estar entre ${min} y ${max}.`);
        }
        return valor;
    }

    leerEnteroEntreHasta(mensaje, min, max) {
        let valor;
        let esValido = false;
        do {
            try {
                valor = this.leerEnteroEntre(mensaje, min, max);
                esValido = true;
            } catch (error) {
                console.log(error.message);
            }
        } while (!esValido);
        return valor;
    }

    leerCadena(mensaje, longitud = 1, patron = null) {
        const valor = prompt(mensaje);
        const valorLimpio = String(valor).trim();
        if (valorLimpio.length < longitud) {
            throw new Error(`El texto debe tener al menos ${longitud} carácter(es).`);
        }

        if (patron !== null) {
            const regex = (patron instanceof RegExp) ? patron : new RegExp(patron);
            if (!regex.test(valorLimpio)) {
                throw new Error("El texto no cumple con el formato requerido.");
            }
        }
        return valorLimpio;
    }

    leerCadenaHasta(mensaje, longitud = 1, patron = null) {
        let valor;
        let esValido = false;
        do {
            try {
                valor = this.leerCadena(mensaje, longitud, patron);
                esValido = true;
            } catch (error) {
                console.log(error.message);
            }
        } while (!esValido);
        return valor;
    }
}