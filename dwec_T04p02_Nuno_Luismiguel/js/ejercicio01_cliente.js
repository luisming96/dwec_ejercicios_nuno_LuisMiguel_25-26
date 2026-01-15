class Cliente {
    #dni;
    #nombreCompleto;
    #direccion;
    #pedidos;

    constructor(dni, nombreCompleto, direccion) {
        if (!Util.validarEntero(dni)) {
            throw new Error("El DNI debe ser un número entero válido.");
        }
        this.#dni = Number(dni);

        this.nombreCompleto = nombreCompleto;
        this.direccion = direccion;
        this.#pedidos = [];
    }

    get dni() {
        return this.#dni;
    }

    get nombreCompleto() {
        return this.#nombreCompleto;
    }

    set nombreCompleto(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("El nombre completo no es válido.");
        }
        this.#nombreCompleto = valor.trim();
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(valor) {
        if (!Util.validarDireccion(valor)) {
            throw new Error("La dirección no es válida.");
        }
        this.#direccion = valor.trim();
    }

    get pedidos() {
        return this.#pedidos;
    }

    mostrarDatosCliente() {
        return `DNI: ${this.#dni} | Nombre: ${this.#nombreCompleto} | Dirección: ${this.#direccion} | Pedidos realizados: ${this.#pedidos.length}`;
    }

    mostrarPedidosClienteAbierto() {
        const pedidosAbiertos = this.#pedidos.filter(pedido => pedido.abierto);
        
        if (pedidosAbiertos.length === 0) {
            return "No hay pedidos abiertos para este cliente.";
        }

        return pedidosAbiertos.map((pedido, index) => {
            return `${index + 1}. ${pedido.mostrarDatosPedido()}`;
        }).join("\n");
    }
}