let todosLosPersonajes = [];
const API_URL = "https://hp-api.onrender.com/api/characters";
document.addEventListener("DOMContentLoaded", function () {
    cargarBienvenida();
    comprobarCookies();
    inicializarMapa();
    cargarFavoritos();
    document.getElementById("btnBuscar").addEventListener("click", buscarPersonajes);
    document.getElementById("inputBuscar").addEventListener("input", buscarPersonajes);
    document.getElementById("btnAceptarCookies").addEventListener("click", aceptarCookies);
});

async function cargarBienvenida() {
    const loader = document.getElementById("loader");
    const contenedor = document.getElementById("tarjetas");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error HTTP");
        }
        todosLosPersonajes = await response.json();

        setTimeout(function () {
            const personajes = seleccionarOcho(todosLosPersonajes);
            mostrarTarjetas(personajes, contenedor);
            loader.style.display = "none";
            contenedor.classList.remove("oculto");
        }, 1500);
    } catch (error) {
        console.error(error);
        mostrarError(loader);
    }
}

function seleccionarOcho(personajes) {
    const casas = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    let resultado = [];

    for (let i = 0; i < casas.length; i++) {
        let contador = 0;
        for (let j = 0; j < personajes.length && contador < 2; j++) {
            if (personajes[j].house === casas[i] && personajes[j].image) {
                resultado.push(personajes[j]);
                contador++;
            }
        }
    }
    // Si no llega a 8, añadir mas
    if (resultado.length < 8) {
        for (let i = 0; i < personajes.length && resultado.length < 8; i++) {
            if (personajes[i].image) {
                let existe = false;
                for (let j = 0; j < resultado.length; j++) {
                    if (resultado[j].id === personajes[i].id) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    resultado.push(personajes[i]);
                }
            }
        }
    }
    return resultado;
}

function mostrarTarjetas(personajes, contenedor) {
    contenedor.innerHTML = "";

    for (let i = 0; i < personajes.length; i++) {
        const p = personajes[i];

        contenedor.innerHTML += `
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card h-100">
                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">
                        <strong>Casa:</strong> ${p.house || "Desconocida"}<br>
                        <strong>Patronus:</strong> ${p.patronus || "Desconocido"}<br>
                        <strong>Especie:</strong> ${p.species || "Desconocido"}<br>
                        <strong>Año:</strong> ${p.yearOfBirth || "Desconocido"}
                    </p>
                </div>
            </div>
        </div>
        `;
    }
}

// Seccion buscar
async function buscarPersonajes() {
    const input = document.getElementById("inputBuscar").value.trim().toLowerCase();
    const tabla = document.getElementById("tablaResultados");

    if (!input) {
        mostrarMensaje(tabla, "Introduce un nombre para buscar");
        return;
    }

    try {
        if (todosLosPersonajes.length === 0) {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Error HTTP");
            }
            todosLosPersonajes = await response.json();
        }

        const resultados = [];
        for (let i = 0; i < todosLosPersonajes.length; i++) {
            if (todosLosPersonajes[i].name.toLowerCase().includes(input)) {
                resultados.push(todosLosPersonajes[i]);
            }
        }

        if (resultados.length === 0) {
            mostrarMensaje(tabla, "No se encontraron personajes");
            return;
        }

        tabla.innerHTML = "";
        for (let i = 0; i < resultados.length; i++) {
            const fila = crearFila(resultados[i]);
            tabla.appendChild(fila);
        }
    } catch (error) {
        console.error(error);
        mostrarMensaje(tabla, "Error al buscar", "text-danger");
    }
}

function crearFila(personaje) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><img src="${personaje.image || 'https://via.placeholder.com/50'}" alt="${personaje.name}" class="tabla-img"></td>
        <td>${personaje.name}</td>
        <td>${personaje.house || 'Desconocida'}</td>
        <td>${personaje.species || 'Desconocida'}</td>
        <td>${personaje.patronus || 'Desconocido'}</td>
        <td><button class="btn btn-sm btn-warning">Favorito</button></td>
    `;
    const btn = tr.querySelector("button");
    btn.onclick = function () {
        agregarFavorito(personaje);
    };
    return tr;
}


function comprobarCookies() {
    const aceptadas = sessionStorage.getItem("cookiesAceptadas");
    if (!aceptadas) {
        document.getElementById("avisoCookies").style.display = "block";
    }
}
function aceptarCookies() {
    sessionStorage.setItem("cookiesAceptadas", "true");
    document.getElementById("avisoCookies").style.display = "none";
}


function inicializarMapa() {
    const latitud = 38.773604;
    const longitud = -3.399351;
    
    const mapa = L.map("mapa").setView([latitud, longitud], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);
    
    L.marker([latitud, longitud]).addTo(mapa)
        .bindPopup("IES Gregorio Prieto - Valdepeñas")
        .openPopup();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (posicion) {
                const lat = posicion.coords.latitude;
                const lng = posicion.coords.longitude;
                L.marker([lat, lng]).addTo(mapa).bindPopup("Tu ubicación");
            },
            function () {
                alert("No se pudo obtener tu ubicación");
            }
        );
    }
}

function agregarFavorito(personaje) {
    let favoritos = obtenerFavoritos();

    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === personaje.id) {
            alert("Este personaje ya está en favoritos");
            return;
        }
    }
    const nuevoFavorito = {
        id: personaje.id,
        name: personaje.name,
        house: personaje.house,
        image: personaje.image
    };
    favoritos.push(nuevoFavorito);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    cargarFavoritos();
}

function obtenerFavoritos() {
    const datos = localStorage.getItem("favoritos");
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

function cargarFavoritos() {
    const lista = document.getElementById("listaFavoritos");
    const favoritos = obtenerFavoritos();
    if (favoritos.length === 0) {
        lista.innerHTML = '<p class="text-muted">No tienes favoritos guardados</p>';
        return;
    }
    lista.innerHTML = "";
    for (let i = 0; i < favoritos.length; i++) {
        const fav = favoritos[i];
        
        lista.innerHTML += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <span>${fav.name} (${fav.house || "Desconocida"})</span>
                <button class="btn btn-sm btn-danger" onclick="borrarFavorito('${fav.id}')">Eliminar</button>
            </div>
        `;
    }
}

function borrarFavorito(id) {
    let favoritos = obtenerFavoritos();
    let nuevosFavoritos = [];
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id !== id) {
            nuevosFavoritos.push(favoritos[i]);
        }
    }
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    cargarFavoritos();
}

function mostrarMensaje(tabla, texto, clase) {
    tabla.innerHTML = `
        <tr>
            <td colspan="6" class="text-center ${clase || ''}">${texto}</td>
        </tr>
    `;
}
function mostrarError(elemento) {
    elemento.innerHTML = '<div class="alert alert-danger">Error al cargar los datos</div>';
}