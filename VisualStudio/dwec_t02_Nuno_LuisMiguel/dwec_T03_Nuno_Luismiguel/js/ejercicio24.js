console.log("T03 - Ejercicio 24");
let cadena = prompt("Introduce la cadena de texto grande:");

if (cadena === null) {
    console.log("Búsqueda inicial cancelada.");
} else {
    let continuarBuscando = true;

    do {
        let palabra = prompt("Introduce la palabra que quieres buscar (o pulsa Cancelar para terminar):");

        if (palabra === null) {
            console.log("Búsqueda finalizada por el usuario.");
            continuarBuscando = false;
        } else if (palabra.trim().length === 0) {
            console.log("ERROR: Debes introducir una palabra para buscar. Inténtalo de nuevo.");
        } else {
            
            let regex = new RegExp(palabra, 'i');
            let posicion = cadena.search(regex);
            
            if (posicion !== -1) {
                console.log(`\nRESULTADO DE BÚSQUEDA`);
                console.log(`Palabra: "${palabra}" encontrada en la cadena.`);
                console.log(`Empieza en la posición (índice): ${posicion}`);
                
                continuarBuscando = false; 
            } else {
                console.log(`\nRESULTADO DE BÚSQUEDA`);
                console.log(`Palabra: "${palabra}" NO encontrada en la cadena.`);
                
                let respuesta = confirm("Palabra no encontrada. ¿Quieres intentar buscar otra palabra?");
                
                if (!respuesta) {
                    console.log("Búsqueda finalizada.");
                    continuarBuscando = false;
                }
            }
        }
    } while (continuarBuscando);
}