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
        let nombre = prompt("Nombre de la categoria a crear:");
        
        if (!nombre || nombre.trim() === "") {
            alert("El nombre no puede estar vacío.");
            continuar = prompt("¿Desea intentar de nuevo? (s/n):") || "n";
            continue;
        }
        
        categorias.push([nombre.trim(), []]);
        console.log("Categoría '" + nombre.trim() + "' creada correctamente.");
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
                    console.log("Tarea '" + categoria[1][num][0] + "' completada");
                } else {
                    console.log("La tarea '" + categoria[1][num][0] + "' ya estaba completada");
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
        console.log("MENÚ 1");
        console.log("1. Listar categorías");
        console.log("2. Añadir nueva categoría");
        console.log("3. Borrar categoría");
        console.log("4. Salir");
        op = prompt("Opción:");

        switch (op) {
            case "1":
                if (categorias.length === 0) {
                    console.log("(No hay categorías)");
                    prompt("Presione Enter...");
                } else {
                    menuSeleccionarCategoria();
                }
                break;
            case "2":
                crearCategoria();
                break;
            case "3":
                borrarCategoria();
                break;
            case "4":
                console.log("Saliendo...");
                break;
        }
    }
}

function menuSeleccionarCategoria() {
    let op = "";
    while (op !== "0") {
        console.clear();
        console.log("MENÚ 2");
        mostrarCategorias();
        console.log("0. Atrás");
        op = prompt("Seleccione categoría (0=atrás):");

        let num = parseInt(op);
        if (num > 0 && num <= categorias.length) {
            menuTareas(categorias[num - 1]);
        } else if (op !== "0") {
            console.log("Opción no válida");
            prompt("Presione Enter...");
        }
    }
}

function menuTareas(categoria) {
    let op = "";
    while (op !== "0") {
        console.clear();
        console.log("Menú 3. Categoría " + categoria[0]);
        
        if (categoria[1].length === 0) {
            console.log("(No hay tareas)");
        } else {
            for (let i = 0; i < categoria[1].length; i++) {
                let tarea = categoria[1][i];
                console.log((i + 1) + ". " + tarea[0] + " (" + tarea[1] + ")");
            }
        }
        
        let opcionAnadir = categoria[1].length + 1;
        let opcionBorrar = categoria[1].length + 2;
        let opcionAtras = categoria[1].length + 3;
        
        console.log("---");
        console.log(opcionAnadir + ". Añadir nueva tarea");
        console.log(opcionBorrar + ". Borrar tarea");
        console.log(opcionAtras + ". Atrás");
        
        op = prompt("Opción:");
        let numOp = parseInt(op);

        if (numOp === opcionAnadir) {
            let continuar = "s";
            while (continuar.toLowerCase() === "s") {
                crearTarea(categoria);
                continuar = prompt("¿Añadir otra tarea? (s/n):") || "n";
            }
        } else if (numOp === opcionBorrar) {
            borrarTarea(categoria); 
            prompt("Presione Enter...");
        } else if (numOp === opcionAtras) {

            console.log("Volviendo...");
            break;
        } else {
            console.log("Opción no válida. Por favor, use las opciones del menú.");
            prompt("Presione Enter...");
        }
    }
}

if (categorias.length === 0) {
    crearCategoria();
    if (categorias.length === 1) {
        let opcion = prompt("¿Desea añadir tareas en '" + categorias[0][0] + "' ahora? (s/n):");
        if (opcion && opcion.toLowerCase() === "s") {
            let continuar = "s";
            while (continuar.toLowerCase() === "s") {
                crearTarea(categorias[0]);
                continuar = prompt("¿Añadir otra tarea? (s/n):") || "n";
            }
        }
    }
}
menuPrincipal();