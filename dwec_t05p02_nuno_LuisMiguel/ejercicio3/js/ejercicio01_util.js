class Util {
    static esEntero(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }
        return Number.isInteger(Number(valor));
    }

    static esNumeroReal(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }
        const num = Number(valor);
        return !isNaN(num) && isFinite(num);
    }

    static convertirANumero(valor) {
        return this.esNumeroReal(valor) ? Number(valor) : null;
    }

    static verificarFormatoFecha(cadenaFecha) {
        const patron = /^(?:\d{4}-\d{1,2}-\d{1,2}|\d{1,2}-\d{1,2}-\d{4})$/;
        return patron.test(cadenaFecha);
    }

    static esFechaValida(cadenaFecha) {
        if (!this.verificarFormatoFecha(cadenaFecha)) {
            return false;
        }

        const patronYMD = /^\d{4}-\d{1,2}-\d{1,2}$/;
        const patronDMY = /^\d{1,2}-\d{1,2}-\d{4}$/;
        
        const partes = cadenaFecha.split("-");
        let anio, mes, dia;

        if (patronYMD.test(cadenaFecha)) {
            [anio, mes, dia] = partes.map(Number);
        } else if (patronDMY.test(cadenaFecha)) {
            [dia, mes, anio] = partes.map(Number);
        }

        const fecha = new Date(anio, mes - 1, dia);
        return fecha.getFullYear() === anio && 
               fecha.getMonth() === mes - 1 && 
               fecha.getDate() === dia;
    }

    static validarTitulo(titulo) {
        return typeof titulo === "string" && titulo.trim().length >= 1;
    }

    static validarNombrePersona(nombre) {
        if (typeof nombre !== "string") return false;
        const patron = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇç\s\.]{3,}$/;
        return patron.test(nombre.trim());
    }

    static validarDireccion(direccion) {
        return typeof direccion === "string" && direccion.trim().length >= 3;
    }

    static validarPrecio(precio) {
        return this.esNumeroReal(precio) && Number(precio) > 0;
    }

    static validarTamanoArchivo(tamano) {
        return this.esNumeroReal(tamano) && Number(tamano) > 0;
    }

    static validarPeso(peso) {
        return this.esNumeroReal(peso) && Number(peso) > 0;
    }

    static validarStock(cantidad) {
        return this.esEntero(cantidad) && Number(cantidad) > 0;
    }

    static validarDimensiones(dimensiones) {
        const patron = /^\d+x\d+x\d+$/;
        return typeof dimensiones === "string" && patron.test(dimensiones);
    }

    static verificarMesPromocion(fecha, mesesPromocion) {
        if (!this.esFechaValida(fecha)) {
            return false;
        }
        const fechaObj = new Date(fecha);
        const mesActual = fechaObj.getMonth() + 1;
        return mesesPromocion.includes(mesActual);
    }

    static validarFormato(formato, formatosPermitidos) {
        return formatosPermitidos.has(formato.toLowerCase());
    }

    static validarGenero(genero, generosValidos) {
        return generosValidos.has(genero);
    }

    static validarDiasEnvio(dias) {
        return this.esEntero(dias) && Number(dias) > 0;
    }

    static validarDni(dni) {
        const patron = /^[0-9]{8}[A-Z]$/i;
        
        if (!patron.test(dni)) {
            return false;
        }

        const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letra = dni.charAt(dni.length - 1).toUpperCase();
        const numeros = parseInt(dni.substring(0, 8), 10);
        const posicionCalculada = numeros % 23;
        
        return letra === letrasValidas.charAt(posicionCalculada);
    }

    static validarNombrePedido(nombre) {
        return typeof nombre === "string" && nombre.trim().length >= 3;
    }

    static validarReal(valor) {
        return this.esNumeroReal(valor);
    }

    static validarEntero(valor) {
        return this.esEntero(valor);
    }

    static validarYConvertirReal(valor) {
        return this.convertirANumero(valor);
    }
}