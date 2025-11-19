console.log("T04p01 - Ejercicio 03 - Alumno");
function Alumno(dni, nombre) {
    this._dni = dni;
    this._nombre = nombre;
    this._asignaturas = []; 
    this._notas = {};
    this._notaMedia = 0;
    this.calcularNotaMedia();
}

Object.defineProperties(Alumno.prototype, {
    dni: { get: function() { return this._dni; }, set: function(val) { this._dni = val; } },
    nombre: { get: function() { return this._nombre; }, set: function(val) { this._nombre = val; } },
    notaMedia: { get: function() { return this._notaMedia; } },
    asignaturas: { get: function() { return this._asignaturas; } },
    notas: { get: function() { return this._notas; } }
});

Alumno.prototype.calcularNotaMedia = function() {
    const notasValidas = Object.values(this._notas).filter(n => typeof n === 'number');
    if (notasValidas.length === 0) {
        this._notaMedia = 0;
        return;
    }
    const suma = notasValidas.reduce((total, nota) => total + nota, 0);
    this._notaMedia = suma / notasValidas.length;
};

Alumno.prototype.estaAprobado = function() {
    if (!this.tieneTodasLasNotas()) {
        return false;
    }
    return this.notaMedia >= 5;
};

Alumno.prototype.matricularAsignatura = function(asignatura) {
    if (this._asignaturas.length >= 4) {
        alert("Error: Máximo 4 asignaturas matriculadas.");
        return false;
    }
        
    const numOptativas = this._asignaturas.filter(a => a.tipo === 'optativa').length;
    const numObligatorias = this._asignaturas.filter(a => a.tipo === 'obligatoria').length;
    
    if (asignatura.tipo === 'optativa' && numOptativas >= 2) {
        alert("Error: Máximo 2 asignaturas optativas.");
        return false;
    }
        
    if (asignatura.tipo === 'obligatoria' && numObligatorias >= 2) {
        alert("Error: Máximo 2 asignaturas obligatorias.");
        return false;
    }
        
    this._asignaturas.push(asignatura);
    this._notas[asignatura.nombre] = undefined;
    return true;
};

Alumno.prototype.asignarNota = function(nombreAsignatura, nota) {
    if (this._notas.hasOwnProperty(nombreAsignatura)) {
        this._notas[nombreAsignatura] = nota;
        this.calcularNotaMedia();
        return true;
    }
    return false;
};

Alumno.prototype.tieneAsignatura = function(nombreAsignatura) {
    return this._notas.hasOwnProperty(nombreAsignatura);
};

Alumno.prototype.tieneTodasLasNotas = function() {
    if (this._asignaturas.length === 0) return false;
    return Object.values(this._notas).every(nota => typeof nota === 'number');
};

Alumno.prototype.mostrarInformacion = function() {
    let info = `INFORMACIÓN DEL ALUMNO\nDNI: ${this.dni}\nNombre: ${this.nombre}\n`;
    info += "Asignaturas y Notas:\n";
    
    if (this._asignaturas.length === 0) {
        info += "(Sin asignaturas matriculadas)\n";
    } else {
        this._asignaturas.forEach(asig => {
            const nota = this._notas[asig.nombre] !== undefined ? this._notas[asig.nombre].toFixed(2) : "Sin nota";
            info += ` - ${asig.nombre} (C${asig.curso}, ${asig.tipo}): ${nota}\n`;
        });
    }
    
    info += `\nNota Media: ${this.notaMedia.toFixed(2)}\n`;
    const estado = this.tieneTodasLasNotas() ? (this.estaAprobado() ? "APROBADO" : "SUSPENSO") : "PENDIENTE DE EVALUACIÓN";
    info += `Estado: ${estado}\n`;
    return info;
};