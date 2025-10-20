console.log("T03p03 - Ejercicio 11");
let jugadasValidas = new Set(["piedra", "papel", "tijera", "lagarto", "spock"]);
let jugadores = new Map();

jugadores.set("player1", []);
jugadores.set("player2", []);
jugadores.set("maquina", []);

function pedirNombre(numero) {
    let nombre = prompt("Nombre del Jugador " + numero + ":");
    
    while (!jugadores.has(nombre)) {
        alert("El jugador no está registrado. Nombres válidos: player1, player2, maquina");
        nombre = prompt("Nombre del Jugador " + numero + ":");
    }
    return nombre;
}

function pedirJugada(nombreJugador, ronda) {
    let menu = nombreJugador + " - Ronda " + ronda + "\n";
    menu += "1. Piedra\n2. Papel\n3. Tijera\n4. Lagarto\n5. Spock\n";
    menu += "Elige tu jugada:";
    
    let entrada = prompt(menu);
    let jugada = "";
    
    if (entrada === "1") jugada = "piedra";
    else if (entrada === "2") jugada = "papel";
    else if (entrada === "3") jugada = "tijera";
    else if (entrada === "4") jugada = "lagarto";
    else if (entrada === "5") jugada = "spock";
    else if (entrada) jugada = entrada.toLowerCase().trim();
    
    if (jugadasValidas.has(jugada)) {
        return jugada;
    }
    
    alert("Jugada no válida. Inténtalo de nuevo.");
    return pedirJugada(nombreJugador, ronda);
}

function ganaJugada1(j1, j2) {
    if (j1 === "tijera" && (j2 === "papel" || j2 === "lagarto")) return true;
    if (j1 === "papel" && (j2 === "piedra" || j2 === "spock")) return true;
    if (j1 === "piedra" && (j2 === "lagarto" || j2 === "tijera")) return true;
    if (j1 === "lagarto" && (j2 === "spock" || j2 === "papel")) return true;
    if (j1 === "spock" && (j2 === "tijera" || j2 === "piedra")) return true;
    return false;
}

function obtenerMensaje(j1, j2) {
    if (j1 === j2) return "Empate";
    if (j1 === "tijera" && j2 === "papel") return "Tijeras cortan papel";
    if (j1 === "papel" && j2 === "piedra") return "Papel cubre piedra";
    if (j1 === "piedra" && j2 === "lagarto") return "Piedra aplasta lagarto";
    if (j1 === "lagarto" && j2 === "spock") return "Lagarto envenena Spock";
    if (j1 === "spock" && j2 === "tijera") return "Spock destruye tijeras";
    if (j1 === "tijera" && j2 === "lagarto") return "Tijeras decapitan lagarto";
    if (j1 === "lagarto" && j2 === "papel") return "Lagarto come papel";
    if (j1 === "papel" && j2 === "spock") return "Papel desaprueba Spock";
    if (j1 === "spock" && j2 === "piedra") return "Spock vaporiza piedra";
    if (j1 === "piedra" && j2 === "tijera") return "Piedra aplasta tijeras";
    return obtenerMensaje(j2, j1);
}

console.log(" PIEDRA, PAPEL, TIJERA, LAGARTO, SPOCK");
console.log("Jugadores registrados: player1, player2, maquina");

let nombreJ1 = pedirNombre(1);
let jugadasJ1 = [];

for (let i = 1; i <= 5; i++) {
    jugadasJ1.push(pedirJugada(nombreJ1, i));
}

jugadores.set(nombreJ1, jugadasJ1);

let nombreJ2 = pedirNombre(2);
let jugadasJ2 = [];

if (nombreJ2 === "maquina") {
    let opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
    for (let i = 0; i < 5; i++) {
        let indice = Math.floor(Math.random() * 5);
        jugadasJ2.push(opciones[indice]);
    }
    console.log("Jugando contra la máquina...");
} else {
    for (let i = 1; i <= 5; i++) {
        jugadasJ2.push(pedirJugada(nombreJ2, i));
    }
}

jugadores.set(nombreJ2, jugadasJ2);
let puntosJ1 = 0;
let puntosJ2 = 0;

console.log("\n RESULTADOS DE LAS RONDAS");
for (let i = 0; i < 5; i++) {
    let j1 = jugadasJ1[i];
    let j2 = jugadasJ2[i];
    
    console.log("\nRonda " + (i + 1) + ":");
    console.log(nombreJ1 + ": " + j1);
    console.log(nombreJ2 + ": " + j2);
    console.log(obtenerMensaje(j1, j2));
    
    if (j1 === j2) {
        console.log("Empate");
    } else if (ganaJugada1(j1, j2)) {
        puntosJ1++;
        console.log("Gana " + nombreJ1);
    } else {
        puntosJ2++;
        console.log("Gana " + nombreJ2);
    }
}

console.log("\n RESULTADO FINAL");
console.log(nombreJ1 + ": " + puntosJ1 + " puntos");
console.log(nombreJ2 + ": " + puntosJ2 + " puntos");

if (puntosJ1 > puntosJ2) {
    console.log("¡GANADOR: " + nombreJ1 + "!");
} else if (puntosJ2 > puntosJ1) {
    console.log("¡GANADOR: " + nombreJ2 + "!");
} else {
    console.log("¡EMPATE!");
}