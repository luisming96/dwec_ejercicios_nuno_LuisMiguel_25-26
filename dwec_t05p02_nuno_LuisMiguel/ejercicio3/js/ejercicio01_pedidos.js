class Pedidos {
    #listadoPedidos;

    constructor() {
        this.#listadoPedidos = [];
    }

    get listadoPedidos() {
        return this.#listadoPedidos;
    }

    existePedidoPorID(idAbuscar) {
        const encontrado = this.#listadoPedidos.find(pedido => pedido.id === idAbuscar);
        return encontrado !== undefined;
    }

    insertarPedido(pedidos) {
        let insertados = 0;
        
        pedidos.forEach(pedido => {
            this.#listadoPedidos.push(pedido);
            insertados++;
        });
        
        return insertados;
    }

    buscarPedidoPorId(idAbuscar) {
        const pedido = this.#listadoPedidos.find(p => p.id === idAbuscar);
        return pedido ? pedido : null;
    }

    cerrarPedidoPorId(idAbuscar) {
        const pedido = this.buscarPedidoPorId(idAbuscar);
        
        if (pedido && pedido.abierto) {
            pedido.cerrarPedido();
            return true;
        }
        
        return false;
    }

    borrarPedidos(pedidosAborrar) {
        let todosEliminados = true;
        
        pedidosAborrar.forEach(pedido => {
            const indice = this.#listadoPedidos.indexOf(pedido);
            
            if (indice !== -1) {
                this.#listadoPedidos.splice(indice, 1);
            } else {
                todosEliminados = false;
            }
        });
        
        return todosEliminados;
    }
}