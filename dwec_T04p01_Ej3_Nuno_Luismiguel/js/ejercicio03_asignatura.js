console.log("T04p01 - Ejercicio 03 - Asignatura");
function anadirAccesoresDeAsignatura(obj) {
    Object.defineProperties(obj, {
        'nombre': { get: function() { return this._nombre; }, set: function(val) { this._nombre = val; }, enumerable: true },
        'curso': { get: function() { return this._curso; }, set: function(val) { this._curso = val; }, enumerable: true },
        'tipo': { get: function() { return this._tipo; }, set: function(val) { this._tipo = val; }, enumerable: true }
    });
}

function obtenerClaveIdentificativa(separador) {
    const sep = separador || "-";
    return `${this.nombre}${sep}C${this.curso}${sep}${this.tipo.toUpperCase()}`;
}

const asignaturas = {
    asig_PROG: { _nombre: "Programación", _curso: 2, _tipo: "obligatoria" },
    asig_BD: { _nombre: "Bases de Datos", _curso: 2, _tipo: "obligatoria" },
    asig_LM: { _nombre: "Lenguajes de Marcas", _curso: 2, _tipo: "obligatoria" },
    asig_SI: { _nombre: "Sistemas Informáticos", _curso: 2, _tipo: "obligatoria" },
    asig_EIE: { _nombre: "Empresa e Iniciativa", _curso: 2, _tipo: "optativa" },
    asig_PMDM: { _nombre: "Móviles", _curso: 2, _tipo: "optativa" },
    asig_DI: { _nombre: "Diseño de Interfaces", _curso: 2, _tipo: "optativa" },
    asig_FOL: { _nombre: "FOL", _curso: 1, _tipo: "obligatoria" }, 
    asig_SGE: { _nombre: "Sistemas de Gestión", _curso: 3, _tipo: "optativa" } 
};

Object.values(asignaturas).forEach(asignaturaActual => {
    anadirAccesoresDeAsignatura(asignaturaActual);
});

function obtenerAsignaturasPorCursoYTipo(curso, tipo) {
    const todas = Object.values(asignaturas);
    return todas.filter(a => 
        (curso === null || a.curso === curso) &&
        (tipo === null || a.tipo === tipo)
    );
}