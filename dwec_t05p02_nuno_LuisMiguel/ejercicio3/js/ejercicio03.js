class LeerDatosForm extends LeerDatos {
    constructor(elemento) {
        super();
        this.elemento = elemento;
    }
    leerValor() {
        return this.elemento.value.trim();
    }
}

// Variables globales
const tienda = Tienda.getInstancia("Librería Amigos");
const generos = ["Novela", "Ensayo", "Infantil", "Poesía", "Teatro", "Biografía"];
let clienteActual = null;
let pedidoActual = null;

function cargarDatosPrueba() {
    tienda.crearTipoEnvio("Estándar", 3.99, 5);
    tienda.crearTipoEnvio("Express", 9.99, 2);
    tienda.crearTipoEnvio("Digital", 0, 0);
    
    const autor1 = tienda.crearAutor("Gabriel García Márquez");
    const autor2 = tienda.crearAutor("Isabel Allende");
    const autor3 = tienda.crearAutor("J.K. Rowling");
    const autor4 = tienda.crearAutor("George Orwell");
    const autor5 = tienda.crearAutor("Jane Austen");
    
    tienda.crearLibroPapel(9788497592, "Cien años de soledad", [autor1], "Novela", 19.95, 450, "20x13x3", 15);
    tienda.crearLibroPapel(9788497598, "La casa de los espíritus", [autor2], "Novela", 18.50, 420, "19x12x3", 8);
    tienda.crearLibroPapel(9788478888, "Harry Potter", [autor3], "Infantil", 16.95, 380, "21x14x2", 20);
    tienda.crearEbook(9788499890, "1984", [autor4], "Ensayo", 9.99, 2.5, "EPUB");
    tienda.crearEbook(9788420412, "Orgullo y prejuicio", [autor5], "Novela", 7.99, 1.8, "PDF");
    
    tienda.crearCliente("12345678Z", "Juan Perez", "Calle Mayor 1");
    tienda.crearCliente("87654321X", "Maria Lopez", "Avenida Libertad 2");
    
    // Pedido de ejemplo para Juan Perez
    const juan = tienda.clientes.buscarClientePorDNI("12345678Z");
    const libro1 = tienda.libros.buscarLibroPorIsbn(9788497592);
    const libro2 = tienda.libros.buscarLibroPorIsbn(9788497598);
    const envioEstandar = tienda.tiposEnvios.tiposEnvios.find(te => te.nombre === "Estándar");
    
    if (juan && libro1 && libro2 && envioEstandar) {
        const pedidoEjemplo = new Pedido(juan);
        pedidoEjemplo.insertarLibro(libro1, 2);
        pedidoEjemplo.insertarLibro(libro2, 1);
        pedidoEjemplo.establecerTipoEnvio(envioEstandar);
        pedidoEjemplo.calcularTotal();
        juan.insertarPedido(pedidoEjemplo);
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosPrueba();
    const ruta = location.pathname;
    if (ruta.includes("index")) inicializarCatalogo();
    else if (ruta.includes("clientes")) inicializarClientes();
    else if (ruta.includes("libros")) inicializarLibros();
    else if (ruta.includes("pedidos")) inicializarPedidos();
});

// PÁGINA 1: CATÁLOGO
function inicializarCatalogo() {
    cargarCatalogo();
    const btn = document.getElementById("btnBuscar");
    const input = document.getElementById("inputBuscar");
    const buscar = () => cargarCatalogo(input.value.toLowerCase());
    if (btn) btn.addEventListener("click", buscar);
    if (input) input.addEventListener("keypress", (e) => { if (e.key === "Enter") buscar(); });
}

