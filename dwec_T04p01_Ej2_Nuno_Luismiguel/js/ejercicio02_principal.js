console.log("T04p01 - Ejercicio 02 - Principal");
function funcionPrueba2() {
    let maxAlumnos, id, descripcion, curso;

    do {
        maxAlumnos = parseInt(prompt("Introduce el NÚMERO MÁXIMO de alumnos del aula:"));
    } while (isNaN(maxAlumnos) || maxAlumnos <= 0);

    do {
        id = prompt("Introduce el ID del Aula (ej. DAW2):");
    } while (!id || id.trim() === "");

    do {
        descripcion = prompt("Introduce la Descripción (ej. Desarrollo Web):");
    } while (!descripcion || descripcion.trim() === "");

    do {
        curso = parseInt(prompt("Introduce el Curso (1-4):"));
    } while (isNaN(curso) || curso < 1 || curso > 4);

    let miAula = new Aula(maxAlumnos, id, descripcion, curso);
    alert(`Aula ${miAula.id} creada con ${miAula.maxAlumnos} plazas.`);

    let opcion;
    do {
        const MENU_TEXT = `
GESTIÓN DEL AULA: ${miAula.id} (${miAula.descripcion})
Plazas ocupadas: ${miAula.numAlumnos} / ${miAula.maxAlumnos}
1. Matricular Alumnos
2. Mostrar Datos de Todos los Alumnos
3. Calcular Nota Media del Aula
4. Mostrar Alumno(s) con Mejor Nota
5. Mostrar % Aprobados y Suspensos
0. Salir
Introduce tu opción:`;
        opcion = prompt(MENU_TEXT);
        switch (opcion) {
            case '1':
                let nuevosAlumnos = miAula.pedirDatos();
                if (nuevosAlumnos.length > 0) {
                    miAula.insertarAlumnos(nuevosAlumnos);
                    alert(`Se han matriculado ${nuevosAlumnos.length} alumnos.`);
                }
                break;
            case '2':
                alert(miAula.mostrarDatos());
                break;
            case '3':
                alert(`La nota media del aula es: ${miAula.mediasNota().toFixed(2)}`);
                break;
            case '4':
                let mejores = miAula.mejorNota();
                if (mejores.length === 0) {
                    alert("Aún no hay alumnos en el aula.");
                } else {
                    let msg = "Alumno(s) con la mejor nota:\n";
                    for(let i=0; i < mejores.length; i++) {
                        msg += ` - ${mejores[i].nombre} (Nota: ${mejores[i].notaFinal.toFixed(2)})\n`;
                    }
                    alert(msg);
                }
                break;
            case '5':
                alert(miAula.mostrarSuspensosAprobados());
                break;
            case '0':
                alert("Saliendo del programa..");
                break;
            case null:
                opcion = '0';
                alert("¡Adiós!");
                break;
            default:
                alert("Opción no válida. Inténtalo de nuevo.");
                break;
        }
    } while (opcion !== '0');
}
if (typeof Alumno === 'undefined' || typeof Aula === 'undefined') {
} else {
    funcionPrueba2();
}