class TiposEnvios {
    #tiposEnvios;

    constructor() {
        this.#tiposEnvios = [];
    }

    get tiposEnvios() {
        return this.#tiposEnvios;
    }

    existeTipoPorNombre(nombreAbuscar) {
        const encontrado = this.#tiposEnvios.find(tipo => tipo.nombre === nombreAbuscar);
        return encontrado !== undefined;
    }

    insertarTipos(tiposEnvios) {
        let insertados = 0;
        
        tiposEnvios.forEach(tipo => {
            if (!this.existeTipoPorNombre(tipo.nombre)) {
                this.#tiposEnvios.push(tipo);
                insertados++;
            }
        });
        
        return insertados;
    }

    buscarTiposPorNombre(nombreAbuscar) {
        const tipo = this.#tiposEnvios.find(t => t.nombre === nombreAbuscar);
        return tipo ? tipo : null;
    }

    obtenerCadenaTiposMenu() {
        if (this.#tiposEnvios.length === 0) {
            return "No hay tipos de envío disponibles";
        }

        const tiposOrdenados = this.#tiposEnvios.slice().sort((a, b) => {
            return b.precio - a.precio;
        });

        let menu = "Tipos de Envío:\n";
        
        tiposOrdenados.forEach((tipo, indice) => {
            menu += `${indice + 1}. ${tipo.nombre} (${tipo.precio.toFixed(2)}€)\n`;
        });

        return menu;
    }
}