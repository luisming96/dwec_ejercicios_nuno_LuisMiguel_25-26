class Autor {
    #id;
    #nombreCompleto;
    #libros;
    static #ultimoId = 0;

    static obtenerSiguienteId() {
        this.#ultimoId++;
        return this.#ultimoId;
    } 

    constructor(nombreCompleto) {
        this.#id = Autor.obtenerSiguienteId();
        this.nombreCompleto = nombreCompleto;
        this.#libros = [];
    }

    get id() { 
        return this.#id; 
    }

    get nombreCompleto() { 
        return this.#nombreCompleto; 
    }
    
    set nombreCompleto(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("El nombre del autor no es válido.");
        }
        this.#nombreCompleto = valor.trim();
    }

    get libros() { 
        return this.#libros; 
    }

    mostrarDatosAutor() {
        return `ID: ${this.#id} | Nombre: ${this.#nombreCompleto} | Libros publicados: ${this.#libros.length}`;
    }

    insertarLibro(libro) {
    this.#libros.push(libro);
    return this.#libros.length;
    }

    tieneLibros() {
        return this.#libros.length > 0;
    }
}