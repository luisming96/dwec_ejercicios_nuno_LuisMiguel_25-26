class Util {
    static validarEntero(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }
        const numero = Number(valor);
        return Number.isInteger(numero);
    }

    static validarReal(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }
        const numero = Number(valor);
        return !Number.isNaN(numero);
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
    
    static validarDni(dni){
        return Util.validarEntero(dni) && Number (dni) > 0;
    }

    static validarDireccion(direccion) {
        return typeof direccion === 'string' && direccion.trim().length >= 3;
    }

    static validarPrecio(precio) {
        return Util.validarReal(precio) && precio > 0;
    }

    static validarTamanoArchivo(tamano) {
        return Util.validarReal(tamano) && tamano > 0;
    }

    static validarPeso(peso) {
        return Util.validarReal(peso) && peso > 0;
    }

    static validarStock(stock) {
        return Util.validarEntero(stock) && Number (stock) >= 0;
    }

    static validarDiasEnvio(dias) {
        return Util.validarEntero(dias) && dias > 0;
    }

    static validarDimensiones(dimensiones) {
        if (typeof dimensiones !== 'string') return false;
        return /^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?$/.test(dimensiones.trim());
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
        if (!formatoLeido || !setFormatosValidos) return false;
        return setFormatosValidos.has(formatoLeido);
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        if (!generoLeido || !setGenerosValidos) return false;
        return setGenerosValidos.has(generoLeido);
    }

    static validarCadenaFecha(valor) {
        if (typeof valor !== 'string') return false;
        const regex = /^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$/;
        return regex.test(valor.trim());
    }

    static validarFecha(valor) {
        if (valor instanceof Date) return !isNaN(valor.getTime());
        if (typeof valor === 'string' && Util.validarCadenaFecha(valor)) {
            const fecha = new Date(valor.replace(/-/g, '/'));
            return !isNaN(fecha.getTime());
        }
        return false;
    }

    static esMesPromocion(fecha, array_meses_promocion) {
        let fechaObj = fecha;
        if (typeof fecha === 'string') {
            fechaObj = new Date(fecha.replace(/-/g, '/'));
        }
        if (!Util.validarFecha(fechaObj)) return false;
        const mes = fechaObj.getMonth() + 1;
        return array_meses_promocion.includes(mes);
    }
}