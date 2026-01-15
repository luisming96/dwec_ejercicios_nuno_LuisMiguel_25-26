class Pedido {
    #id;
    #cliente;
    #librosPedido;
    #fecha;
    #tipoEnvioPedido;
    #precioTotalSinEnvioSinIVA;
    #precioTotalConEnvioSinIVA;
    #precioTotalConEnvioConIVA;
    #descuento;
    #abierto;
    static #ultimoId = 0;

    static obtenerSiguienteId() {
        Pedido.#ultimoId++;
        return Pedido.#ultimoId;
    }

    constructor(cliente) {
        if (!cliente) {
            throw new Error("El cliente no es válido.");
        }
        this.#id = Pedido.obtenerSiguienteId();
        this.#cliente = cliente;
        this.#librosPedido = new Map();
        this.#fecha = new Date();
        this.#tipoEnvioPedido = null;
        this.#precioTotalSinEnvioSinIVA = 0;
        this.#precioTotalConEnvioSinIVA = 0;
        this.#precioTotalConEnvioConIVA = 0;
        this.#descuento = 0;
        this.#abierto = true;
    }

    get id() {
        return this.#id;
    }
    get cliente() {
        return this.#cliente;
    }
    get librosPedido() {
        return this.#librosPedido;
    }
    get fecha() {
        return this.#fecha;
    }
    get tipoEnvioPedido() {
        return this.#tipoEnvioPedido;
    }
    get precioTotalSinEnvioSinIVA() {
        return this.#precioTotalSinEnvioSinIVA;
    }
    get precioTotalConEnvioSinIVA() {
        return this.#precioTotalConEnvioSinIVA;
    }
    get precioTotalConEnvioConIVA() {
        return this.#precioTotalConEnvioConIVA;
    }
    get descuento() {
        return this.#descuento;
    }
    get abierto() {
        return this.#abierto;
    }
    set abierto(valor) {
        this.#abierto = valor;
    }

    hayLibros() {
        return this.#librosPedido.size > 0;
    }

    insertarLibro(libro, unidades) {
        if (!libro) {
            throw new Error("El libro no es válido.");
        }

        if (libro instanceof Ebook) {
            unidades = 1;
        } else {
            if (!Util.validarEntero(unidades) || Number(unidades) <= 0) {
                throw new Error("Las unidades deben ser un número entero positivo.");
            }
        }

        this.#librosPedido.set(libro.isbn, { libro: libro, unidades: Number(unidades) });

        let totalUnidades = 0;
        for (let [isbn, datos] of this.#librosPedido) {
            totalUnidades += datos.unidades;
        }
        return totalUnidades;
    }

    establecerTipoEnvio(tipoEnvio) {
        if (!tipoEnvio) {
            return false;
        }

        let tieneSoloEbooks = true;
        let pesoTotal = 0;

        for (let [isbn, datos] of this.#librosPedido) {
            if (datos.libro instanceof LibroPapel) {
                tieneSoloEbooks = false;
                pesoTotal += datos.libro.peso * datos.unidades;
            }
        }

        if (tieneSoloEbooks) {
            return false;
        }

        if (pesoTotal > tipoEnvio.pesoMaximo) {
            return false;
        }

        this.#tipoEnvioPedido = tipoEnvio;
        return true;
    }

    calcularTotal() {
        this.#precioTotalSinEnvioSinIVA = 0;
        const mes = this.#fecha.getMonth() + 1;
        const esPromocion = (mes === 11 || mes === 12);

        for (let [isbn, datos] of this.#librosPedido) {
            let precioLibro = datos.libro.precio;

            if (esPromocion) {
                precioLibro = precioLibro * 0.9;
            }

            this.#precioTotalSinEnvioSinIVA += precioLibro * datos.unidades;
        }

        let tieneSoloEbooks = true;
        for (let [isbn, datos] of this.#librosPedido) {
            if (datos.libro instanceof LibroPapel) {
                tieneSoloEbooks = false;
                break;
            }
        }

        let costoEnvio = 0;
        if (!tieneSoloEbooks && this.#tipoEnvioPedido) {
            costoEnvio = this.#tipoEnvioPedido.precio;
        }

        this.#precioTotalConEnvioSinIVA = this.#precioTotalSinEnvioSinIVA + costoEnvio;
        this.#precioTotalConEnvioConIVA = this.#precioTotalConEnvioSinIVA * 1.21;
    }

    aplicarDescuento(porcentaje) {
        if (!Util.validarReal(porcentaje) || Number(porcentaje) <= 0 || Number(porcentaje) > 100) {
            return false;
        }

        this.#descuento = Number(porcentaje);
        const factor = 1 - (this.#descuento / 100);
        this.#precioTotalSinEnvioSinIVA = this.#precioTotalSinEnvioSinIVA * factor;

        let costoEnvio = 0;
        if (this.#tipoEnvioPedido) {
            costoEnvio = this.#tipoEnvioPedido.precio;
        }

        this.#precioTotalConEnvioSinIVA = this.#precioTotalSinEnvioSinIVA + costoEnvio;
        this.#precioTotalConEnvioConIVA = this.#precioTotalConEnvioSinIVA * 1.21;

        return true;
    }

    mostrarDatosPedido() {
        let cadena = `\n=== PEDIDO #${this.#id} ===\n`;
        cadena += `Cliente: ${this.#cliente.nombreCompleto}\n`;
        cadena += `Fecha: ${this.#fecha.toLocaleDateString()}\n`;
        cadena += `Estado: ${this.#abierto ? 'Abierto' : 'Cerrado'}\n\n`;

        if (this.#librosPedido.size === 0) {
            cadena += "No hay libros en este pedido.\n";
            return cadena;
        }

        cadena += "LIBROS:\n";
        let numLibro = 1;
        for (let [isbn, datos] of this.#librosPedido) {
            const tipo = datos.libro instanceof Ebook ? "Ebook" : "Libro en papel";
            cadena += `${numLibro}. ${datos.libro.titulo} (${tipo}) - ${datos.unidades} ud. - ${(datos.libro.precio * datos.unidades).toFixed(2)}€\n`;
            numLibro++;
        }

        cadena += `\nTipo de envío: ${this.#tipoEnvioPedido ? this.#tipoEnvioPedido.nombre : 'Sin envío'}\n`;
        cadena += `\nPrecio libros (sin IVA): ${this.#precioTotalSinEnvioSinIVA.toFixed(2)}€\n`;
        cadena += `Precio con envío (sin IVA): ${this.#precioTotalConEnvioSinIVA.toFixed(2)}€\n`;
        cadena += `Precio FINAL (con IVA): ${this.#precioTotalConEnvioConIVA.toFixed(2)}€\n`;
        
        if (this.#descuento > 0) {
            cadena += `Descuento aplicado: ${this.#descuento}%\n`;
        }
        return cadena;
    }
}