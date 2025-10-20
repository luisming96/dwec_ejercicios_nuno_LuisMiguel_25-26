console.log("T03p03 - Ejercicio 10");
let clasificacion = [
    ["Equipo", "PTS", "PJ", "PG", "PE", "PP"],
    ["Levante", 40, 14, 13, 1, 0],
    ["Málaga", 37, 14, 12, 1, 1],
    ["Eibar", 34, 14, 11, 1, 2],
    ["Córdoba C. F.", 27, 14, 8, 3, 3]
];
function obtenerLider (matriz){
    let equipoLider = matriz [1][0];
    let maxPuntos = matriz [1][1];

    for(let i=2; i< matriz.length; i++){
        if (matriz[i][1]> maxPuntos){
            maxPuntos = matriz[i][1];
            equipoLider = matriz [i][0];
        }
    }
    return equipoLider;
}
function obtenerMasPerdidos (matriz){
    let equipoPerdedor = matriz [1][0];
    let maxPerdidos = matriz [1][5];

    for(let i=2; i< matriz.length; i++){
        if (matriz [i][5] > maxPerdidos){
            maxPerdidos = matriz[i][5];
            equipoPerdedor = matriz [i][0];
        }
    }
    return equipoPerdedor;
}
function obtenerMasGanados (matriz){
    let equipoGanador = matriz [1][0];
    let maxGanados = matriz [1][3];
    
    for(let i=2; i< matriz.length; i++){
        if(matriz [i][3]> maxGanados){
            maxGanados = matriz[i][3];
            equipoGanador = matriz[i][0];
        }
    }
    return equipoGanador;
}

function mostrarClasificacion(matriz){
    console.log("CLASIFICACION");
    console.table(matriz);
}

function agregarEquipo (matriz){
    let nombre = prompt ("nombre del equipo");
    let ganados = parseInt (prompt ("partidos ganados:"));
    let empatados = parseInt (prompt ("partidos empatados"));
    let perdidos = parseInt (prompt("partidos perdidos"));
    let pj = ganados + empatados + perdidos;
    let pts = (ganados * 3) + empatados;

    matriz.push ([nombre,pts,pj,ganados,empatados,perdidos]);
    ordenarClasificacion(matriz);
    console.log ("equipo añadido y clasificacion actualizada.")
}

function registrarJornada(matriz){
    for(let i=1; i < matriz.length; i++){
        let equipo = matriz[i][0];
        let resultado = prompt ("resultado de " + equipo + "(ganado/empatado/perdido");
        resultado = resultado.toLowerCase();

        if(resultado === "ganado") {
            matriz [i][1] +=3;
            matriz [i][2] +=1;
            matriz [i][3] +=1;
        }else if (resultado === "empatado"){
            matriz [i][1] +=1;
            matriz [i][2] +=1;
            matriz [i][4] +=1;
        } else if(resultado === "perdido"){
            matriz [i][2] +=1;
            matriz [i][5] +=1;
        }
    }
    ordenarClasificacion(matriz);
    console.log ("jornada registrada y reclasificada.")
}

function ordenarClasificacion(matriz){
    const encabezados = matriz[0];
    const datosEquipos = matriz.slice(1);
    datosEquipos.sort((a, b) => b[1] - a[1]);
    matriz.length = 0; 
    matriz.push(encabezados, ...datosEquipos);
}

function menu(){
    let opcion="";
    const menuTexto = 
        "MENÚ\n" +
        "1. ver lider clasificacion\n" +
        "2. ver equipo con mas partidos perdidos\n" +
        "3. ver equipo con mas partidos ganados\n" +
        "4. mostrar clasificacion completa\n" +
        "5. añadir nuevo equipo\n" +
        "6. registrar jornada\n" +
        "7. ordenar clasificacion\n" +
        "0. salir\n";

    while (opcion !== "0") { 
        opcion = prompt(menuTexto); 
        if(opcion === "1") {
            console.log ("el lider es " + obtenerLider(clasificacion));
        } else if (opcion === "2"){
            console.log ("equipo con mas partidos perdidos " + obtenerMasPerdidos(clasificacion));
        } else if (opcion === "3"){
            console.log ("equipo con mas partidos ganados " + obtenerMasGanados (clasificacion));
        } else if(opcion === "4"){
            mostrarClasificacion(clasificacion);
        } else if (opcion === "5"){
            agregarEquipo(clasificacion);
        } else if (opcion === "6"){
            registrarJornada(clasificacion);
        } else if(opcion ==="7"){
            ordenarClasificacion(clasificacion);
            console.log("clasificacion ordenada");
        } else if (opcion === "0") {
            console.log("programa terminado");
        } else {
            console.log ("opcion no valida");
        }
    }
}
menu();