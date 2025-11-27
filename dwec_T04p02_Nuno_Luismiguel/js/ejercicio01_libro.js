class Libro {
    #isbn;
    #titulo;
    #genero;
    #autores;
    #precio;
    #precioOriginal;
    
    static GENEROS_LITERARIOS = new Set([
        "Novela", "Poesía", "Ensayo", "Teatro", "Ciencia Ficción", 
        "Fantasía", "Histórico", "Biografía", "Terror", "Infantil"
    ]);

    constructor(isbn, titulo, autores, genero, precio) {
        if (!Util.validarEntero(isbn)) {
            throw new Error("El ISBN debe ser un número entero válido.");
        }
        this.#isbn = Number(isbn);

        this.titulo = titulo;
        this.autores = autores; 
        this.genero = genero;
        this.precio = precio;
        this.#precioOriginal = this.#precio; 
    }

    get isbn() { return this.#isbn; }

    get titulo() { return this.#titulo; }
    set titulo(valor) {
        if (!Util.validarTitulo(valor)) {
            throw new Error("El título debe ser una cadena con al menos 1 carácter.");
        }
        this.#titulo = valor.trim();
    }

    get autores() { return this.#autores; }
    set autores(valor) {
        if (!Array.isArray(valor) || valor.length === 0) {
            throw new Error("Debe haber al menos un autor.");
        }
        this.#autores = valor.map(autor => {
            if (typeof autor === 'string') {
                if (!Util.validarNombrePersona(autor)) {
                    throw new Error(`El autor "${autor}" no es válido.`);
                }
                return autor.trim();
            }
            return autor;
        });
    }

    get genero() { return this.#genero; }
    set genero(valor) {
        if (!Util.validarGenero(valor, Libro.GENEROS_LITERARIOS)) {
            throw new Error("El género literario no es válido.");
        }
        this.#genero = valor;
    }

    get precio() { return this.#precio; }
    set precio(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("El precio debe ser un número positivo mayor que 0.");
        }
        this.#precio = Number(valor);
        this.#precioOriginal = this.#precio;
    }

    aplicarDescuentoLibro(descuento) {
        if (!Util.validarReal(descuento) || Number(descuento) <= 0 || Number(descuento) > 100) {
            throw new Error("El descuento debe ser un número entre 0 y 100.");
        }
        const factor = 1 - (Number(descuento) / 100);
        this.#precio = this.#precioOriginal * factor;
    }

    deshacerDescuentoLibro() {
        this.#precio = this.#precioOriginal;
    }

    mostrarDatosLibro() {
        const autoresStr = this.#autores.map(a => a.nombreCompleto || a).join(", ");
        return `ISBN: ${this.#isbn} | Título: ${this.#titulo} | Autor(es): ${autoresStr} | Género: ${this.#genero} | Precio: ${this.#precio.toFixed(2)}€`;
    }

    comprobarDisponibilidad() {
        throw new Error("Este método debe ser implementado por las subclases");
    }

    modificarLibro(mapaInfo) {
        if (mapaInfo.has('titulo')) this.titulo = mapaInfo.get('titulo');
        if (mapaInfo.has('autores')) this.autores = mapaInfo.get('autores');
        if (mapaInfo.has('genero')) this.genero = mapaInfo.get('genero');
        if (mapaInfo.has('precio')) this.precio = mapaInfo.get('precio');
    }
}

class Ebook extends Libro {
    #tamanoArchivo;
    #formato;
    static FORMATOS = new Set(["pdf", "epub", "mobi"]);

    constructor(isbn, titulo, autores, genero, precio, tamanoArchivo, formato) {
        super(isbn, titulo, autores, genero, precio);
        this.tamanoArchivo = tamanoArchivo;
        this.formato = formato;
    }

    get tamanoArchivo() { return this.#tamanoArchivo; }
    set tamanoArchivo(valor) {
        if (!Util.validarTamanoArchivo(valor)) {
            throw new Error("El tamaño del archivo debe ser un número positivo mayor que 0.");
        }
        this.#tamanoArchivo = Number(valor);
    }

    get formato() { return this.#formato; }
    set formato(valor) {
        if (!Util.validarFormato(valor, Ebook.FORMATOS)) {
            throw new Error("El formato no es válido.");
        }
        this.#formato = valor;
    }

    descargar() {
        return "Descargando...";
    }

    convertirFormato(nuevoFormato) {
        this.formato = nuevoFormato;
    }

    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(mapaInfo) {
        super.modificarLibro(mapaInfo);
        
        if (mapaInfo.has('tamanoArchivo')) this.tamanoArchivo = mapaInfo.get('tamanoArchivo');
        if (mapaInfo.has('formato')) this.formato = mapaInfo.get('formato');
    }

    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()} | Tamaño: ${this.#tamanoArchivo} MiB | Formato: ${this.#formato} | Tipo: Ebook`;
    }
}

class LibroPapel extends Libro {
    #peso;
    #dimensiones;
    #stock;

    static STOCK_MINIMO = 5;

    constructor(isbn, titulo, autores, genero, precio, peso, dimensiones, stock) {
        super(isbn, titulo, autores, genero, precio);
        this.peso = peso;
        this.dimensiones = dimensiones;
        this.stock = stock;
    }

    get peso() { return this.#peso; }
    set peso(valor) {
        if (!Util.validarPeso(valor)) {
            throw new Error("El peso debe ser un número positivo mayor que 0.");
        }
        this.#peso = Number(valor);
    }

    get dimensiones() { return this.#dimensiones; }
    set dimensiones(valor) {
        if (!Util.validarDimensiones(valor)) {
            throw new Error("Las dimensiones deben tener el formato correcto (ej: 20x15x3).");
        }
        this.#dimensiones = valor.trim();
    }

    get stock() { return this.#stock; }
    set stock(valor) {
        if (!Util.validarStock(valor)) {
            throw new Error("El stock debe ser un número entero positivo mayor que 0.");
        }
        this.#stock = Number(valor);
    }

    embalar() {
        return "Embalando...";
    }

    reducirStock() {
        if (this.#stock <= 0) {
            throw new Error("No hay stock disponible para reducir.");
        }
        this.#stock -= 1;
    }

    ampliarStock(numUnidades) {
        if (!Util.validarEntero(numUnidades) || Number(numUnidades) <= 0) {
            throw new Error("El número de unidades debe ser un entero positivo.");
        }
        this.#stock += Number(numUnidades);
    }

    avisoStockMinimo() {
        return this.#stock < LibroPapel.STOCK_MINIMO;
    }

    comprobarDisponibilidad() {
        return this.#stock > 0;
    }

    modificarLibro(mapaInfo) {
        super.modificarLibro(mapaInfo);
        if (mapaInfo.has('peso')) this.peso = mapaInfo.get('peso');
        if (mapaInfo.has('dimensiones')) this.dimensiones = mapaInfo.get('dimensiones');
        if (mapaInfo.has('stock')) this.stock = mapaInfo.get('stock');
    }

    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()} | Peso: ${this.#peso}g | Dimensiones: ${this.#dimensiones} | Stock: ${this.#stock} | Tipo: LibroPapel`;
    }
}