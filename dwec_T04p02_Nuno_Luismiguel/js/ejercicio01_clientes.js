class Clientes {
    #listadoClientes;

    constructor() {
        this.#listadoClientes = [];
    }

    existeClientePorDNI(dniAbuscar) {
        return this.#listadoClientes.some(cliente => cliente.dni === dniAbuscar);
    }

    insertarClientes(clientes) {
        let cont = 0;
        for (let cliente of clientes) {
            if (!this.existeClientePorDNI(cliente.dni)) {
                this.#listadoClientes.push(cliente);
                cont++;
            }
        }
        return cont;
    }

    buscarClientePorDNI(dniAbuscar) {
        return this.#listadoClientes.find(cliente => cliente.dni === dniAbuscar) || null;
    }

    borrarClientePorDNI(dniAborrar) {
        const indice = this.#listadoClientes.findIndex(cliente => cliente.dni === dniAborrar);
        
        if (indice === -1) {
            return false;
        }

        this.#listadoClientes.splice(indice, 1);
        return true;
    }
}