function cargarCatalogo(filtro = "") {
    const tbody = document.getElementById("tablaLibros");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    let libros = tienda.libros.libros;
    
    if (filtro) {
        libros = libros.filter(l => 
            l.titulo.toLowerCase().includes(filtro) || 
            l.genero.toLowerCase().includes(filtro) || 
            l.autor.some(a => a.nombreCompleto.toLowerCase().includes(filtro))
        );
    }
    
    libros.sort((a, b) => a.titulo.localeCompare(b.titulo)).forEach(libro => {
        const tr = document.createElement("tr");
        ["isbn", "titulo"].forEach(prop => {
            const td = document.createElement("td");
            td.textContent = libro[prop];
            tr.appendChild(td);
        });
        
        const tdAutores = document.createElement("td");
        tdAutores.textContent = libro.autor.map(a => a.nombreCompleto).join(", ");
        tr.appendChild(tdAutores);
        
        ["genero"].forEach(prop => {
            const td = document.createElement("td");
            td.textContent = libro[prop];
            tr.appendChild(td);
        });
        
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = libro.precio.toFixed(2) + " €";
        tr.appendChild(tdPrecio);
        
        const tdTipo = document.createElement("td");
        tdTipo.textContent = libro instanceof Ebook ? "Ebook" : "Papel";
        tr.appendChild(tdTipo);
        
        const tdStock = document.createElement("td");
        tdStock.textContent = libro instanceof LibroPapel ? libro.stock : "Digital";
        tr.appendChild(tdStock);
        
        const tdBtn = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-info";
        btn.textContent = "Ver";
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#modalLibro");
        btn.onclick = () => mostrarModal(libro);
        tdBtn.appendChild(btn);
        tr.appendChild(tdBtn);
        
        tbody.appendChild(tr);
    });
    
    const msg = document.getElementById("mensajeSinResultados");
    if (msg) msg.classList.toggle("d-none", libros.length > 0);
}

function mostrarModal(libro) {
    document.getElementById("modalTitulo").textContent = libro.titulo;
    document.getElementById("modalISBN").textContent = libro.isbn;
    document.getElementById("modalAutores").textContent = libro.autor.map(a => a.nombreCompleto).join(", ");
    document.getElementById("modalGenero").textContent = libro.genero;
    document.getElementById("modalPrecio").textContent = libro.precio.toFixed(2) + " €";
    document.getElementById("modalTipo").textContent = libro instanceof Ebook ? "Ebook" : "Papel";
    document.getElementById("modalStock").textContent = libro instanceof LibroPapel ? libro.stock : "Disponible";
}

// PÁGINA 2: CLIENTES
function inicializarClientes() {
    cargarClientes();
    
    const form = document.getElementById("formCliente");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const dni = document.getElementById("dni").value.trim();
            const nombre = document.getElementById("nombre").value.trim();
            const direccion = document.getElementById("direccion").value.trim();
            
            if (!Util.validarDni(dni)) {
                document.getElementById("dni").setCustomValidity("DNI inválido");
                form.classList.add("was-validated");
                return;
            }
            if (tienda.verificarClienteExiste(dni)) {
                document.getElementById("dni").setCustomValidity("DNI ya existe");
                form.classList.add("was-validated");
                return;
            }
            document.getElementById("dni").setCustomValidity("");
            
            tienda.crearCliente(dni, nombre, direccion);
            cargarClientes();
            form.reset();
            form.classList.remove("was-validated");
        });
    }
    
    const btnSubir = document.getElementById("btnSubir");
    if (btnSubir) btnSubir.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function cargarClientes() {
    const tbody = document.getElementById("tablaClientes");
    if (!tbody) return;
    
    tbody.innerHTML = tienda.clientes.clientes.slice().reverse().map(c => `
        <tr>
            <td>${c.dni}</td>
            <td>${c.nombreCompleto}</td>
            <td>${c.direccion}</td>
            <td><button class="btn btn-sm btn-secondary" onclick="mostrarPedidos('${c.dni}')">Ver pedidos (${c.listaPedidos.length})</button></td>
        </tr>
    `).join("");
}

