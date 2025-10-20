console.log("T03p03 - Ejercicio 01");
let arrayOriginal = [10, 20, 30, 40, 50];
let ultimaAccion = null;
let elementoBorrado1 = null;
let elementoBorrado2 = null;

function mostrarArray() {
    console.log("Array actual: [" + arrayOriginal.join(", ") + "]");
}

while (arrayOriginal.length > 0) {
    mostrarArray();
    
    let accion = prompt("¿Quieres borrar el primero, el último, ambos, deshacer o ninguno?");
    accion = accion ? accion.toLowerCase().trim() : "ninguno";
    
    if (accion === "ninguno") {
        mostrarArray();
        console.log("Programa terminado por elección del usuario.");
        break;
    }
    
    if (accion === "deshacer") {
        if (ultimaAccion === null) {
            console.log("No hay nada que deshacer.");
        } else {
            if (ultimaAccion === "primero") {
                arrayOriginal.unshift(elementoBorrado1);
            } else if (ultimaAccion === "último") {
                arrayOriginal.push(elementoBorrado1);
            } else if (ultimaAccion === "ambos") {
                arrayOriginal.unshift(elementoBorrado1);
                arrayOriginal.push(elementoBorrado2);
            }
            console.log("Deshacer completado.");
            ultimaAccion = null;
            elementoBorrado1 = null;
            elementoBorrado2 = null;
        }
    } else if (accion === "primero") {
        elementoBorrado1 = arrayOriginal[0];
        ultimaAccion = "primero";
        elementoBorrado2 = null;
        arrayOriginal.shift();
        console.log("Elemento " + elementoBorrado1 + " borrado del principio.");
    } else if (accion === "último") {
        elementoBorrado1 = arrayOriginal[arrayOriginal.length - 1];
        ultimaAccion = "último";
        elementoBorrado2 = null;
        arrayOriginal.pop();
        console.log("Elemento " + elementoBorrado1 + " borrado del final.");
    } else if (accion === "ambos") {
        if (arrayOriginal.length >= 2) {
            elementoBorrado1 = arrayOriginal[0];
            elementoBorrado2 = arrayOriginal[arrayOriginal.length - 1];
            ultimaAccion = "ambos";
            arrayOriginal.shift();
            arrayOriginal.pop();
            console.log("Elementos " + elementoBorrado1 + " (primero) y " + elementoBorrado2 + " (último) borrados.");
        } else {
            console.log("El array tiene menos de 2 elementos. No se pueden borrar 'ambos'.");
        }
    } else {
        console.log("Opción no reconocida. Por favor, introduce una opción válida.");
    }
    
    if (arrayOriginal.length === 0) {
        console.log("No quedan más elementos en el array. Programa terminado.");
        break;
    }
}