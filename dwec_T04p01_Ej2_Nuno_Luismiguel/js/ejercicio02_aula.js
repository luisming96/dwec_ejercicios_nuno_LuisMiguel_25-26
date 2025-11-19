console.log("T04p01 - Ejercicio 02 - Aula");
function Aula(maxAlumnos, id, descripcion, curso) {
    this._alumnos = [];
    this._maxAlumnos = maxAlumnos;
    this._id = id;
    this._descripcion = descripcion;
    this._curso = curso;
}

Object.defineProperty(Aula.prototype, 'alumnos', {
    get: function() { return this._alumnos; }
});

Object.defineProperty(Aula.prototype, 'numAlumnos', {
    get: function() { return this._alumnos.length; }
});

Object.defineProperty(Aula.prototype, 'maxAlumnos', {
    get: function() { return this._maxAlumnos; },
    set: function(valor) { this._maxAlumnos = valor; }
});

Object.defineProperty(Aula.prototype, 'id', {
    get: function() { return this._id; },
    set: function(valor) { this._id = valor; }
});

Object.defineProperty(Aula.prototype, 'descripcion', {
    get: function () { return this._descripcion; },
    set: function (valor) { this._descripcion = valor; }
});

Object.defineProperty(Aula.prototype, 'curso', {
    get: function () { return this._curso; },
    set: function (valor) { this._curso = valor; }
});

Aula.prototype.haySitioAlumnos = function() {
    return this.numAlumnos < this.maxAlumnos;
};

Aula.prototype.hayAlumnos = function() {
    return this.numAlumnos > 0;
};

Aula.prototype.pedirDatosUnAlumno = function() {
    let dni, nombre, fechaNac, nota1, nota2, nota3, sexo;
    
    do {
        dni = prompt("Introduce DNI (8 números y 1 letra):");
        if (dni === null) return null;
    } while (!/^\d{8}[A-Za-z]$/.test(dni));

    do {
        nombre = prompt("Introduce Nombre:");
        if (nombre === null) return null;
    } while (nombre.trim().length === 0);

    do {
        fechaNac = prompt("Introduce Fecha Nacimiento (YYYY-MM-DD):");
        if (fechaNac === null) return null;
    } while (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNac));

    do {
        sexo = prompt("Introduce Sexo (H/M):");
        if (sexo === null) return null;
        sexo = sexo.toUpperCase();
    } while (sexo !== 'H' && sexo !== 'M');

    const leerNota = (msg) => {
        let notaStr, notaNum;
        do {
            notaStr = prompt(msg + " (0-10):");
            if (notaStr === null) return null;
            notaNum = parseFloat(notaStr);
        } while (isNaN(notaNum) || notaNum < 0 || notaNum > 10);
        return notaNum;
    };

    nota1 = leerNota("Nota 1 Trimestre");
    if (nota1 === null) return null;
    nota2 = leerNota("Nota 2 Trimestre");
    if (nota2 === null) return null;
    nota3 = leerNota("Nota 3 Trimestre");
    if (nota3 === null) return null;
    return new Alumno(dni, nombre, 0, fechaNac, nota1, nota2, nota3, sexo);
};

Aula.prototype.pedirDatos = function() {
    let numAlumnosStr = prompt("¿Cuántos alumnos quieres matricular?");
    let numAlumnos = parseInt(numAlumnosStr);

    if (isNaN(numAlumnos) || numAlumnos <= 0) {
        alert("Número no válido. No se matriculará a nadie.");
        return [];
    }

    let plazasLibres = this.maxAlumnos - this.numAlumnos;

    if (numAlumnos > plazasLibres) {
        alert(`No hay sitio. Plazas libres: ${plazasLibres}.`);
        return [];
    }

    let alumnosTemporales = [];
    for (let i = 0; i < numAlumnos; i++) {
        alert(`Introduce los datos del ALUMNO ${i + 1} de ${numAlumnos}`);
        let nuevoAlumno = this.pedirDatosUnAlumno();

        if (nuevoAlumno === null) {
            alert("Matriculación cancelada por el usuario.");
            return [];
        }
        alumnosTemporales.push(nuevoAlumno);
    }
    return alumnosTemporales;
};

Aula.prototype.insertarAlumnos = function(arrayAlumnos) {
    for (let i = 0; i < arrayAlumnos.length; i++) {
        this._alumnos.push(arrayAlumnos[i]);
    }
};

Aula.prototype.mostrarDatos = function() {
    if (!this.hayAlumnos()) {
        return "El aula está vacía.";
    }

    let info = `DATOS DEL AULA: ${this.id} (${this.descripcion})\n`;
    info += `Curso: ${this.curso} | Plazas: ${this.numAlumnos}/${this.maxAlumnos}\n`;

    for (let i = 0; i < this.alumnos.length; i++) {
        info += this.alumnos[i].mostrarInformacion();
    }
    return info;
};

Aula.prototype.mediasNota = function() {
    if (!this.hayAlumnos()) {
        return 0;}

    let sumaTotal = 0;
    for (let i = 0; i < this.alumnos.length; i++) {
        sumaTotal += this.alumnos[i].notaFinal;}
    return sumaTotal / this.numAlumnos;
};

Aula.prototype.mejorNota = function() {
    if (!this.hayAlumnos()) {
        return [];}

    let mejorNota = -1;
    let mejoresAlumnos = [];

    for (let i = 0; i < this.alumnos.length; i++) {
        let alumnoActual = this.alumnos[i];
        if (alumnoActual.notaFinal > mejorNota) {
            mejorNota = alumnoActual.notaFinal;
            mejoresAlumnos = [alumnoActual];
        } else if (alumnoActual.notaFinal === mejorNota) {
            mejoresAlumnos.push(alumnoActual);
        }
    }
    return mejoresAlumnos;
};

Aula.prototype.porcentajeSuspensos = function() {
    if (!this.hayAlumnos()) {
        return 0;
    }
    
    let contadorSuspensos = 0;
    for (let i = 0; i < this.alumnos.length; i++) {
        if (this.alumnos[i].estaAprobado() === false) {
            contadorSuspensos++;
        }
    }
    return (contadorSuspensos / this.numAlumnos) * 100;
};

Aula.prototype.mostrarSuspensosAprobados = function() {
    if (!this.hayAlumnos()) {
        return "No hay alumnos para calcular estadísticas.";
    }
    
    let suspensos = this.porcentajeSuspensos();
    let aprobados = 100 - suspensos;
    
    let info = `ESTADÍSTICA DEL AULA (${this.id}):\n`;
    info += ` - Aprobados: ${aprobados.toFixed(2)}%\n`;
    info += ` - Suspensos: ${suspensos.toFixed(2)}%`;
    return info;
};