class Tienda {
    static instancia = null;
    
    static getInstancia(nombreTienda) {
        if (Tienda.instancia === null) {
            Tienda.instancia = new Tienda(nombreTienda || "Librería Digital Plus");
        }
        return Tienda.instancia;
    }

    #libros;
    #autores;
    #tiposEnvios;
    #clientes;
    #pedidos;
    #nombreTienda;
    #lector;

    static IVA = 0.21;

    constructor(nombreTienda) {
        if (Tienda.instancia !== null) {
            throw new Error("Usa Tienda.getInstancia() en lugar de new Tienda()");
        }
        
        this.#nombreTienda = nombreTienda;
        this.#libros = new Libros();
        this.#autores = new Autores();
        this.#tiposEnvios = new TiposEnvios();
        this.#clientes = new Clientes();
        this.#pedidos = new Pedidos();
        this.#lector = new LeerDatosPrompt();
    }

    get libros() { return this.#libros; }
    get autores() { return this.#autores; }
    get clientes() { return this.#clientes; }
    get tiposEnvios() { return this.#tiposEnvios; }
    get pedidos() { return this.#pedidos; }

    cargarDatosPrueba() {
        const autor1 = new Autor("Gabriel García Márquez");
        const autor2 = new Autor("Isabel Allende");
        this.#autores.insertarAutores([autor1, autor2]);

        const ebook1 = new Ebook(987654321, "Cien Años de Soledad", [autor1], "Novela", 14.50, 3072, "epub");
        autor1.insertarLibro(ebook1);

        const papel1 = new LibroPapel(123456789, "La Casa de los Espíritus", [autor2], "Novela", 18.75, 520, "23x16x4", 35);
        autor2.insertarLibro(papel1);

        const papel2 = new LibroPapel(555666777, "El Amor en los Tiempos del Cólera", [autor1], "Novela", 22.90, 680, "21x14x5", 28);
        autor1.insertarLibro(papel2);

        const papel3 = new LibroPapel(888999000, "Paula", [autor2], "Biografía", 16.40, 380, "20x13x3", 45);
        autor2.insertarLibro(papel3);

        const ebook2 = new Ebook(111222333, "Crónica de una Muerte Anunciada", [autor1], "Novela", 11.25, 1800, "pdf");
        autor1.insertarLibro(ebook2);

        this.#libros.insertarLibros([ebook1, papel1, papel2, papel3, ebook2]);

        const cliente1 = new Cliente("98765432X", "María Fernández", "Plaza España 15");
        const cliente2 = new Cliente("45678912Y", "Carlos Rodríguez", "Paseo Marítimo 8");
        this.#clientes.insertarClientes([cliente1, cliente2]);

        const envio1 = new TipoEnvio("Normal", 5, 2.95);
        const envio2 = new TipoEnvio("Urgente", 2, 6.50);
        const envio3 = new TipoEnvio("Descarga", 0, 0);
        this.#tiposEnvios.insertarTipos([envio1, envio2, envio3]);

        const pedido1 = new Pedido(cliente1);
        pedido1.insertarLibro(papel1, 3);
        pedido1.insertarLibro(ebook1, 1);
        pedido1.establecerTipoEnvio(envio1);
        pedido1.calcularTotal();
        cliente1.insertarPedido(pedido1);
        this.#pedidos.insertarPedido([pedido1]);

        const pedido2 = new Pedido(cliente2);
        pedido2.insertarLibro(papel2, 2);
        pedido2.establecerTipoEnvio(envio2);
        pedido2.calcularTotal();
        cliente2.insertarPedido(pedido2);
        this.#pedidos.insertarPedido([pedido2]);
    }

    iniciar() {
        let continuar = true;
        while (continuar) {
            continuar = this.ejecutarOpcionMenu(this.solicitarOpcionMenu());
        }
    }

    mostrarMenu() {
        return `\n=== ${this.#nombreTienda} ===\n` +
               "1. Ver Catálogo Completo\n" +
               "2. Agregar o Editar Libro\n" +
               "3. Modificar Stock\n" +
               "4. Alertas de Inventario\n" +
               "5. Dar de Alta Cliente\n" +
               "6. Consultar Pedidos Cliente\n" +
               "7. Dar de Baja Cliente\n" +
               "8. Generar Pedido\n" +
               "9. Buscar Pedido\n" +
               "10. Panel de Estadísticas\n" +
               "11. Cerrar Aplicación\n";
    }

    solicitarOpcionMenu() {
        return this.#lector.leerEnteroEntreHasta(this.mostrarMenu(), 1, 11);
    }

    ejecutarOpcionMenu(opcion) {
        switch (opcion) {
            case 1: this.visualizarCatalogo(); break;
            case 2: this.agregarOEditarLibro(); break;
            case 3: this.modificarInventario(); break;
            case 4: this.visualizarAlertasStock(); break;
            case 5: this.altaCliente(); break;
            case 6: this.consultarPedidosCliente(); break;
            case 7: this.bajaCliente(); break;
            case 8: this.generarNuevoPedido(); break;
            case 9: this.buscarPedido(); break;
            case 10: this.panelEstadisticas(); break;
            case 11: 
                alert("¡Gracias por usar nuestra aplicación!");
                return false;
        }
        return true;
    }

    solicitarInformacionLibro() {
        let isbn, titulo, genero, precio, autores = [];

        while (!Util.validarReal(isbn) || this.#libros.existeLibroPorIsbn(isbn)) {
            isbn = this.#lector.leerEnteroHasta("Código ISBN:");
            if (this.#libros.existeLibroPorIsbn(isbn)) console.log("ISBN ya registrado");
        }

        while (!Util.validarTitulo(titulo)) titulo = this.#lector.leerCadenaHasta("Título:");
        while (!Util.validarGenero(genero, Libro.GENEROS_LITERARIOS)) genero = this.#lector.leerCadenaHasta("Categoría:");
        while (!Util.validarReal(precio)) precio = this.#lector.leerRealHasta("Precio:");

        const numAutores = this.#lector.leerEnteroHasta("¿Número de autores?");
        
        for (let i = 0; i < numAutores; i++) {
            let nombre = null, autor;
            while (!Util.validarNombrePersona(nombre)) {
                nombre = this.#lector.leerCadenaHasta(`Autor ${i + 1}:`);
            }
            
            if (!this.#autores.existeAutorPorNombre(nombre)) {
                if (confirm(`${nombre} no registrado. ¿Agregar?`)) {
                    autor = this.registrarNuevoAutor(nombre);
                }
            } else {
                autor = this.#autores.buscarAutoresPorNombre(nombre)[0];
            }
            if (autor) autores.push(autor);
        }

        return { isbn, titulo, genero, precio, autores };
    }

    registrarNuevoAutor(nombre) {
        const autor = new Autor(nombre);
        this.#autores.insertarAutores([autor]);
        return autor;
    }

    agregarOEditarLibro() {
        const datos = this.solicitarInformacionLibro();
        const tipo = this.#lector.leerEnteroEntreHasta("Tipo: 1=Digital, 2=Físico", 1, 2);
        let libro;

        if (tipo === 1) {
            let tamano, formato;
            while (!Util.validarTamanoArchivo(tamano)) tamano = this.#lector.leerReal("Tamaño (MiB):");
            while (!Util.validarFormato(formato, Ebook.FORMATOS)) formato = this.#lector.leerCadenaHasta("Formato:").toLowerCase();
            libro = new Ebook(datos.isbn, datos.titulo, datos.autores, datos.genero, datos.precio, tamano, formato);
        } else {
            let peso, dimensiones, stock;
            while (!Util.validarPeso(peso)) peso = this.#lector.leerReal("Peso (g):");
            while (!Util.validarDimensiones(dimensiones)) dimensiones = this.#lector.leerCadenaHasta("Dimensiones:", 5, /^\d+x\d+x\d+$/);
            while (!Util.validarStock(stock)) stock = this.#lector.leerEnteroHasta("Stock:");
            libro = new LibroPapel(datos.isbn, datos.titulo, datos.autores, datos.genero, datos.precio, peso, dimensiones, stock);
        }

        if (libro) {
            this.#libros.insertarLibros([libro]);
            datos.autores.forEach(a => a.insertarLibro(libro));
            alert("Libro registrado");
        }
        return libro;
    }

    crearMultiplesLibros() {
        do { this.agregarOEditarLibro(); } while (confirm("¿Otro libro?"));
    }

    registrarVariosAutores() {
        do { this.registrarNuevoAutor(this.#lector.leerCadenaHasta("Autor:")); } while (confirm("¿Otro autor?"));
    }

    solicitarDatosCliente() {
        let dni, nombre, direccion;

        while (!Util.validarDni(dni) || this.#clientes.existeClientePorDNI(dni)) {
            dni = this.#lector.leerCadenaHasta("DNI:", 9, /^[0-9]{8}[A-Z]$/i);
            if (this.#clientes.existeClientePorDNI(dni)) console.log("DNI existente");
        }

        while (!Util.validarNombrePersona(nombre)) nombre = this.#lector.leerCadenaHasta("Nombre:");
        while (!Util.validarDireccion(direccion)) direccion = this.#lector.leerCadenaHasta("Dirección:");

        return new Cliente(dni, nombre, direccion);
    }

    crearVariosClientes() {
        while (confirm("¿Registrar cliente?")) {
            this.#clientes.insertarClientes([this.solicitarDatosCliente()]);
        }
    }

    visualizarCatalogo(extra = null) {
        if (extra) console.log("Info:", extra);
        console.log(this.#libros.obtenerCadenaLibrosMenu());
    }

    localizarLibroPorIsbn(isbn) {
        return this.#libros.buscarLibroPorIsbn(isbn);
    }

    localizarLibrosPorAutor(nombre) {
        const libros = [];
        this.#autores.buscarAutoresPorNombre(nombre).forEach(autor => {
            autor.libros.forEach(libro => {
                if (!libros.includes(libro)) libros.push(libro);
            });
        });
        return libros;
    }

    localizarLibrosPorCategoria(genero) {
        return this.#libros.buscarLibroPorGenero(genero);
    }

    localizarLibrosPorTitulo(titulo) {
        return this.#libros.buscarLibroPorTitulo(titulo);
    }

    modificarInventario() {
        const isbn = this.#lector.leerEnteroHasta("ISBN:");
        
        if (this.#libros.existeLibroPorIsbn(isbn)) {
            const libro = this.#libros.buscarLibroPorIsbn(isbn);
            if (libro instanceof LibroPapel) {
                const cantidad = this.#lector.leerRealHasta(`Stock para ${libro.titulo}:`);
                libro.ampliarStock(cantidad);
                alert(`Stock: ${libro.stock}`);
            } else {
                alert("No maneja stock");
            }
        } else {
            alert("Libro no encontrado");
        }
    }

    visualizarAlertasStock() {
        let mensaje = "=== ALERTAS ===\n\n", hayAlertas = false;
        this.#libros.libros.forEach(libro => {
            if (libro instanceof LibroPapel && libro.stock < LibroPapel.STOCK_MINIMO) {
                mensaje += ` ${libro.titulo}: ${libro.stock}\n`;
                hayAlertas = true;
            }
        });
        alert(hayAlertas ? mensaje : "✓ Stock óptimo");
    }

    consultarPedidosCliente() {
        const cliente = this.#clientes.buscarClientePorDNI(this.#lector.leerCadenaHasta("DNI:", 9));
        cliente ? console.log(cliente.mostrarDatosCliente()) : alert("No encontrado");
    }

    bajaCliente() {
        let dni;
        while (!Util.validarDni(dni)) dni = this.#lector.leerCadenaHasta("DNI:", 9, /^[0-9]{8}[A-Z]$/i);
        alert(this.#clientes.borrarClientePorDNI(dni) ? "Eliminado" : "Error");
    }

    generarNuevoPedido() {
        alert("En desarrollo");
    }

    buscarPedido() {
        const pedido = this.#pedidos.buscarPedidoPorId(this.#lector.leerEnteroHasta("ID:"));
        pedido ? console.log(pedido.mostrarDatosPedido()) : alert("No encontrado");
    }

    panelEstadisticas() {
        alert("En desarrollo");
    }

    altaCliente() {
        const dni = this.#lector.leerCadenaHasta("DNI:", 9);
        if (this.#clientes.existeClientePorDNI(dni)) {
            alert("Ya registrado");
            return;
        }
        const cliente = new Cliente(dni, this.#lector.leerCadenaHasta("Nombre:"), this.#lector.leerCadenaHasta("Dirección:"));
        this.#clientes.insertarClientes([cliente]);
        alert("Registrado");
    }

    verificarClienteExiste(dni) { return this.#clientes.existeClientePorDNI(dni); }
    verificarLibroExiste(isbn) { return this.#libros.existeLibroPorIsbn(isbn); }

    registrarEbook(isbn, titulo, autores, genero, precio, tamano, formato) {
        if (!this.verificarLibroExiste(isbn)) {
            const ebook = new Ebook(isbn, titulo, autores, genero, precio, tamano, formato);
            this.#libros.insertarLibros([ebook]);
            autores.forEach(a => a.insertarLibro(ebook));
        }
    }

    registrarLibroFisico(isbn, titulo, autores, genero, precio, peso, dimensiones, stock) {
        if (!this.verificarLibroExiste(isbn)) {
            const libro = new LibroPapel(isbn, titulo, autores, genero, precio, peso, dimensiones, stock);
            this.#libros.insertarLibros([libro]);
            autores.forEach(a => a.insertarLibro(libro));
        }
    }

    // Métodos para crear entidades - AGREGADOS PARA EJERCICIO 3
    crearAutor(nombre) {
        const autor = new Autor(nombre);
        this.#autores.insertarAutores([autor]);
        return autor;
    }

    crearCliente(dni, nombre, direccion) {
        const cliente = new Cliente(dni, nombre, direccion);
        this.#clientes.insertarClientes([cliente]);
        return cliente;
    }

    crearLibroPapel(isbn, titulo, autores, genero, precio, peso, dimensiones, stock) {
        const libro = new LibroPapel(isbn, titulo, autores, genero, precio, peso, dimensiones, stock);
        this.#libros.insertarLibros([libro]);
        autores.forEach(a => a.insertarLibro(libro));
        return libro;
    }

    crearEbook(isbn, titulo, autores, genero, precio, tamano, formato) {
        const ebook = new Ebook(isbn, titulo, autores, genero, precio, tamano, formato);
        this.#libros.insertarLibros([ebook]);
        autores.forEach(a => a.insertarLibro(ebook));
        return ebook;
    }

    crearTipoEnvio(nombre, precio, dias, importeMinimo = 0) {
        const tipo = new TipoEnvio(nombre, dias, precio, importeMinimo);
        this.#tiposEnvios.insertarTipos([tipo]);
        return tipo;
    }
}