function mostrarPedidos(dni) {
    const cliente = tienda.clientes.buscarClientePorDNI(dni);
    const panel = document.getElementById("panelPedidos");
    const lista = document.getElementById("listaPedidos");
    if (!cliente || !panel || !lista) return;
    
    if (cliente.listaPedidos.length === 0) {
        lista.innerHTML = `<div class="col-12"><p class="alert alert-info">Sin pedidos</p></div>`;
    } else {
        lista.innerHTML = cliente.listaPedidos.map(pedido => {
            let librosHTML = '<li>No hay libros</li>';
            
            try {
                if (pedido.librosPedido && pedido.librosPedido.size > 0) {
                    librosHTML = Array.from(pedido.librosPedido.entries())
                        .map(([libro, unidades]) => `<li>${libro.titulo} (${unidades})</li>`)
                        .join("");
                }
            } catch (e) {
                console.error("Error al procesar libros:", e);
            }
            
            const fechaTexto = pedido.fecha ? pedido.fecha.toLocaleDateString() : 'Sin fecha';
            const totalTexto = pedido.precioTotalConEnvioConIVA || '0.00';
            
            return `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Pedido #${pedido.id || 'N/A'}</h5>
                        <small>${fechaTexto}</small>
                        <ul>${librosHTML}</ul>
                        <p><strong>Total:</strong> ${totalTexto} €</p>
                    </div>
                </div>
            </div>`;
        }).join("");
    }
    
    panel.classList.remove("d-none");
}

// PÁGINA 3: LIBROS
function inicializarLibros() {
    const selectGenero = document.getElementById("genero");
    if (selectGenero) generos.forEach(g => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = g;
        selectGenero.appendChild(opt);
    });
    
    const selectAutores = document.getElementById("autoresExistentes");
    if (selectAutores) {
        tienda.autores.autores.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto)).forEach(autor => {
            const opt = document.createElement("option");
            opt.value = opt.textContent = autor.nombreCompleto;
            selectAutores.appendChild(opt);
        });
    }
    
    const tipoFisico = document.getElementById("tipoFisico");
    const tipoEbook = document.getElementById("tipoEbook");
    if (tipoFisico) tipoFisico.addEventListener("change", cambiarTipoLibro);
    if (tipoEbook) tipoEbook.addEventListener("change", cambiarTipoLibro);
    
    const form = document.getElementById("formLibro");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validarLibro()) {
                crearLibro();
                form.reset();
                document.getElementById("camposFisico").style.display = "none";
                document.getElementById("camposEbook").style.display = "none";
                form.classList.remove("was-validated");
            } else {
                form.classList.add("was-validated");
            }
        });
    }
}

function cambiarTipoLibro() {
    const esFisico = document.getElementById("tipoFisico")?.checked;
    document.getElementById("camposFisico").style.display = esFisico ? "block" : "none";
    document.getElementById("camposEbook").style.display = esFisico ? "none" : "block";
}

function validarLibro() {
    const isbn = document.getElementById("isbn").value.trim();
    const genero = document.getElementById("genero").value;
    const nuevoAutor = document.getElementById("nuevoAutor").value.trim();
    const autoresSeleccionados = document.getElementById("autoresExistentes").selectedOptions;
    
    if (tienda.verificarLibroExiste(isbn)) { alert("ISBN ya existe"); return false; }
    if (!generos.includes(genero)) { alert("Género no válido"); return false; }
    if (nuevoAutor && tienda.autores.existeAutorPorNombre(nuevoAutor)) { alert("El autor ya existe"); return false; }
    if (!nuevoAutor && autoresSeleccionados.length === 0) { alert("Selecciona al menos un autor"); return false; }
    
    return true;
}

function crearLibro() {
    const isbn = document.getElementById("isbn").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const nuevoAutor = document.getElementById("nuevoAutor").value.trim();
    
    let autores = [];
    if (nuevoAutor) {
        const autor = tienda.crearAutor(nuevoAutor);
        autores = [autor];
        const opt = document.createElement("option");
        opt.value = opt.textContent = nuevoAutor;
        document.getElementById("autoresExistentes").appendChild(opt);
    } else {
        autores = Array.from(document.getElementById("autoresExistentes").selectedOptions)
            .map(opt => tienda.autores.buscarAutoresPorNombre(opt.value)[0])
            .filter(a => a);
    }
    
    let libro;
    if (document.getElementById("tipoFisico").checked) {
        const peso = parseFloat(document.getElementById("peso").value);
        const dimensiones = document.getElementById("dimensiones").value.trim();
        const stock = parseInt(document.getElementById("stock").value);
        libro = tienda.crearLibroPapel(isbn, titulo, autores, genero, precio, peso, dimensiones, stock);
    } else {
        const tamano = parseFloat(document.getElementById("tamano").value);
        const formato = document.getElementById("formato").value.toUpperCase();
        libro = tienda.crearEbook(isbn, titulo, autores, genero, precio, tamano, formato);
    }
    mostrarLibroCreado(libro);
}

