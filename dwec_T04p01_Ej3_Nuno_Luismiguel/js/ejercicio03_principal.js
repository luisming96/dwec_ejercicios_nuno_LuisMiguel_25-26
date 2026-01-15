console.log("T04p01 - Ejercicio 03 - Principal");
const aulas = {
    AU01: new Aula(40, "AU01", "Aula de primero", 1),
    AU02: new Aula(30, "AU02", "Aula de segundo", 2),
    AU03: new Aula(35, "AU03", "Aula de tercero", 3),
    AU04: new Aula(30, "AU04", "Aula de cuarto", 4)
};
const gTodasLasAulas = Object.values(aulas);

let aulaActual = null;
const PROFESORES_TEST = [profesores.P1, profesores.P2];

function mostrarMenuYObtenerOpcion(titulo, opciones) {
    let menu = ` ${titulo} \n`;
    opciones.forEach((item, idx) => {
        menu += `${idx + 1}. ${item}\n`;
    });
    menu += "0. CANCELAR\n";
    
    let opcion = prompt(menu);
    let idx = parseInt(opcion);
    
    if (isNaN(idx) || idx < 0 || idx > opciones.length) {
        alert("Opción inválida.");
        return null;
    }
    return idx;
}

function asignarProfesoresPrueba() {
    const profA = profesores.P1;
    const profB = profesores.P2;

    profA._asignaturas = [];
    profB._asignaturas = [];

    const prog = Object.values(asignaturas).find(a => a.nombre === "Programación"); 
    const fol = Object.values(asignaturas).find(a => a.nombre === "FOL"); 
    const bd = Object.values(asignaturas).find(a => a.nombre === "Bases de Datos"); 
    const sge = Object.values(asignaturas).find(a => a.nombre === "Sistemas de Gestión");

    if (!prog || !fol || !bd || !sge) {
        console.error("ERROR: Una o más asignaturas de prueba no se encontraron.");
        alert("ERROR DE DATOS INICIALES. El programa no puede continuar. Consulte la consola.");
        return false; 
    }

    profA.asignarAsignatura(prog);
    profA.asignarAsignatura(fol); 
    
    profB.asignarAsignatura(bd); 
    profB.asignarAsignatura(sge); 

    console.log("Profesores P1 y P2 asignados automáticamente para la prueba.");
    return true;
}

function matricularAlumnosPrueba(aula) {
    const datosAlumnos = [
        { dni: "11111111A", nombre: "Alfredo Pérez", optativas: ["Diseño de Interfaces", "Empresa e Iniciativa"] },
        { dni: "22222222B", nombre: "Beatriz Alonso", optativas: ["Móviles", "Diseño de Interfaces"] },
        { dni: "33333333C", nombre: "Carlos Ruiz", optativas: ["Empresa e Iniciativa", "Móviles"] },
        { dni: "44444444D", nombre: "Diana Ramos", optativas: ["Diseño de Interfaces", null] } 
    ];

    const obligatorias = obtenerAsignaturasPorCursoYTipo(aula.curso, "obligatoria");
    const optativasTodas = obtenerAsignaturasPorCursoYTipo(null, "optativa");

    datosAlumnos.forEach(datos => {
        let alumno = new Alumno(datos.dni, datos.nombre);
        obligatorias.slice(0, 2).forEach(asig => alumno.matricularAsignatura(asig));

        datos.optativas.filter(n => n !== null).forEach(nombreOpt => {
            const opt = optativasTodas.find(a => a.nombre === nombreOpt);
            if (opt) {
                alumno.matricularAsignatura(opt); 
            }
        });
        
        aula.insertarAlumno(alumno);
    });

    console.log("4 Alumnos matriculados automáticamente en AU02.");
}

function simularNotasPrueba(aula) {
    const notasSimuladas = {
        "Alfredo Pérez": { "Programación": 8.5, "Bases de Datos": 4.5, "Diseño de Interfaces": 9.0, "Empresa e Iniciativa": 3.0 },
        "Beatriz Alonso": { "Programación": 4.0, "Bases de Datos": 7.0, "Móviles": 7.5, "Diseño de Interfaces": 8.0 },
        "Carlos Ruiz": { "Programación": 7.0, "Bases de Datos": 6.0, "Empresa e Iniciativa": 5.5, "Móviles": 4.0 },
        "Diana Ramos": { "Programación": 9.0, "Bases de Datos": 5.0, "Diseño de Interfaces": 6.0 }
    };
    
    aula.alumnos.forEach(alumno => {
        const notas = notasSimuladas[alumno.nombre];
        if (notas) {
            Object.keys(notas).forEach(asigNombre => {
                alumno.asignarNota(asigNombre, notas[asigNombre]);
            });
        }
    });
    alert("Notas de prueba cargadas.");
}

function funcionPrueba3() {
    aulaActual = aulas.AU02; 
    alert(`INICIO PRUEBA: Trabajando con ${aulaActual.id} - ${aulaActual.descripcion}. Cargando datos automáticos.`);
    
    if (!asignarProfesoresPrueba()) {
        return; 
    }
    
    matricularAlumnosPrueba(aulaActual);
    simularNotasPrueba(aulaActual); 

    alert("Carga de datos inicial completa. Iniciando Menú Principal.");
    mostrarMenuPrincipal();
}

