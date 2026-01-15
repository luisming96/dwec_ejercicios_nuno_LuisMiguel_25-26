console.log("T04p01 - Ejercicio 03 - Aula");
function Aula(maxAlumnos, id, descripcion, curso) {
    this._alumnos = [];
    this._maxAlumnos = maxAlumnos;
    this._id = id;
    this._descripcion = descripcion;
    this._curso = curso;
}

Object.defineProperties(Aula.prototype, {
    alumnos: { get: function() { return this._alumnos; } },
    numAlumnos: { get: function() { return this._alumnos.length; } },
    maxAlumnos: { get: function() { return this._maxAlumnos; }, set: function(v) { this._maxAlumnos = v; } },
    id: { get: function() { return this._id; }, set: function(v) { this._id = v; } },
    descripcion: { get: function() { return this._descripcion; }, set: function(v) { this._descripcion = v; } },
    curso: { get: function() { return this._curso; }, set: function(v) { this._curso = v; } }
});

Aula.prototype.haySitioAlumnos = function() {
    return this._alumnos.length < this._maxAlumnos;
};

Aula.prototype.hayAlumnos = function() {
    return this._alumnos.length > 0;
};

Aula.prototype.insertarAlumno = function(alumno) {
    if (!this.haySitioAlumnos()) {
        alert("No hay sitio en el aula.");
        return false;
    }
    this._alumnos.push(alumno);
    return true;
};

Aula.prototype.obtenerAlumnosConAsignatura = function(nombreAsignatura) {
    return this._alumnos.filter(a => a.tieneAsignatura(nombreAsignatura));
};

Aula.prototype.todosConNotasCompletas = function() {
    if (this._alumnos.length === 0) return false;
    return this._alumnos.every(a => a.tieneTodasLasNotas());
};

Aula.prototype.calcularEstadisticas = function() {
    let alumnosEvaluados = this._alumnos.filter(a => a.tieneTodasLasNotas());

    if (alumnosEvaluados.length === 0) {
        return "No se pueden calcular estadísticas: faltan notas o no hay alumnos.";
    }
    
    let aprobados = alumnosEvaluados.filter(a => a.estaAprobado()).length;
    let total = alumnosEvaluados.length;
    let suspensos = total - aprobados;
    
    let sumaMedias = alumnosEvaluados.reduce((sum, a) => sum + a.notaMedia, 0);
    let mediaAula = (sumaMedias / total).toFixed(2);
    
    let pApr = (aprobados / total * 100).toFixed(2);
    let pSusp = (suspensos / total * 100).toFixed(2);
    
    let info = `ESTADÍSTICAS AULA ${this._id}:\n`;
    info += `Nota media del aula: ${mediaAula}\n`; 
    info += `Aprobados: ${aprobados} (${pApr}%)\n`;
    info += `Suspensos: ${suspensos} (${pSusp}%)\n`;
    return info;
};