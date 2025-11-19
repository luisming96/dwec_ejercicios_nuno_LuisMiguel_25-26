class LeerDatos {
    metodo(mensaje_o_id) { 
        throw new Error("Método no implementado"); 
    }
}

class LeerDatosPrompt extends LeerDatos {
    
    leerEntero(mensaje_o_id) {
        const valorLeido = prompt(mensaje_o_id);
        const numero = parseInt(valorLeido); 

        if (!Util.validarEntero(numero)) {
            throw new Error(`El valor introducido "${valorLeido}" no es un número entero válido.`);
        }
        return numero;
    }
    
    leerReal(mensaje_o_id) {
        const valorLeido = prompt(mensaje_o_id);
        const numero = parseFloat(valorLeido);

        if (!Util.validarReal(numero)) {
            throw new Error(`El valor introducido "${valorLeido}" no es un número real válido.`);
        }
        return numero;
    }
    
    leerEnteroEntre(mensaje_o_id, min, max) {
        const numero = this.leerEntero(mensaje_o_id); 
        
        if (numero < min || numero > max) {
            throw new Error(`El número debe estar entre ${min} y ${max} (ambos incluidos).`);
        }
        return numero;
    }

    leerCadena(mensaje_o_id, longitudMinima = 1, patron = null) {
        const cadena = prompt(mensaje_o_id);

        if (typeof cadena !== 'string' || cadena.trim().length < longitudMinima) {
            throw new Error(`La cadena no puede estar vacía y debe tener al menos ${longitudMinima} carácter(es).`);
        }
        
        if (patron && !patron.test(cadena)) {
            throw new Error("La cadena no cumple con el patrón requerido.");
        }

        return cadena.trim();
    }

    leerEnteroHasta(mensaje_o_id) {
        let valor;
        let esValido = false;
        while (!esValido) {
            try {
                valor = this.leerEntero(mensaje_o_id);
                esValido = true;
            } catch (error) {
                console.error("Error de entrada:", error.message);
                alert("Error de entrada: " + error.message + ". Inténtalo de nuevo.");
            }
        }
        return valor;
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let valor;
        let esValido = false;
        while (!esValido) {
            try {
                valor = this.leerEnteroEntre(mensaje_o_id, min, max);
                esValido = true;
            } catch (error) {
                console.error("Error de entrada:", error.message);
                alert("Error de entrada: " + error.message + ". Inténtalo de nuevo.");
            }
        }
        return valor;
    }
    
    leerCadenaHasta(mensaje_o_id, longitudMinima = 1, patron = null) {
        let valor;
        let esValido = false;
        while (!esValido) {
            try {
                valor = this.leerCadena(mensaje_o_id, longitudMinima, patron);
                esValido = true;
            } catch (error) {
                console.error("Error de entrada:", error.message);
                alert("Error de entrada: " + error.message + ". Inténtalo de nuevo.");
            }
        }
        return valor;
    }
}