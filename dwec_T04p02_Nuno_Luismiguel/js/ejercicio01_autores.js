class Autores {
    #listadoAutores;
    constructor() {
        this.#listadoAutores = [];
    }

    existeAutorPorNombre(nombreAbuscar) {
        return this.#listadoAutores.some(autor => autor.nombreCompleto === nombreAbuscar);
    }

    insertarAutores(autores) {
        let cont = 0;
        for (let autor of autores) {
            if (!this.existeAutorPorNombre(autor.nombreCompleto)) {
                this.#listadoAutores.push(autor);
                cont++;
            }
        }
        return cont;
    }

    buscarAutoresPorId(idAbuscar) {
    return this.#listadoAutores.find(a => a.id === idAbuscar) || null;
}

    buscarAutoresPorNombre(nombreAbuscar) {
    return this.#listadoAutores.find(a => a.nombreCompleto === nombreAbuscar) || null;
}

    obtenerCadenaAutoresMenu() {
        if (this.#listadoAutores.length === 0) {
            return "No hay autores registrados.";
        }

        const autoresOrdenados = [...this.#listadoAutores].sort((a, b) => 
            a.nombreCompleto.localeCompare(b.nombreCompleto)
        );

        return autoresOrdenados.map((autor, index) => {
            return `${index + 1}. ${autor.nombreCompleto} (${autor.libros.length} libros)`;
        }).join("\n");
    }
}