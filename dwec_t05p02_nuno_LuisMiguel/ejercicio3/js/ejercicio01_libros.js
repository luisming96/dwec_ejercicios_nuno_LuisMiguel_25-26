class Libros {
    #libros;

    constructor() {
        this.#libros = [];
    }

    get libros() {
        return this.#libros;
    }

    existeLibroPorIsbn(isbnAbuscar) {
        const encontrado = this.#libros.find(libro => libro.isbn === isbnAbuscar);
        return encontrado !== undefined;
    }

    insertarLibros(libros) {
        let insertados = 0;
        
        libros.forEach(libro => {
            if (!this.existeLibroPorIsbn(libro.isbn)) {
                this.#libros.push(libro);
                insertados++;
            }
        });
        return insertados;
    }

    buscarLibroPorIsbn(isbnAbuscar) {
        const isbnValido = Util.validarYConvertirReal(isbnAbuscar);
        const libro = this.#libros.find(l => l.isbn === isbnValido);
        return libro ? libro : null;
    }

    modificarLibroPorIsbn(isbnAmodificar, datosActualizados) {
        const libro = this.buscarLibroPorIsbn(isbnAmodificar);
        
        if (libro !== null) {
            libro.modificarLibro(datosActualizados);
        }
    }

    obtenerCadenaLibrosMenu() {
        if (this.#libros.length === 0) {
            return "No hay libros disponibles";
        }

        const librosOrdenados = this.#libros.slice().sort((a, b) => {
            return a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase());
        });

        let menu = "Libros:\n";
        
        librosOrdenados.forEach((libro, indice) => {
            let tipo = "";
            
            if (libro instanceof Ebook) {
                tipo = "Ebook";
            } else if (libro instanceof LibroPapel) {
                tipo = "Papel";
            }
            
            menu += `${indice + 1}. ${libro.titulo} (${tipo})\n`;
        });
        return menu;
    }

    buscarLibroPorTitulo(tituloAbuscar) {
        return this.#libros.filter(libro => {
            return libro.titulo.toLowerCase().indexOf(tituloAbuscar.toLowerCase()) !== -1;
        });
    }

    buscarLibroPorGenero(generoAbuscar) {
        return this.#libros.filter(libro => {
            return libro.genero.toLowerCase().indexOf(generoAbuscar.toLowerCase()) !== -1;
        });
    }
}