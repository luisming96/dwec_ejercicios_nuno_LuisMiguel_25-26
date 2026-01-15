let todosLosPersonajes = [];
const API_URL = "https://hp-api.onrender.com/api/characters";
document.addEventListener("DOMContentLoaded", function() {
    cargarBienvenida();
    document.getElementById("btnBuscar").addEventListener("click", buscarPersonajes);
    document.getElementById("inputBuscar").addEventListener("input", buscarPersonajes);
});

async function cargarBienvenida() {
    const loader = document.getElementById("loader");
    const tarjetas = document.getElementById("tarjetas");
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const personajes = await response.json();
        todosLosPersonajes = personajes;

        setTimeout(function() {
            const seleccionados = obtenerOchoPersonajes(personajes);
            mostrarTarjetas(seleccionados);
            loader.classList.add("oculto");
            tarjetas.classList.add("mostrar-flex");
        }, 1500);

    } catch (error) {
        loader.innerHTML = `
            <div class="alert alert-danger">
                <strong>Error al cargar personajes:</strong> ${error.message}
            </div>
        `;
        console.error("Error:", error);
    }
}

function obtenerOchoPersonajes(personajes) {
    const casas = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    const seleccionados = [];
    
    for (let i = 0; i < casas.length; i++) {
        let contador = 0;
        
        for (let j = 0; j < personajes.length && contador < 2; j++) {
            if (personajes[j].house === casas[i] && personajes[j].image) {
                seleccionados.push(personajes[j]);
                contador++;
            }
        }
    }
    return seleccionados;
}

function mostrarTarjetas(personajes) {
    const contenedor = document.getElementById("tarjetas");
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
                            <strong>Casa:</strong> ${p.house}<br>
                            <strong>Patronus:</strong> ${p.patronus || "Desconocido"}<br>
                            <strong>Especie:</strong> ${p.species}<br>
                            <strong>Año:</strong> ${p.yearOfBirth || "Desconocido"}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

async function buscarPersonajes() {
    const criterio = document.getElementById("inputBuscar").value.trim().toLowerCase();
    const tabla = document.getElementById("tablaResultados");
    
    if (criterio === "") {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Por favor, introduce un criterio de búsqueda
                </td>
            </tr>
        `;
        return;
    }

    try {
        if (todosLosPersonajes.length === 0) {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            todosLosPersonajes = await response.json();
        }

        const resultados = [];
        for (let i = 0; i < todosLosPersonajes.length; i++) {
            if (todosLosPersonajes[i].name.toLowerCase().indexOf(criterio) !== -1) {
                resultados.push(todosLosPersonajes[i]);
            }
        }

        if (resultados.length === 0) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                    No se encontraron resultados para "${criterio}"
                    </td>
                </tr>
            `;
            return;
        }
        mostrarTabla(resultados);

    } catch (error) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    <strong>Error en la búsqueda:</strong> ${error.message}
                </td>
            </tr>
        `;
        console.error("Error:", error);
    }
}

function mostrarTabla(personajes) {
    const tabla = document.getElementById("tablaResultados");
    tabla.innerHTML = "";
    
    for (let i = 0; i < personajes.length; i++) {
        const p = personajes[i];
        const tr = document.createElement("tr");
        const tdImg = document.createElement("td");
        const img = document.createElement("img");
        img.src = p.image || "https://via.placeholder.com/50";
        img.className = "tabla-img";
        img.alt = p.name;
        tdImg.appendChild(img);

        const tdNombre = document.createElement("td");
        tdNombre.textContent = p.name;
        const tdCasa = document.createElement("td");
        tdCasa.textContent = p.house || "Desconocida";
        const tdEspecie = document.createElement("td");
        tdEspecie.textContent = p.species || "Desconocida";
        const tdPatronus = document.createElement("td");
        tdPatronus.textContent = p.patronus || "Desconocido";
        const tdBoton = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-warning";
        btn.textContent = "Marcar favorito";
        
        btn.addEventListener("click", function() {
            alert(`Personaje "${p.name}" marcado como favorito (funcionalidad pendiente)`);
        });
        tdBoton.appendChild(btn);
        tr.appendChild(tdImg);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCasa);
        tr.appendChild(tdEspecie);
        tr.appendChild(tdPatronus);
        tr.appendChild(tdBoton);

        tabla.appendChild(tr);
    }
}