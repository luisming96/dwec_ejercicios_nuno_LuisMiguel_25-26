console.log("T04p02 - Ejercicio 01");
class Util {
    static validarEntero(valor) {
        return typeof valor === 'number' && Number.isInteger(valor);
    }

    static validarReal(valor) {
        return typeof valor === 'number' && isFinite(valor);
    }
    
    static validarTitulo(titulo) {
        return typeof titulo === 'string' && titulo.trim().length >= 1;
    }

    static validarNombrePersona(nombre) {
        if (typeof nombre !== 'string') return false;
        const nombreLimpio = nombre.trim();
        if (nombreLimpio.length < 3) return false;
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(nombreLimpio);
    }

    static validarDireccion(direccion) {
        return typeof direccion === 'string' && direccion.trim().length >= 3;
    }

    static validarPrecio(precio) {
        return Util.validarReal(precio) && precio > 0;
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return Util.validarReal(tamanoArchivo) && tamanoArchivo > 0;
    }

    static validarPeso(peso) {
        return Util.validarReal(peso) && peso > 0;
    }

    static validarStock(stock) {
        return Util.validarEntero(stock) && stock >= 0;
    }

    static validarDiasEnvio(dias) {
        return Util.validarEntero(dias) && dias > 0;
    }

    static validarDimensiones(dimensiones) {
        if (typeof dimensiones !== 'string') return false;
        return /^(\d+(\.\d+)?)x(\d+(\.\d+)?)x(\d+(\.\d+)?)$/.test(dimensiones.trim());
    }
    
    static validarFormato(formatoLeido, setFormatosValidos) {
        if (typeof formatoLeido !== 'string' || !(setFormatosValidos instanceof Set)) return false;
        return setFormatosValidos.has(formatoLeido.toLowerCase());
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        if (typeof generoLeido !== 'string' || !(setGenerosValidos instanceof Set)) return false;
        return setGenerosValidos.has(generoLeido);
    }
    
    static validarCadenaFecha(valor) {
        if (typeof valor !== 'string') return false;
        const regex = /^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$/;
        return regex.test(valor.trim());
    }
    
    static validarFecha(valor) {
        let fecha;
        if (valor instanceof Date) {
            fecha = valor;
        } else if (typeof valor === 'string' && Util.validarCadenaFecha(valor)) {
            fecha = new Date(valor.replace(/-/g, '/'));
        } else {
            return false;
        }
        return !isNaN(fecha.getTime());
    }

    static esMesPromocion(fecha, arrayMesesPromocion) {
        if (!Util.validarFecha(fecha)) {
            throw new Error("La fecha proporcionada no es un objeto Date válido para comprobar promoción.");
        }
        if (!Array.isArray(arrayMesesPromocion)) {
            throw new Error("El array de meses de promoción no es válido.");
        }

        const mes = fecha.getMonth();
        return arrayMesesPromocion.includes(mes);
    }

    static calcularPrecioConIVA(precioSinIVA, iva) {
        if (!Util.validarPrecio(precioSinIVA)) {
            throw new Error("Precio sin IVA inválido para el cálculo.");
        }
        if (!Util.validarReal(iva) || iva < 0) {
            throw new Error("Tasa de IVA inválida para el cálculo.");
        }
        return precioSinIVA * (1 + iva);
    }
}