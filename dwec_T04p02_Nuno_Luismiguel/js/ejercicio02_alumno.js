console.log("T04p01 - Ejercicio 02 - Alumno");
function Alumno(dni, nombre, edad, fechaNacimiento, nota1, nota2, nota3, sexo) {
    this._dni = dni;
    this._nombre = nombre;
    this._edad = edad;
    this._fechaNacimiento = fechaNacimiento;
    this._nota1 = nota1;
    this._nota2 = nota2;
    this._nota3 = nota3;
    this._sexo = sexo;

    this.calcularEdad = function() {
        let hoy = new Date();
        let fechaNac = new Date(this._fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        let mes = hoy.getMonth() - fechaNac.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        this._edad = edad;
    };

    this.calcularNota = function() {
        this._notaFinal = (this._nota1 + this._nota2 + this._nota3) / 3;
    };

    this.cambiarNotas = function(nota1, nota2, nota3) {
        this._nota1 = nota1;
        this._nota2 = nota2;
        this._nota3 = nota3;
        this.calcularNota();
    };

    this.comparar = function(otroAlumno) {
        if (this._notaFinal > otroAlumno.notaFinal) {
            return 1;
        } else if (this._notaFinal < otroAlumno.notaFinal) {
            return -1;
        } else {
            return 0;
        }
    };

    this.estaAprobado = function() {
        return this._notaFinal >= 5;
    };

    this.mostrarInformacion = function() {
        let info = "INFORMACIÓN DEL ALUMNO\n";
        info += "DNI: " + this._dni + "\n";
        info += "Nombre: " + this._nombre + "\n";
        info += "Edad: " + this._edad + " años\n";
        info += "Fecha de Nacimiento: " + this._fechaNacimiento + "\n";
        info += "Sexo: " + this._sexo + "\n";
        info += "Nota Trimestre 1: " + this._nota1 + "\n";
        info += "Nota Trimestre 2: " + this._nota2 + "\n";
        info += "Nota Trimestre 3: " + this._nota3 + "\n";
        info += "Nota Final: " + this._notaFinal.toFixed(2) + "\n";
        info += "Estado: " + (this.estaAprobado() ? "APROBADO" : "SUSPENSO") + "\n";
        return info;
    };
    this.calcularEdad();
    this.calcularNota();
}

Object.defineProperty(Alumno.prototype, 'dni', {
    get: function() {
        return this._dni;
    },
    set: function(dni) {
        this._dni = dni;
    }
});
Object.defineProperty(Alumno.prototype, 'nombre', {
    get: function() {
        return this._nombre;
    },
    set: function(nombre) {
        this._nombre = nombre;
    }
});
Object.defineProperty(Alumno.prototype, 'edad', {
    get: function() {
        return this._edad;
    }
});
Object.defineProperty(Alumno.prototype, 'fechaNacimiento', {
    get: function() {
        return this._fechaNacimiento;
    },
    set: function(fechaNacimiento) {
        this._fechaNacimiento = fechaNacimiento;
        this.calcularEdad();
    }
});
Object.defineProperty(Alumno.prototype, 'notaFinal', {
    get: function() {
        return this._notaFinal;
    }
});
Object.defineProperty(Alumno.prototype, 'nota1', {
    get: function() {
        return this._nota1;
    },
    set: function(nota1) {
        this._nota1 = nota1;
        this.calcularNota();
    }
});
Object.defineProperty(Alumno.prototype, 'nota2', {
    get: function() {
        return this._nota2;
    },
    set: function(nota2) {
        this._nota2 = nota2;
        this.calcularNota();
    }
});
Object.defineProperty(Alumno.prototype, 'nota3', {
    get: function() {
        return this._nota3;
    },
    set: function(nota3) {
        this._nota3 = nota3;
        this.calcularNota();
    }
});
Object.defineProperty(Alumno.prototype, 'sexo', {
    get: function() {
        return this._sexo;
    },
    set: function(sexo) {
        this._sexo = sexo;
    }
});