function mostrarLibroCreado(libro) {
    const panel = document.getElementById("panelLibroCreado");
    if (!panel) return;
    
    panel.innerHTML = "";
    const div = document.createElement("div");
    div.className = "alert alert-success";
    
    const h5 = document.createElement("h5");
    h5.textContent = "Libro creado: " + libro.titulo;
    div.appendChild(h5);
    
    const ul = document.createElement("ul");
    [
        `ISBN: ${libro.isbn}`,
        `Autores: ${libro.autor.map(a => a.nombreCompleto).join(", ")}`,
        `Género: ${libro.genero}`,
        `Precio: ${libro.precio.toFixed(2)} €`,
        `Tipo: ${libro instanceof Ebook ? "Ebook" : "Papel"}`,
        libro instanceof LibroPapel ? `Stock: ${libro.stock}` : `Formato: ${libro.formato}`
    ].forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
    });
    
    div.appendChild(ul);
    panel.appendChild(div);
}

// PÁGINA 4: PEDIDOS
function inicializarPedidos() {
    const btnBuscar = document.getElementById("btnBuscarCliente");
    const btnDeseleccionar = document.getElementById("btnDeseleccionar");
    const btnAgregarLibro = document.getElementById("btnAnadirLibro");
    const btnAnadirEnvio = document.getElementById("btnAnadirEnvio");
    const btnPagar = document.getElementById("btnPagar");
    const btnCancelar = document.getElementById("btnCancelar");
    
    if (btnBuscar) btnBuscar.addEventListener("click", buscarCliente);
    if (btnDeseleccionar) btnDeseleccionar.addEventListener("click", deseleccionarCliente);
    if (btnAgregarLibro) btnAgregarLibro.addEventListener("click", agregarLibro);
    if (btnAnadirEnvio) btnAnadirEnvio.addEventListener("click", seleccionarEnvio);
    if (btnPagar) btnPagar.addEventListener("click", finalizarPedido);
    if (btnCancelar) btnCancelar.addEventListener("click", cancelarPedido);
    
    cargarTiposEnvio();
}

function buscarCliente() {
    const dni = document.getElementById("dniCliente").value.trim();
    if (!Util.validarDni(dni)) { alert("DNI inválido"); return; }
    
    const cliente = tienda.clientes.buscarClientePorDNI(dni);
    if (!cliente) { alert("Cliente no encontrado"); return; }
    
    clienteActual = cliente;
    pedidoActual = new Pedido(cliente);
    
    document.getElementById("clienteDni").textContent = cliente.dni;
    document.getElementById("clienteNombre").textContent = cliente.nombreCompleto;
    document.getElementById("clienteDireccion").textContent = cliente.direccion;
    document.getElementById("clienteSeleccionado").style.display = "block";
    
    const btnBuscar = document.getElementById("btnBuscarCliente");
    const btnDesel = document.getElementById("btnDeseleccionar");
    const btnCancel = document.getElementById("btnCancelar");
    const btnLibros = document.getElementById("btnAcordeonLibros");
    const btnEnvio = document.getElementById("btnAcordeonEnvio");
    
    if (btnBuscar) btnBuscar.disabled = true;
    if (btnDesel) btnDesel.disabled = false;
    if (btnCancel) btnCancel.disabled = false;
    if (btnLibros) btnLibros.disabled = false;
    if (btnEnvio) btnEnvio.disabled = false;
}

