const GENEROS_LITERARIOS = new Set([
    "Novela", "Poesia", "Ensayo", "Teatro", "Ciencia Ficción", 
    "Fantasia", "Histórico", "Biografia", "Terror", "Infantil",
]);

class Libro {
    #isbn;
    #titulo;
    #genero;
    #autores;
    #precio;
    #precioOriginal;

    constructor(isbn, titulo, autores, genero, precio) {
        if (!Util.validarEntero(isbn) || isbn <= 0) {
            throw new Error(`ISBN inválido: Debe ser un número entero positivo. Recibido: ${isbn}`);
        }
        this.#isbn = isbn;
        this.#precioOriginal = precio; 
        this.titulo = titulo;
        this.autores = autores; 
        this.genero = genero;   
        this.precio = precio;
    }

    get isbn() { return this.#isbn; }
    get titulo() { return this.#titulo; }
    get genero() { return this.#genero; }
    get autores() { return this.#autores; }
    get precio() { return this.#precio; }
    get precioOriginal() { return this.#precioOriginal; }

    set titulo(valor) {
        if (!Util.validarTitulo(valor)) { throw new Error(`Título inválido. Recibido: ${valor}`); }
        this.#titulo = valor;
    }
    set autores(arrayAutores) {
        if (!Array.isArray(arrayAutores) || arrayAutores.length === 0) { 
            throw new Error("Debe haber al menos un autor para el libro."); 
        }
        this.#autores = arrayAutores;
    }
    set genero(valor) {
        if (!Util.validarGenero(valor, GENEROS_LITERARIOS)) { 
            throw new Error(`Género inválido: "${valor}".`); 
        }
        this.#genero = valor;
    }
    set precio(valor) {
        if (!Util.validarPrecio(valor)) { 
            throw new Error(`Precio (sin IVA) inválido. Debe ser un real positivo. Recibido: ${valor}`); 
        }
        this.#precio = valor;
    }

    mostrarDatosLibro() {
        const listaAutores = this.#autores.map(a => a.nombreCompleto || a).join(', '); 
        return `
            LIBRO
            Tipo: General
            ISBN: ${this.#isbn}
            Título: ${this.#titulo}
            Género: ${this.#genero}
            Autor(es): ${listaAutores}
            Precio sin IVA: ${this.#precio.toFixed(2)} € (Original: ${this.#precioOriginal.toFixed(2)} €)
        `;
    }

    aplicarDescuentoLibro(descuento) {
        if (!Util.validarReal(descuento) || descuento < 0 || descuento > 100) {
            throw new Error("El porcentaje de descuento debe ser un número entre 0 y 100.");
        }
        if (this.#precio !== this.#precioOriginal) { this.deshacerDescuentoLibro(); }
        const tasaDescuento = descuento / 100;
        this.#precio = this.#precio * (1 - tasaDescuento);
    }

    deshacerDescuentoLibro() {
        if (this.#precio !== this.#precioOriginal) {
            this.#precio = this.#precioOriginal;
        }
    }
    
    comprobarDisponibilidad() { 
        return true; 
    }
    modificarLibro(mapaInfo) { 
        console.warn("Método modificarLibro no implementado en la clase base Libro."); 
        return false;
    }
}

const FORMATOS = new Set(["pdf", "epub", "mobi"]);

class Ebook extends Libro {
    #tamanoArchivo;
    #formato;

    constructor(isbn, titulo, autores, genero, precio, tamanoArchivo, formato) {
        super(isbn, titulo, autores, genero, precio);

        this.tamanoArchivo = tamanoArchivo;
        this.formato = formato;
    }

    get tamanoArchivo() { return this.#tamanoArchivo; }
    get formato() { return this.#formato; }

    set tamanoArchivo(valor) {
        if (!Util.validarTamanoArchivo(valor)) { throw new Error(`Tamaño de archivo inválido. Recibido: ${valor}`); }
        this.#tamanoArchivo = valor;
    }
    set formato(valor) {
        if (!Util.validarFormato(valor, FORMATOS)) { throw new Error(`Formato inválido: "${valor}".`); }
        this.#formato = valor.toLowerCase();
    }

    descargar() {
        return "Descargando...";
    }
    convertirFormato(nuevoFormato) {
        this.formato = nuevoFormato; 
        return `Formato del Ebook (ISBN ${this.isbn}) cambiado a: ${this.formato}`;
    }

    mostrarDatosLibro() {
        const datosPadre = super.mostrarDatosLibro();
        return `
            ${datosPadre.replace('Tipo: General', 'Tipo: EBOOK')}
            Tamaño Archivo: ${this.#tamanoArchivo} MiB
            Formato: ${this.#formato.toUpperCase()}
        `;
    }

    comprobarDisponibilidad() {
        return true;
    }
    
    modificarLibro(mapaInfo) {
        let modificado = super.modificarLibro(mapaInfo);
        
        if (mapaInfo.has('tamanoarchivo')) {
            this.tamanoArchivo = mapaInfo.get('tamanoarchivo');
            modificado = true;
        }
        if (mapaInfo.has('formato')) {
            this.formato = mapaInfo.get('formato');
            modificado = true;
        }
        return modificado;
    }
}

class LibroPapel extends Libro {
    static STOCK_MINIMO = 5;
    #peso;
    #dimensiones;
    #stock;

    constructor(isbn, titulo, autores, genero, precio, peso, dimensiones, stock) {
        super(isbn, titulo, autores, genero, precio);

        this.peso = peso;
        this.dimensiones = dimensiones;
        this.stock = stock;
    }

    get peso() { return this.#peso; }
    get dimensiones() { return this.#dimensiones; }
    get stock() { return this.#stock; }
    static get stockMinimo() { return LibroPapel.STOCK_MINIMO; }

    set peso(valor) {
        if (!Util.validarPeso(valor)) { throw new Error(`Peso inválido. Recibido: ${valor}`); }
        this.#peso = valor;
    }
    set dimensiones(valor) {
        if (!Util.validarDimensiones(valor)) { throw new Error(`Dimensiones inválidas. Recibido: ${valor}`); }
        this.#dimensiones = valor;
    }
    set stock(valor) {
        if (!Util.validarStock(valor)) { throw new Error(`Stock inválido. Recibido: ${valor}`); }
        this.#stock = valor;
    }

    embalar() {
        return "Embalando..";
    }
    reducirStock() {
        if (this.#stock > 0) {
            this.#stock--; 
            return true;
        }
        return false;
    }
    amplicarStock(numUnididades) {
        if (!Util.validarEntero(numUnididades) || numUnididades <= 0) {
            throw new Error("El número de unidades a ampliar debe ser un entero positivo.");
        }
        this.#stock += numUnididades;
    }
    avisoStockMinimo() {
        return this.#stock < LibroPapel.STOCK_MINIMO;
    }

    mostrarDatosLibro() {
        const datosPadre = super.mostrarDatosLibro();
        return `
            ${datosPadre.replace('Tipo: General', 'Tipo: LIBRO EN PAPEL')}
            Peso: ${this.#peso} gramos
            Dimensiones: ${this.#dimensiones}
            Stock Disponible: ${this.#stock} unidades ${this.avisoStockMinimo() ? "(¡Stock Bajo!)" : ""}
        `;
    }

    comprobarDisponibilidad() {
        return this.#stock > 0;
    }
    
    modificarLibro(mapaInfo) {
        let modificado = super.modificarLibro(mapaInfo);
        
        if (mapaInfo.has('peso')) {
            this.peso = mapaInfo.get('peso');
            modificado = true;
        }
        if (mapaInfo.has('dimensiones')) {
            this.dimensiones = mapaInfo.get('dimensiones');
            modificado = true;
        }
        if (mapaInfo.has('stock')) {
            this.stock = mapaInfo.get('stock');
            modificado = true;
        }
        return modificado;
    }
}