function mostrarMenuPrincipal() {
    let opcion;
    const opcionesMenu = [
        "Consultar alumnos de un profesor en su asignatura",
        "Introducir notas por asignatura y aula",
        "Ver estadísticas y resumen del aula"
    ];

    do {
        opcion = mostrarMenuYObtenerOpcion(`MENÚ PRINCIPAL ${aulaActual.id}`, opcionesMenu);
        
        switch(opcion) {
            case 1:
                consultarAlumnosProfesor();
                break;
            case 2:
                introducirNotas();
                break;
            case 3:
                obtenerResultadosPorAula();
                break;
            case 0:
                alert("Saliendo del programa. Adiós.");
                break;
        }
    } while (opcion !== 0);
}

function consultarAlumnosProfesor() {
    if (!aulaActual.hayAlumnos()) {
        alert("El aula no tiene alumnos matriculados.");
        return;
    }
    
    const opcionesProfs = PROFESORES_TEST.map(p => p.nombre);
    const opcionP = mostrarMenuYObtenerOpcion("Seleccione Profesor:", opcionesProfs);
    if (opcionP <= 0) return;
    const profesor = PROFESORES_TEST[opcionP - 1];

    if (profesor.asignaturas.length === 0) {
        alert("Este profesor no tiene asignaturas asignadas.");
        return;
    }
    const opcionesAsig = profesor.asignaturas.map(a => a.nombre);
    const opcionA = mostrarMenuYObtenerOpcion(`Asignaturas de ${profesor.nombre}:`, opcionesAsig);
    if (opcionA <= 0) return;
    const asignatura = profesor.asignaturas[opcionA - 1];
    
    if (asignatura.curso !== aulaActual.curso) {
        alert(`AVISO: La asignatura ${asignatura.nombre} es de curso ${asignatura.curso} y el aula actual es C${aulaActual.curso}. Solo se mostrarán alumnos de este aula si están matriculados, pero la asignación es irregular.`);
    }

    const alumnos = aulaActual.obtenerAlumnosConAsignatura(asignatura.nombre);
    
    let lista = `ALUMNOS DE ${asignatura.nombre} (${profesor.nombre}):\n\n`;
    alumnos.forEach(a => {
        const nota = a.notas[asignatura.nombre] !== undefined ? a.notas[asignatura.nombre].toFixed(2) : "Sin nota";
        lista += `- ${a.nombre} (Nota: ${nota})\n`;
    });
    
    alert(lista || "No hay alumnos matriculados en esta asignatura.");
}

function introducirNotas() {
    if (!aulaActual.hayAlumnos()) {
        alert("El aula no tiene alumnos matriculados.");
        return;
    }
    
    const asigsAula = obtenerAsignaturasPorCursoYTipo(aulaActual.curso, null);
    const opcionesAsig = asigsAula.map(a => `${a.nombre} (${a.tipo})`);
    const opcionA = mostrarMenuYObtenerOpcion(`Asignaturas del curso ${aulaActual.curso}:`, opcionesAsig);
    if (opcionA <= 0) return;
    const asignatura = asigsAula[opcionA - 1];
    
    const alumnos = aulaActual.obtenerAlumnosConAsignatura(asignatura.nombre);
    
    if (alumnos.length === 0) {
        alert("No hay alumnos matriculados en esta asignatura.");
        return;
    }
    
    let notasIntroducidas = 0;
    let cancelado = false;
    
    for (const alumno of alumnos) {
        const notaActual = alumno.notas[asignatura.nombre];
        let notaInput = prompt(`Nota de ${alumno.nombre} en ${asignatura.nombre} (Actual: ${notaActual !== undefined ? notaActual.toFixed(2) : 'N/A'}, 0-10):`);
        
        if (notaInput === null) {
            cancelado = true;
            break; 
        }
        
        let nota = parseFloat(notaInput);
        
        if (!isNaN(nota) && nota >= 0 && nota <= 10) {
            alumno.asignarNota(asignatura.nombre, nota);
            notasIntroducidas++;
        } else {
            alert(`Nota inválida para ${alumno.nombre}. No se guardó.`);
        }
    }
    
    if (!cancelado && notasIntroducidas > 0) {
        alert(`Notas introducidas para ${asignatura.nombre}. Total: ${notasIntroducidas} alumnos.`);
    }
}

function obtenerResultadosPorAula() {
    if (!aulaActual.hayAlumnos()) {
        alert("El aula no tiene alumnos matriculados.");
        return;
    }

    let alumnosEvaluados = aulaActual.alumnos.filter(a => a.tieneTodasLasNotas());

    if (alumnosEvaluados.length === 0) {
        alert("No se pueden calcular estadísticas: Ningún alumno tiene todas las notas completas.");
        return;
    }
    
    let aprobados = alumnosEvaluados.filter(a => a.estaAprobado()).length;
    let total = alumnosEvaluados.length;
    let suspensos = total - aprobados;
    let sumaMedias = alumnosEvaluados.reduce((sum, a) => sum + a.notaMedia, 0);

    let pApr = (aprobados / total * 100).toFixed(2);
    let pSusp = (suspensos / total * 100).toFixed(2);
    let mediaAula = (sumaMedias / total).toFixed(2);

    let info = `ESTADÍSTICAS AULA ${aulaActual.id} \n`;
    info += `Total Alumnos Evaluados: ${total}\n`;
    info += `Media del Aula: ${mediaAula}\n`;
    info += `Aprobados: ${aprobados} (${pApr}%)\n`;
    info += `Suspensos: ${suspensos} (${pSusp}%)\n\n`;
    
    info += " Listado Detallado\n";
    alumnosEvaluados.forEach(a => {
        info += `- ${a.nombre}: Media ${a.notaMedia.toFixed(2)} (${a.estaAprobado() ? 'APROBADO' : 'SUSPENSO'})\n`;
    });
    alert(info);
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', function() {
                console.clear(); 
                funcionPrueba3();
            });
        }
    });
}