function deseleccionarCliente() {
    clienteActual = null;
    pedidoActual = null;
    
    const clienteSel = document.getElementById("clienteSeleccionado");
    const dniCliente = document.getElementById("dniCliente");
    const listaLibros = document.getElementById("listaLibrosPedido");
    const detalles = document.getElementById("detallesPedido");
    const envioSel = document.getElementById("envioSeleccionado");
    const tablaLibros = document.getElementById("tablaLibrosPedido");
    const isbnInput = document.getElementById("isbnLibro");
    const unidadesInput = document.getElementById("unidades");
    
    if (clienteSel) clienteSel.style.display = "none";
    if (dniCliente) dniCliente.value = "";
    if (listaLibros) listaLibros.innerHTML = "";
    if (detalles) detalles.innerHTML = "";
    if (envioSel) envioSel.innerHTML = "";
    if (tablaLibros) tablaLibros.querySelector("tbody").innerHTML = "";
    if (isbnInput) isbnInput.value = "";
    if (unidadesInput) unidadesInput.value = "1";
    
    // Cerrar acordeones
    const acordeonLibros = document.getElementById("collapseLibros");
    const acordeonEnvio = document.getElementById("collapseEnvio");
    if (acordeonLibros) acordeonLibros.classList.remove("show");
    if (acordeonEnvio) acordeonEnvio.classList.remove("show");
    
    const btnBuscar = document.getElementById("btnBuscarCliente");
    const btnDesel = document.getElementById("btnDeseleccionar");
    const btnLibros = document.getElementById("btnAcordeonLibros");
    const btnEnvio = document.getElementById("btnAcordeonEnvio");
    const btnCancel = document.getElementById("btnCancelar");
    const btnPagar = document.getElementById("btnPagar");
    
    if (btnBuscar) btnBuscar.disabled = false;
    if (btnDesel) btnDesel.disabled = true;
    if (btnLibros) btnLibros.disabled = true;
    if (btnEnvio) btnEnvio.disabled = true;
    if (btnCancel) btnCancel.disabled = true;
    if (btnPagar) btnPagar.disabled = true;
}

function agregarLibro() {
    const isbn = document.getElementById("isbnLibro").value.trim();
    const cantidad = parseInt(document.getElementById("unidades").value) || 1;
    
    if (!Util.validarEntero(isbn)) {
        alert("ISBN inválido");
        return;
    }
    
    const libro = tienda.libros.buscarLibroPorIsbn(isbn);
    
    if (!libro) {
        alert("Libro no encontrado");
        return;
    }
    
    if (libro instanceof LibroPapel && cantidad > libro.stock) {
        alert(`Stock insuficiente (disponible: ${libro.stock})`);
        return;
    }
    
    pedidoActual.insertarLibro(libro, cantidad);
    mostrarLineaCompra();
    actualizarResumen();
    
    const btnEnvio = document.getElementById("btnAcordeonEnvio");
    const btnCancel = document.getElementById("btnCancelar");
    if (btnEnvio) btnEnvio.disabled = false;
    if (btnCancel) btnCancel.disabled = false;
    
    document.getElementById("isbnLibro").value = "";
    document.getElementById("unidades").value = "1";
}

function mostrarLineaCompra() {
    const tbody = document.getElementById("tablaLineaCompra");
    if (!tbody) return;
    
    if (pedidoActual.librosPedido.size === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay libros añadidos</td></tr>';
        return;
    }
    
    tbody.innerHTML = "";
    pedidoActual.librosPedido.forEach((unidades, libro) => {
        const subtotal = libro.precio * unidades;
        tbody.innerHTML += `
            <tr>
                <td>${libro.isbn}</td>
                <td>${libro.titulo}</td>
                <td>${libro.precio.toFixed(2)} €</td>
                <td>${unidades}</td>
                <td>${subtotal.toFixed(2)} €</td>
                <td><button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.isbn})">✕</button></td>
            </tr>
        `;
    });
    
    // Si solo hay ebooks, aplica envío digital
    const soloEbooks = pedidoActual.hayEbooks() && !pedidoActual.hayLibrosFisicos();
    if (soloEbooks && !pedidoActual.tipoEnvioPedido) {
        const envioDigital = tienda.tiposEnvios.buscarTiposPorNombre("Digital");
        if (envioDigital) {
            pedidoActual.establecerTipoEnvio(envioDigital);
            document.getElementById("textoEnvio").textContent = `${envioDigital.nombre} - ${envioDigital.precio.toFixed(2)} €`;
            document.getElementById("envioSeleccionado").style.display = "block";
            document.getElementById("btnPagar").disabled = false;
            
            const select = document.getElementById("tipoEnvio");
            if (select) select.value = "Digital";
        }
    }
}

