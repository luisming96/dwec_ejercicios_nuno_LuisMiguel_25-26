class Autor {
    #id;
    #nombreCompleto;
    #libros;
    
    static ultimoIDasignado = 0;
    
    constructor(nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
        this.#id = this.obtenerSiguienteID();
        this.#libros = [];
    }
    
    set nombreCompleto(nombreCompleto) {
        if (Util.validarNombrePersona(nombreCompleto)) {
            this.#nombreCompleto = nombreCompleto;
        } else {
            throw new Error("El nombre no es válido");
        }
    }

    get nombreCompleto() {
        return this.#nombreCompleto;
    }

    get id() {
        return this.#id;
    }

    get libros() {
        return this.#libros;
    }

    obtenerSiguienteID() {
        Autor.ultimoIDasignado++;
        return Autor.ultimoIDasignado;
    }
    
    mostrarDatosAutor() {
        let librosTexto = "";
        this.#libros.forEach(libro => {
            librosTexto += `\n\t${libro.titulo}`;
        });
        return `\nID: ${this.#id}\nNombre: ${this.#nombreCompleto}\nLibros: ${librosTexto}`;
    }
    
    insertarLibro(libro) {
        if (libro instanceof Libro) {
            this.#libros.push(libro);
        }
        return this.#libros.length;
    }
    
    tieneLibros() {
        return this.#libros.length > 0;
    }
}