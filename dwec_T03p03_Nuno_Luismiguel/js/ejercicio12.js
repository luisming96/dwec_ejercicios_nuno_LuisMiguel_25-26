console.log("T03p03 - Ejercicio 12");
let categorias = [];
let estados = new Set(["toDo", "done"]);

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
            console.log("Categoría creada");
        }
        continuar = prompt("¿Añadir otra categoría? (s/n):") || "n";
    }
}

function borrarCategoria() {
    mostrarCategorias();
    let num = parseInt(prompt("¿Cuál borrar?"));
    if (num > 0 && num <= categorias.length) {
        let categoria = categorias[num - 1];
        let tienePendientes = false;
        
        for (let i = 0; i < categoria[1].length; i++) {
            if (categoria[1][i][1] === "toDo") {
                tienePendientes = true;
                break;
            }
        }
        
        if (tienePendientes) {
            console.log("No se puede borrar: tiene tareas pendientes");
        } else if (confirm("¿Borrar categoría?")) {
            categorias.splice(num - 1, 1);
            console.log("Categoría borrada");
        }
    }
}

function crearTarea(categoria) {
    let nombre = prompt("Nombre tarea:");
    if (nombre) {
        categoria[1].push([nombre, "toDo"]);
        console.log("Tarea creada");
    }
}

function completarTarea(categoria) {
    let nums = prompt("¿Cuáles completar? (ej: 1,3):");
    if (nums) {
        let lista = nums.split(",");
        for (let i = 0; i < lista.length; i++) {
            let num = parseInt(lista[i]) - 1;
            if (num >= 0 && num < categoria[1].length) {
                if (categoria[1][num][1] === "toDo") {
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
        console.log("MENÚ PRINCIPAL");
        if (categorias.length === 0) {
            console.log("(No hay categorías)");
        } else {
            for (let i = 0; i < categorias.length; i++) {
                let numTareas = categorias[i][1].length;
                console.log((i + 1) + ". " + categorias[i][0] + " - " + numTareas + " tareas");
            }
        }
        console.log("\n1. Ver/entrar en una categoría");
        console.log("2. Crear nueva categoría");
        console.log("3. Borrar categoría");
        console.log("4. Salir");
        op = prompt("Opción:");

        switch (op) {
            case "1":
                if (categorias.length === 0) {
                    console.log("No hay categorías. Cree una primero.");
                } else {
                    mostrarCategorias();
                    let num = parseInt(prompt("¿Qué categoría abrir? (0=atrás)"));
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
                console.log("Saliendo..");
                break;
        }
    }
}

function menuTareas(categoria) {
    let op = "";
    while (op !== "0") {
        console.clear();
        console.log("CATEGORÍA: " + categoria[0]);
        if (categoria[1].length === 0) {
            console.log("(No hay tareas)");
        } else {
            for (let i = 0; i < categoria[1].length; i++) {
                let tarea = categoria[1][i];
                console.log((i + 1) + ". " + tarea[0] + " - " + tarea[1]);
            }
        }
        console.log("\n1. Añadir nueva tarea");
        console.log("2. Borrar tarea");
        console.log("3. Marcar tareas como hechas");
        console.log("0. Volver");
        op = prompt("Opción:");

        switch (op) {
            case "1":
                let continuar = "s";
                while (continuar.toLowerCase() === "s") {
                    crearTarea(categoria);
                    continuar = prompt("¿Añadir otra tarea? (s/n):") || "n";
                }
                break;
            case "2":
                borrarTarea(categoria);
                break;
            case "3":
                completarTarea(categoria);
                break;
            case "0":
                console.log("Volviendo...");
                break;
        }
    }
}

if (categorias.length === 0) {
    crearCategoria();
    if (categorias.length > 0) {
        let opcion = prompt("¿Qué hacer? (1=Crear tarea, 2=Crear categoría):");
        if (opcion === "1") {
            let continuar = "s";
            while (continuar.toLowerCase() === "s") {
                crearTarea(categorias[0]);
                continuar = prompt("¿Añadir otra tarea? (s/n):") || "n";
            }
        } else if (opcion === "2") {
            crearCategoria();
        }
    }
}
menuPrincipal();