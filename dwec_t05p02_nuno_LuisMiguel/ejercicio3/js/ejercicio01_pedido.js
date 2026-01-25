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

    static ultimoIdAsignado = 0;

    constructor(cliente) {
        this.#id = this.obtenerSiguienteId();
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

    obtenerSiguienteId() {
        Pedido.ultimoIdAsignado++;
        return Pedido.ultimoIdAsignado;
    }

    get id() {
        return this.#id;
    }

    get cliente() {
        return this.#cliente;
    }

    get fecha() {
        return this.#fecha;
    }

    get librosPedido() {
        return this.#librosPedido;
    }

    get precioTotalSinEnvio() {
        return this.#precioTotalSinEnvioSinIVA;
    }

    get precioTotalConEnvioConIVA() {
        return this.#precioTotalConEnvioConIVA.toFixed(2);
    }

    get tipoEnvioPedido() {
        return this.#tipoEnvioPedido;
    }

    set tipoEnvioPedido(tipo) {
        this.#tipoEnvioPedido = tipo;
    }

    get abierto() {
        return this.#abierto;
    }

    hayLibros() {
        return this.#librosPedido.size > 0;
    }

    hayLibrosFisicos() {
        let tieneLibrosPapel = false;
        
        this.#librosPedido.forEach((unidades, libro) => {
            if (libro instanceof LibroPapel) {
                tieneLibrosPapel = true;
            }
        });
        
        return tieneLibrosPapel;
    }

    hayEbooks() {
        let tieneEbooks = false;
        
        this.#librosPedido.forEach((unidades, libro) => {
            if (libro instanceof Ebook) {
                tieneEbooks = true;
            }
        });
        
        return tieneEbooks;
    }

    mostrarDatosPedido() {
        let info = `Pedido ID: ${this.#id}\n`;
        info += `Cliente: ${this.#cliente.nombreCompleto}\n`;
        info += `Fecha: ${this.#fecha.toLocaleDateString()}\n`;
        info += `Libros:\n`;
        
        this.#librosPedido.forEach((unidades, libro) => {
            info += `  - ${libro.titulo} x${unidades}\n`;
        });
        
        if (this.#tipoEnvioPedido) {
            info += `Tipo de envío: ${this.#tipoEnvioPedido.nombre}\n`;
        }
        
        info += `Total sin envío: ${this.#precioTotalSinEnvioSinIVA.toFixed(2)}€\n`;
        info += `Total con envío: ${this.#precioTotalConEnvioSinIVA.toFixed(2)}€\n`;
        info += `Total con IVA: ${this.#precioTotalConEnvioConIVA.toFixed(2)}€\n`;
        
        return info;
    }

    insertarLibro(libro, cantidadUnidades) {
        let unidades = cantidadUnidades;
        
        if (libro instanceof Ebook) {
            unidades = 1;
        }
        
        this.#librosPedido.set(libro, unidades);
        
        let totalUnidades = 0;
        this.#librosPedido.forEach((cantidad) => {
            totalUnidades += cantidad;
        });
        
        return totalUnidades;
    }

    establecerTipoEnvio(tipoEnvio) {
        // Si hay libros físicos, se permite envío físico (con coste)
        if (this.hayLibrosFisicos() && tipoEnvio.precio > 0) {
            this.#tipoEnvioPedido = tipoEnvio;
            return true;
        }
        
        // Si solo hay ebooks, solo se permite envío digital (sin coste)
        if (this.hayEbooks() && !this.hayLibrosFisicos() && tipoEnvio.precio === 0) {
            this.#tipoEnvioPedido = tipoEnvio;
            return true;
        }
        
        return false;
    }

    calcularTotal() {
        this.#precioTotalSinEnvioSinIVA = 0;
        this.#precioTotalConEnvioSinIVA = 0;
        this.#precioTotalConEnvioConIVA = 0;

        // Sumar precio de todos los libros
        this.#librosPedido.forEach((unidades, libro) => {
            this.#precioTotalSinEnvioSinIVA += libro.precio * unidades;
        });

        // Añadir envío si hay libros físicos
        let precioEnvio = 0;
        if (this.hayLibrosFisicos() && this.#tipoEnvioPedido !== null) {
            const subtotal = Math.round(this.#precioTotalSinEnvioSinIVA * 100) / 100;
            // Envío gratis si supera el importe mínimo
            precioEnvio = (subtotal >= this.#tipoEnvioPedido.importeMinimo && this.#tipoEnvioPedido.importeMinimo > 0) 
                ? 0 
                : this.#tipoEnvioPedido.precio;
        }
        
        // Total final (precios ya incluyen IVA)
        this.#precioTotalConEnvioSinIVA = this.#precioTotalSinEnvioSinIVA + precioEnvio;
        this.#precioTotalConEnvioConIVA = this.#precioTotalConEnvioSinIVA;
    }

    aplicarDescuento(porcentajeDescuento) {
        if (porcentajeDescuento < 0 || porcentajeDescuento > 100) {
            return false;
        }

        const descuentoCalculado = (this.#precioTotalSinEnvioSinIVA * porcentajeDescuento) / 100;
        this.#descuento = descuentoCalculado;
        this.#precioTotalConEnvioSinIVA -= descuentoCalculado;
        this.#precioTotalConEnvioConIVA = this.#precioTotalConEnvioSinIVA;
        
        return true;
    }

    cerrarPedido() {
        this.#abierto = false;
    }
}