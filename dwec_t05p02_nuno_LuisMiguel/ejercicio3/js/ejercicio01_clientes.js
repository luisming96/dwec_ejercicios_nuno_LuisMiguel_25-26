class Clientes {
    #clientes;
    
    constructor() {
        this.#clientes = [];
    }

    get clientes() {
        return this.#clientes;
    }
    
    existeClientePorDNI(dniAbuscar) {
        const encontrado = this.#clientes.find(cliente => cliente.dni === dniAbuscar);
        return encontrado !== undefined;
    }
    
    insertarClientes(clientes) {
        let insertados = 0;
        clientes.forEach(cliente => {
            if (!this.existeClientePorDNI(cliente.dni)) {
                this.#clientes.push(cliente);
                insertados++;
            }
        });
        return insertados;
    }
    
    buscarClientePorDNI(dniAbuscar) {
        const cliente = this.#clientes.find(c => c.dni === dniAbuscar);
        return cliente ? cliente : null;
    }
    
    borrarClientePorDNI(dniAborrar) {
        const indice = this.#clientes.findIndex(c => c.dni === dniAborrar);
        if (indice !== -1) {
            this.#clientes.splice(indice, 1);
            return true;
        }
        return false;
    }
}