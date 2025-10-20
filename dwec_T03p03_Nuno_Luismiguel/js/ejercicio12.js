let categorias = [];
let estados = new Set(["toDo","done"]);

function mostrarCategorias() {
    console.log("CATEGORÍAS");
    for (let i = 0; i < categorias.length; i++) {
        console.log((i + 1) + ". " + categorias[i][0]);
    }
}
function crearCategoria() {
    let continuar = "s";
    while (continuar.toLowerCase() === "s") {
        let nombre = prompt("Nueva categoría:");
        
        if (nombre && nombre.trim() !== "") {
            categorias.push([nombre.trim(), []]);
            console.log("Categoría" + nombre.trim() + "creada correctamente");
        } else {
            console.log("No se creó ninguna categoría (nombre vacío o cancelado).");
        }
        continuar = prompt("¿Desea añadir otra categoría? (s/n):") || "n";
    }
}
function borrarCategoria() {
    mostrarCategorias();
    let num = parseInt(prompt("¿Cuál borrar?"));
    if (num > 0 && num <=categorias.length) {
        let categoria = categorias[num - 1];
        let tareas = categoria[1];
        let tienePendientes = tareas.some(tarea => tarea[1] === "toDo");
        
        if (tienePendientes) {
            console.log("No se puede borrar: tiene tareas pendientes");
        } else if (confirm("¿Borrar categoría?")) {
            categorias.splice(num - 1, 1);
        }
    }
}
function mostrarTareas(categoria) {
    console.log("=== " + categoria[0] + " ===");
    for (let i = 0; i < categoria[1].length; i++) {
        console.log((i + 1) + ". " + categoria[1][i][0] + " (" + categoria[1][i][1] + ")");
    }
}
function crearTarea(categoria) {
    let nombre = prompt("Nombre tarea:");
    if (nombre) {
        categoria[1].push([nombre, "toDo"]);
        console.log("Tarea" + nombre + "creada en la categoría" + categoria[0]);
    }
}
function completarTarea(categoria) {
    let nums = prompt("¿Cuáles completar? (ej: 1,3):");
    if (nums) {
        let lista = nums.split(",");
        for (let i = 0; i < lista.length; i++) {
            let num = parseInt(lista[i]) - 1;
            if (num >= 0 && num < categoria[1].length) {
                if (categoria[1][num][1] === "toDo"){
                    categoria[1][num][1] = "done";
                    console.log("Completada");
                } else {
                    console.log("Ya estaba completada");
                }
            }
        }
    }
}
function borrarTarea(categoria) {
    let num = parseInt(prompt("¿Cuál borrar?"));
    if (num > 0 && num <= categoria[1].length && confirm("¿Borrar?")) {
        categoria[1].splice(num - 1, 1);
        console.log("Borrada");
    }
}
function menuPrincipal() {
    let op = "";

    while (op !== "4") {
        console.clear();
        console.log(" MENÚ PRINCIPAL");
        console.log("Categorías actuales:");
        if (categorias.length === 0) {
            console.log("  (No hay categorías todavía)");
        } else {
            for (let i = 0; i < categorias.length; i++) {
                console.log("  " + (i + 1) + ". " + categorias[i][0] + " (" + categorias[i][1].length + " tareas)");
            }
        }
        console.log("1. Ver/entrar en una categoría");
        console.log("2. Crear nueva categoría");
        console.log("3. Borrar categoría");
        console.log("4. Salir");
        op = prompt("Seleccione una opción:");

        switch (op) {
            case "1":
                if (categorias.length === 0) {
                    console.log("No hay categorías. Cree una primero.");
                } else {
                    mostrarCategorias();
                    let num = parseInt(prompt("¿Qué categoría desea abrir? (0 = atrás)"));
                    if (num > 0 && num <= categorias.length) {
                        menuTareas(categorias[num - 1]);
                    }
                }
                break;
            case "2":
                crearCategoria();
                break;
            case "3":
                borrarCategoria();
                break;
            case "4":
                console.log("Saliendo del programa.");
                break;
            default:
                console.log("Opción no válida. Intente de nuevo.");
        }
    }
}
function menuTareas(categoria) {
    let op = "";

    while (op !== "0") {
        console.clear();
        console.log(" CATEGORÍA: " + categoria[0]);
        if (categoria[1].length === 0) {
            console.log("(No hay tareas todavía)");
        } else {
            for (let i = 0; i < categoria[1].length; i++) {
                console.log((i + 1) + ". " + categoria[1][i][0] + " (" + categoria[1][i][1] + ")");
            }
        }
        console.log("1. Añadir nueva tarea");
        console.log("2. Borrar tarea");
        console.log("3. Marcar tareas como hechas");
        console.log("0. Volver al menú principal");
        op = prompt("Seleccione una opción:");

        switch (op) {
            case "1":
                crearTarea(categoria);
                break;
            case "2":
                borrarTarea(categoria);
                break;
            case "3":
                completarTarea(categoria);
                break;
            case "0":
                console.log("Volviendo al menú principal.");
                break;
            default:
                console.log("Opción no válida. Intente de nuevo.");
        }
    }
}
if (categorias.length === 0) {
    crearCategoria();
    if (categorias.length > 0) {
        let opcion = prompt("¿Qué desea hacer? (1=Crear tarea, 2=Crear nueva categoría, otro=Salir)");
        if (opcion === "1") {
            crearTarea(categorias[0]);
        } else if (opcion === "2") {
            crearCategoria();
        }
    }
}
menuPrincipal();