function eliminarLibro(isbn) {
    const libro = tienda.libros.buscarLibroPorIsbn(isbn);
    if (libro && pedidoActual) {
        pedidoActual.eliminarLibro(libro);
        mostrarLineaCompra();
        actualizarResumen();
    }
}

function seleccionarEnvio() {
    const tipoNombre = document.getElementById("tipoEnvio").value;
    if (!tipoNombre) {
        alert("Selecciona un tipo de envío");
        return;
    }
    
    const tipoEnvio = tienda.tiposEnvios.buscarTiposPorNombre(tipoNombre);
    if (!tipoEnvio) {
        alert("Tipo de envío no encontrado");
        return;
    }
    
    // Validar compatibilidad del envío
    const soloEbooks = pedidoActual.hayEbooks() && !pedidoActual.hayLibrosFisicos();
    const hayFisicos = pedidoActual.hayLibrosFisicos();
    
    if (soloEbooks && tipoEnvio.precio > 0) {
        alert("Para ebooks solo se permite envío digital (sin coste)");
        return;
    }
    
    if (hayFisicos && tipoEnvio.precio === 0) {
        alert("Para libros físicos se requiere un tipo de envío con coste");
        return;
    }
    
    const resultado = pedidoActual.establecerTipoEnvio(tipoEnvio);
    if (!resultado) {
        alert("No se pudo aplicar este tipo de envío");
        return;
    }
    
    document.getElementById("textoEnvio").textContent = `${tipoEnvio.nombre} - ${tipoEnvio.precio.toFixed(2)} €`;
    document.getElementById("envioSeleccionado").style.display = "block";
    document.getElementById("btnPagar").disabled = false;
    actualizarResumen();
}

function cargarTiposEnvio() {
    const select = document.getElementById("tipoEnvio");
    if (!select || select.options.length > 1) return;
    
    tienda.tiposEnvios.tiposEnvios.forEach(tipo => {
        const opt = document.createElement("option");
        opt.value = tipo.nombre;
        opt.textContent = `${tipo.nombre} (${tipo.precio.toFixed(2)} €)`;
        select.appendChild(opt);
    });
}

function actualizarResumen() {
    if (!pedidoActual || pedidoActual.librosPedido.size === 0) {
        document.getElementById("resumenCompleto").style.display = "none";
        document.getElementById("resumenVacio").style.display = "block";
        return;
    }
    pedidoActual.calcularTotal();
    
    document.getElementById("resumenCliente").textContent = clienteActual.nombreCompleto;
    document.getElementById("resumenLibros").textContent = pedidoActual.librosPedido.size;
    document.getElementById("resumenSubtotal").textContent = pedidoActual.precioTotalSinEnvio.toFixed(2);
    
    if (pedidoActual.tipoEnvioPedido) {
        document.getElementById("resumenEnvio").textContent = pedidoActual.tipoEnvioPedido.nombre;
        document.getElementById("resumenPrecioEnvio").textContent = pedidoActual.tipoEnvioPedido.precio.toFixed(2);
    } else {
        document.getElementById("resumenEnvio").textContent = "No seleccionado";
        document.getElementById("resumenPrecioEnvio").textContent = "0.00";
    }
    
    document.getElementById("resumenTotal").textContent = pedidoActual.precioTotalConEnvioConIVA;
    document.getElementById("resumenCompleto").style.display = "block";
    document.getElementById("resumenVacio").style.display = "none";
}

function finalizarPedido() {
    if (!pedidoActual || pedidoActual.librosPedido.size === 0) {
        alert("Pedido incompleto");
        return;
    }
    
    clienteActual.insertarPedido([pedidoActual]);
    document.getElementById("btnPagar").disabled = true;
    alert(`Pedido realizado: ${pedidoActual.precioTotalConEnvioConIVA} €`);
}

function cancelarPedido() {
    if (confirm("¿Cancelar pedido?")) deseleccionarCliente();
}

window.mostrarPedidos = mostrarPedidos;
window.deseleccionarCliente = deseleccionarCliente;
window.eliminarLibro = eliminarLibro;