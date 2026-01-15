class Autores {
    #autores;
    
    constructor() {
        this.#autores = [];
    }

    get autores() {
        return this.#autores;
    }

    existeAutorPorNombre(nombreAbuscar) {
        const resultado = this.#autores.find(autor => autor.nombreCompleto === nombreAbuscar);
        return resultado !== undefined;
    }
    
    insertarAutores(autores) {
        let insertados = 0;
        autores.forEach(autor => {
            if (!this.existeAutorPorNombre(autor.nombreCompleto)) {
                this.#autores.push(autor);
                insertados++;
            }
        });
        return insertados;
    }
    
    buscarAutoresPorId(idAbuscar) {
        const autor = this.#autores.find(a => a.id === idAbuscar);
        return autor || null;
    }
    
    buscarAutoresPorNombre(nombreAbuscar) {
        return this.#autores.filter(autor => autor.nombreCompleto.includes(nombreAbuscar));
    }
    
    obtenerCadenaAutoresMenu() {
        const ordenados = this.#autores.slice().sort((a, b) => {
            return a.nombreCompleto.toLowerCase().localeCompare(b.nombreCompleto.toLowerCase());
        });
        
        let texto = "Autores: ";
        ordenados.forEach((autor, idx) => {
            texto += `\n${idx + 1}.- ${autor.nombreCompleto} (${autor.libros.length})`;
        });
        return texto;
    }
}