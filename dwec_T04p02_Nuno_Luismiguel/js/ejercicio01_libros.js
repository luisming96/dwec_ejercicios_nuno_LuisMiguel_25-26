class Libros {
    #listadoLibros;

    constructor() {
        this.#listadoLibros = [];
    }

    existeLibroPorIsbn(isbnAbuscar) {
        return this.#listadoLibros.some(libro => libro.isbn === isbnAbuscar);
    }

    insertarLibros(libros) {
    let cont = 0;
    for (let libro of libros) {
        if (!this.existeLibroPorIsbn(libro.isbn)) {
            this.#listadoLibros.push(libro);
            cont++;
        }
    }
    return cont;
    }

    buscarLibroPorIsbn(isbnAbuscar) {
    return this.#listadoLibros.find(l => l.isbn === isbnAbuscar) || null;
    }

    buscarLibroPorTitulo(tituloAbuscar) {
    return this.#listadoLibros.filter(l => l.titulo === tituloAbuscar);
    }

    modificarLibroPorIsbn(isbnAmodificar, mapaConInfo) {
        const libro = this.buscarLibroPorIsbn(isbnAmodificar);
        if(libro){
            libro.modificarLibro(mapaConInfo);
        }
    }

    obtenerCadenaLibrosMenu() {
        if (this.#listadoLibros.length === 0) {
            return "No hay libros en el catálogo.";
        }

        const librosOrdenados = [...this.#listadoLibros].sort((a, b) => 
            a.titulo.localeCompare(b.titulo)
        );

        return librosOrdenados.map((libro, index) => {
            const tipo = libro instanceof Ebook ? "Ebook" : "Libro en papel";
            return `${index + 1}. ${libro.titulo} (${tipo})`;
        }).join("\n");
    }
}