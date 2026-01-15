console.log("T04p02 - Ejercicio 01");
//cliente producto busqueda en clientes y producto, gestionar avisos, gestionar unidades,
// validaciones patrones, mapa como se busca y tal... 
// la clase util utilizamos la que nos de el profesor, 

document.addEventListener("DOMContentLoaded", () => {
    const botonInicio = document.getElementById("btnInicio");

    botonInicio.addEventListener("click", main);

    function main() {
        try {
            const miTienda = Tienda.getInstancia();
            miTienda.iniciar();
        } catch (error) {
            console.log("Se ha producido el siguiente error: " + error)
        }
    }
})