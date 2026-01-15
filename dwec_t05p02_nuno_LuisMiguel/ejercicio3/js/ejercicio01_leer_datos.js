class LeerDatos {
    leerEntero(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
    leerEnteroHasta(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
    leerReal(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
    leerRealHasta(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
    leerEnteroEntre(mensaje_o_id, min, max) {
        throw new Error("Método no implementado");
    }
    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        throw new Error("Método no implementado");
    }
    leerCadena(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
    leerCadenaHasta(mensaje_o_id) {
        throw new Error("Método no implementado");
    }
}

class LeerDatosPrompt extends LeerDatos {
    leerEntero(mensaje_o_id) {
        const entrada = prompt(mensaje_o_id);
        const numero = Number(entrada);
        
        if (!Util.validarEntero(numero)) {
            throw new Error("Debe ingresar un número entero válido.");
        }
        return numero;
    }
    
    leerEnteroHasta(mensaje_o_id) {
        let numero;
        let valido = false;
        
        while (!valido) {
            try {
                numero = this.leerEntero(mensaje_o_id);
                valido = true;
            } catch (error) {
                console.error(error.message);
            }
        }
        return numero;
    }

    leerReal(mensaje_o_id) {
        const entrada = prompt(mensaje_o_id);
        const numero = Number(entrada);
        
        if (!Util.validarReal(numero)) {
            throw new Error("Debe ingresar un número real válido.");
        }
        return numero;
    }

    leerRealHasta(mensaje_o_id) {
        let numero;
        let valido = false;
        
        while (!valido) {
            try {
                numero = this.leerReal(mensaje_o_id);
                valido = true;
            } catch (error) {
                console.error(error.message);
            }
        }
        return numero;
    }

    leerEnteroEntre(mensaje_o_id, min, max) {
        const textoCompleto = `${mensaje_o_id} (entre ${min} y ${max})`;
        const entrada = prompt(textoCompleto);
        const numero = Number(entrada);

        if (!Util.validarEntero(numero) || numero < min || numero > max) {
            throw new Error(`El número debe estar entre ${min} y ${max}.`);
        }
        return numero;
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let numero;
        let valido = false;
        
        while (!valido) {
            try {
                numero = this.leerEnteroEntre(mensaje_o_id, min, max);
                valido = true;
            } catch (error) {
                console.error(error.message);
            }
        }
        return numero;
    }

    leerCadenaSimple(mensaje_o_id) {
        const entrada = prompt(mensaje_o_id);
        
        if (entrada === null || entrada.trim().length < 1) {
            throw new Error("La cadena no puede estar vacía.");
        }
        return entrada.trim();
    }

    leerCadenaConLongitud(mensaje_o_id, longitudMinima) {
        const textoCompleto = `${mensaje_o_id} (mínimo ${longitudMinima} caracteres)`;
        const entrada = prompt(textoCompleto);
        
        if (entrada === null || entrada.trim().length < longitudMinima) {
            throw new Error(`La cadena debe tener al menos ${longitudMinima} caracteres.`);
        }
        return entrada.trim();
    }

    leerCadenaConPatron(mensaje_o_id, longitudMinima, patron) {
        const textoCompleto = `${mensaje_o_id} (mínimo ${longitudMinima} caracteres, patrón: ${patron})`;
        const entrada = prompt(textoCompleto);
        const regex = new RegExp(patron);
        
        if (entrada === null || entrada.trim().length < longitudMinima || !regex.test(entrada.trim())) {
            throw new Error(`La cadena debe tener al menos ${longitudMinima} caracteres y cumplir el patrón.`);
        }
        return entrada.trim();
    }

    leerCadenaHasta(...parametros) {
        let cadena;
        let valido = false;
        
        while (!valido) {
            try {
                if (parametros.length === 1) {
                    cadena = this.leerCadenaSimple(parametros[0]);
                } else if (parametros.length === 2) {
                    cadena = this.leerCadenaConLongitud(parametros[0], parametros[1]);
                } else if (parametros.length === 3) {
                    cadena = this.leerCadenaConPatron(parametros[0], parametros[1], parametros[2]);
                }
                valido = true;
            } catch (error) {
                console.error(error.message);
            }
        }
        return cadena;
    }
}