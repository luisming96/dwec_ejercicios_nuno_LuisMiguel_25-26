console.log("T02 - Ejercicio 15");

let totalSalariosAbonados = 0;

do {
    let horas = horasTrabajadas();
    if (horas === null) {
        break;
    }

    let turno = Turno();
    if (turno === null) {
        break;
    }
    
    let salarioBruto = SalarioBruto(horas, turno);
    let salarioNeto = SalarioNeto(salarioBruto);

    alert(`El salario neto del trabajador es: ${salarioNeto.toFixed(2)}€`);
    console.log(`El salario neto del trabajador es: ${salarioNeto.toFixed(2)}€`);
    
    totalSalariosAbonados += salarioNeto;

    var respuesta = prompt("¿Deseas calcular el salario de otro trabajador? (Sí/No)");
    
} while (respuesta && (respuesta.toLowerCase() === "si" || respuesta.toLowerCase() === "sí"));

alert(`El importe total de salarios abonados es: ${totalSalariosAbonados.toFixed(2)}€`);
console.log(`El importe total de salarios abonados es: ${totalSalariosAbonados.toFixed(2)}€`);

function horasTrabajadas() {
    let horas;
    do {
        horas = parseInt(prompt("Introduce el número de horas trabajadas (entero y mayor a 0):"));
    } while (isNaN(horas) || horas <= 0);
    return horas;
}

function Turno() {
    let turno;
    do {
        turno = prompt("Introduce el turno (M/T/N):").toLowerCase();
    } while (turno !== "m" && turno !== "t" && turno !== "n");
    return turno;
}

function SalarioBruto(horas, turno) {
    let tarifaHora;
    switch (turno) {
        case 'm':
            tarifaHora = 45.00;
            break;
        case 't':
            tarifaHora = 47.00;
            break;
        case 'n':
            tarifaHora = 50.00;
            break;
    }
    return horas * tarifaHora;
}

function SalarioNeto(salarioBruto) {
    let descuento;
    if (salarioBruto < 600) {
        descuento = 0.08;
    } else if (salarioBruto >= 600 && salarioBruto <= 1000) {
        descuento = 0.10;
    } else {
        descuento = 0.12;
    }
    return salarioBruto - (salarioBruto * descuento);
}