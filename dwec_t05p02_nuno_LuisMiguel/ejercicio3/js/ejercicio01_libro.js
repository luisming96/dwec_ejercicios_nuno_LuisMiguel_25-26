class Libro {
    #isbn;
    #titulo;
    #genero;
    #autor = [];
    #precio;
    #precioBase;

    static GENEROS_LITERARIOS = new Set([
        "Novela",
        "Poesía",
        "Ensayo",
        "Teatro",
        "Ciencia Ficción",
        "Fantasía",
        "Histórico",
        "Biografía",
        "Terror",
        "Infantil",
    ]);

    constructor(isbn, titulo, autor, genero, precio) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.precio = precio;
        this.#precioBase = precio;
    }

    set isbn(isbn) {
        if (Util.validarEntero(isbn)) {
            this.#isbn = isbn;
        } else {
            throw new Error("ISBN no válido");
        }
    }

    get isbn() {
        return this.#isbn;
    }

    set titulo(titulo) {
        if (Util.validarTitulo(titulo)) {
            this.#titulo = titulo;
        } else {
            throw new Error("Título no válido");
        }
    }

    get titulo() {
        return this.#titulo;
    }

    set genero(genero) {
        if (Util.validarGenero(genero, Libro.GENEROS_LITERARIOS)) {
            this.#genero = genero;
        } else {
            throw new Error("Género no válido");
        }
    }

    get genero() {
        return this.#genero;
    }

    set autor(autor) {
        this.#autor = autor;
    }

    get autor() {
        return this.#autor;
    }

    set precio(precio) {
        if (Util.validarReal(precio)) {
            this.#precio = precio;
        } else {
            throw new Error("Precio no válido");
        }
    }

    get precio() {
        return this.#precio;
    }

    get precioBase() {
        return this.#precioBase;
    }

    mostrarDatosLibro() {
        return `Título: ${this.#titulo}\nISBN: ${this.#isbn}\nAutor: ${this.#autor}\nGénero: ${this.#genero}\nPrecio: ${this.#precio}€ (sin IVA)`;
    }

    deshacerDescuentoLibro() {
        if (this.#precio !== this.#precioBase) {
            this.#precio = this.#precioBase;
        }
    }

    aplicarDescuentoLibro(porcentaje) {
        if (Util.validarReal(porcentaje)) {
            if (this.#precio !== this.#precioBase) {
                this.deshacerDescuentoLibro();
            }
            const descuento = this.#precioBase * (porcentaje / 100);
            this.#precio = this.#precioBase - descuento;
        }
    }
}

class Ebook extends Libro {
    #tamanoArchivo;
    #formato;

    static FORMATOS = new Set(["pdf", "epub", "mobi"]);

    constructor(isbn, titulo, autor, genero, precio, tamanoArchivo, formato) {
        super(isbn, titulo, autor, genero, precio);
        this.tamanoArchivo = tamanoArchivo;
        this.formato = formato;
    }

    set tamanoArchivo(tamano) {
        if (Util.validarTamanoArchivo(tamano)) {
            this.#tamanoArchivo = tamano;
        } else {
            throw new Error("Tamaño de archivo no válido");
        }
    }

    get tamanoArchivo() {
        return this.#tamanoArchivo;
    }

    set formato(formato) {
        if (Util.validarFormato(formato, Ebook.FORMATOS)) {
            this.#formato = formato;
        } else {
            throw new Error("Formato no válido");
        }
    }

    get formato() {
        return this.#formato;
    }

    descargar() {
        return "Descargando ebook...";
    }

    convertirFormato(nuevoFormato) {
        if (Util.validarFormato(nuevoFormato, Ebook.FORMATOS)) {
            this.#formato = nuevoFormato;
        } else {
            throw new Error("No se puede convertir a ese formato");
        }
    }

    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()}\nFormato: ${this.#formato}\nTamaño: ${this.#tamanoArchivo} MiB`;
    }

    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(datosActualizados) {
        datosActualizados.forEach((valor, clave) => {
            if (this.hasOwnProperty(clave)) {
                this[clave] = valor;
            }
        });
    }
}

class LibroPapel extends Libro {
    #peso;
    #dimensiones;
    #stock;

    static STOCK_MINIMO = 2;

    constructor(isbn, titulo, autor, genero, precio, peso, dimensiones, stock) {
        super(isbn, titulo, autor, genero, precio);
        this.peso = peso;
        this.dimensiones = dimensiones;
        this.stock = stock;
    }

    set peso(peso) {
        if (Util.validarPeso(peso)) {
            this.#peso = peso;
        } else {
            throw new Error("Peso no válido");
        }
    }

    get peso() {
        return this.#peso;
    }

    set dimensiones(dimensiones) {
        if (Util.validarDimensiones(dimensiones)) {
            this.#dimensiones = dimensiones;
        } else {
            throw new Error("Dimensiones no válidas");
        }
    }

    get dimensiones() {
        return this.#dimensiones;
    }

    set stock(cantidad) {
        if (Util.validarStock(cantidad)) {
            this.#stock = cantidad;
        } else {
            throw new Error("Stock no válido");
        }
    }

    get stock() {
        return this.#stock;
    }

    embalar() {
        return "Embalando libro...";
    }

    reducirStock() {
        if (this.comprobarDisponibilidad()) {
            this.#stock--;
        } else {
            throw new Error("No hay unidades disponibles en stock");
        }
    }

    ampliarStock(unidades) {
        if (Util.validarEntero(unidades)) {
            this.#stock += unidades;
        } else {
            throw new Error("Cantidad de unidades no válida");
        }
    }

    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()}\nPeso: ${this.#peso}g\nDimensiones: ${this.#dimensiones}\nStock: ${this.#stock}`;
    }

    comprobarDisponibilidad() {
        return this.#stock > 0;
    }

    modificarLibro(datosActualizados) {
        datosActualizados.forEach((valor, clave) => {
            if (this.hasOwnProperty(clave)) {
                this[clave] = valor;
            }
        });
    }
}