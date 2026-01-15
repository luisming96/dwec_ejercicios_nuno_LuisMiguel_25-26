class TiposEnvios {
    #listadoTiposEnvios;
    constructor() {
        this.#listadoTiposEnvios = [];
    }

    existeTipoPorNombre(nombreAbuscar) {
        return this.#listadoTiposEnvios.some(tipo => tipo.nombre === nombreAbuscar);
    }

    insertarTipos(tiposEnvios) {
        let cont = 0;
        for (let tipo of tiposEnvios) {
            if (!this.existeTipoPorNombre(tipo.nombre)) {
                this.#listadoTiposEnvios.push(tipo);
                cont++;
            }
        }
        return cont;
    }

    buscarTiposPorNombre(nombreAbuscar) {
        return this.#listadoTiposEnvios.find(tipo => tipo.nombre === nombreAbuscar) || null;
    }

    obtenerCadenaTiposMenu() {
        if (this.#listadoTiposEnvios.length === 0) {
            return "No hay tipos de envío registrados.";
        }

        const tiposOrdenados = [...this.#listadoTiposEnvios].sort((a, b) => 
            b.precio - a.precio
        );

        return tiposOrdenados.map((tipo, index) => {
            return `${index + 1}. ${tipo.nombre} (${tipo.precio.toFixed(2)}€)`;
        }).join("\n");
    }
}