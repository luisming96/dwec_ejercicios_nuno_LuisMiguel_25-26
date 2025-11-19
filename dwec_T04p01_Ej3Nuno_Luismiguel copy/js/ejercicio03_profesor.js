console.log("T04p01 - Ejercicio 03 - Profesor");
function obtenerListadoAsignaturas() {
    if (this._asignaturas.length === 0) return "Sin asignaturas asignadas";
    return this._asignaturas.map(a => `- ${a.nombre} (C${a.curso})`).join("\n");
}

function asignarAsignatura(asignatura) {
    if (this._asignaturas.length >= 2) {
        alert("Error: El profesor ya tiene 2 asignaturas asignadas.");
        return false;
    }
    
    const yaAsignada = gTodosLosProfesores.some(p => 
        p !== this && p._asignaturas.some(a => a.nombre === asignatura.nombre)
    );
        
    if (yaAsignada) {
        alert(`Error: La asignatura ${asignatura.nombre} ya está asignada a otro profesor.`);
        return false;
    }
        
    if (this._asignaturas.length === 1 && 
        this._asignaturas[0].curso === asignatura.curso) {
        alert("Error: Las dos asignaturas deben ser de cursos distintos.");
        return false;
    }
        
    this._asignaturas.push(asignatura);
    return true; 
}

const profesores = {
    P1: { _nombre: "Paco Candela", _email: "pacoc2@educa.es", _asignaturas: [] },
    P2: { _nombre: "Juana Arcos", _email: "juanare@educa.es", _asignaturas: [] },
    P3: { _nombre: "Ana Martinez", _email: "anais@educa.es", _asignaturas: [] },
    P4: { _nombre: "Felipe Garcia", _email: "felipe12@educa.es", _asignaturas: [] }
};

Object.keys(profesores).forEach(key => {
    const prof = profesores[key];
    
    Object.defineProperties(prof, {
        nombre: { get: function() { return this._nombre; }, set: function(v) { this._nombre = v; }, enumerable: true },
        email: { get: function() { return this._email; }, set: function(v) { this._email = v; }, enumerable: true },
        asignaturas: { get: function() { return this._asignaturas; }, enumerable: true }
    });

    prof.asignarAsignatura = asignarAsignatura;
    prof.mostrarAsignaturas = obtenerListadoAsignaturas.bind(prof);
});
const gTodosLosProfesores = Object.values(profesores);