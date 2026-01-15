class Cliente {
    #dni;
    #nombreCompleto;
    #direccion;
    #listaPedidos;
    
    constructor(dni, nombreCompleto, direccion) {
        this.dni = dni;
        this.nombreCompleto = nombreCompleto;
        this.direccion = direccion;
        this.#listaPedidos = [];
    }
    
    get dni() {
        return this.#dni;
    }

    set dni(dni) {
        if (Util.validarDni(dni)) {
            this.#dni = dni;
        } else {
            throw new Error("El DNI no es correcto");
        }
    }

    get nombreCompleto() {
        return this.#nombreCompleto;
    }

    set nombreCompleto(nombreCompleto) {
        if (Util.validarNombrePersona(nombreCompleto)) {
            this.#nombreCompleto = nombreCompleto;
        } else {
            throw new Error("El nombre no es válido");
        }
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(direccion) {
        if (Util.validarDireccion(direccion)) {
            this.#direccion = direccion;
        }
    }

    get listaPedidos() {
        return this.#listaPedidos;
    }
    
    mostrarDatosCliente() {
        return `${this.#nombreCompleto}, DNI: ${this.#dni}, Dirección: ${this.#direccion}`;
    }
    
    insertarPedido(pedido) {
        this.#listaPedidos.push(pedido);
        return this.#listaPedidos.length;
    }
}