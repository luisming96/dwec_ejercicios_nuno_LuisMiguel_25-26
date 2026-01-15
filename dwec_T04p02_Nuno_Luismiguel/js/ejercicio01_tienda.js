class Tienda { 
    // ===== Propiedad estática ===== 
    static instancia = null;

    // ===== Método estático Singleton ===== 
    static getInstancia(nombreTienda) { 
            if (Tienda.instancia === null) { 
                Tienda.instancia = new Tienda(nombreTienda); 
            } 
        return Tienda.instancia; 
    } 

    // ===== Atributos =====
    #lector;
    #autores;
    #libros;
    // ===== Constructor ===== 
    constructor(nombreTienda) { 
    // Evitar instanciación directa 
        if (Tienda.instancia !== null) { 
        } 
        this.nombre = nombreTienda;
        this.#lector = new LeerDatosPrompt();
        this.#autores = new Autores();
        this.#libros = new Libros();
    }
    // ===== Otros métodos ===== 
    mostrarMenu() {
        let menu = `
            1. Mostrar catalogo libros disponibles.
            2. Insertar.
            3. opción3.
            0. Salir.
        `;
        console.log(menu);
    }

    pedirOpcion() {
        return this.#lector.leerEnteroEntreHasta("Introduce una opción del menú 0 al 6", 0, 6);
    }

    cargarDatosDePrueba() {
        // Autores
        const a1 = new Autor("Isabel Allende");
        const a2 = new Autor("Brandon Sanderson");

        this.#autores.insertarAutores([a1, a2]);

        // Libros
        const l1 = new LibroPapel(1, "La casa de los espíritus", [a1], "Novela", 20, 0.5, "20x13x3", 10);
        const l2 = new Ebook(2, "La casa de los espíritus (ebook)", [a1], "Novela", 10, 5, "epub");
        const l3 = new LibroPapel(3, "El Camino de los Reyes", [a2], "Fantasía", 25, 0.8, "23x15x5", 5);

        this.#libros.insertarLibros([l1, l2, l3]);
        a1.insertarLibro(l1);
        a1.insertarLibro(l2);
        a2.insertarLibro(l3);
    }

    procesarOpcion(opcion) {
        switch (opcion) {
            case 1:
                this.mostrarCatalogoLibrosDisponibles()
                break;
            case 2:
                console.log("opción 2")
                break;
            case 3:
                console.log("opción 3")
                break;
            case 4:
                console.log("opción 4")
                break;
        
            default:
                console.log("POR DEFECTO")
                break;
        }
    }

    iniciar() {
        this.cargarDatosDePrueba();

        let opcion;
        do {
            this.mostrarMenu();
            opcion = this.pedirOpcion();
            this.procesarOpcion(opcion);
        } while (opcion != 0);
    }

    mostrarCatalogoLibrosDisponibles() {
        console.log("==== Has pulsado la opción 1 del menú . . . ====")
        console.log(
            this.#libros.obtenerCadenaLibrosMenu()
        );
    }
} 