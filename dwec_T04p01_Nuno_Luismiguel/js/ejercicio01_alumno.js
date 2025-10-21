console.log("T04p01 - Ejercicio 01");
function Alumno(dni, nombre, fechaNacimiento, nota1, nota2 , nota3, sexo) {
    this.dni = dni;
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.sexo = sexo;

    this.calcularEdad();
    this.calcularNota();
}
Alumno.prototype.getDni = function(dni){
    return this.dni;
};
Alumno.prototype.setDni = function(dni){
    this.dni = dni;
};
Alumno.prototype.getNombre = function(nombre){
    return this.nombre;
};
Alumno.prototype.setNombre = function(nombre){
    this.nombre = nombre;
};
Alumno.prototype.getEdad = function(){
    return this.edad;
};
Alumno.prototype.getFechaNacimiento = function(){
    return this.fechaNacimiento;
};
Alumno.prototype.setFechaNacimiento = function(fechaNacimiento){
    this.fechaNacimiento = fechaNacimiento;
    this.calcularEdad();
};
Alumno.prototype.getNotaFinal = function(){
    return this.notaFinal;
};
Alumno.prototype.getNota1 = function(){
    return this.nota1;
};
Alumno.prototype.setNota1 = function(nota1){
    this.nota1 = nota1;
    this.calcularNota();
};
Alumno.prototype.getNota2 = function(){
    return this.nota2;
};
Alumno.prototype.setNota2 = function(nota2){
    this.nota2 = nota2;
    this.calcularNota();
};
Alumno.prototype.getNota3= function(){
    return this.nota3;
};
Alumno.prototype.setNota3= function(nota3){
    this.nota3 = nota3;
    this.calcularNota();
};
Alumno.prototype.getSexo = function(){
    return this.sexo;
};
Alumno.prototype.setSexo = function(sexo){
    this.sexo = sexo;
};
Alumno.prototype.calcularEdad = function(){
    let hoy = new Date();
    let fechaNac = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    let mes = hoy.getMonth () - fechaNac.getMonth();

    if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    } 
    this.edad = edad;
};
Alumno.prototype.calcularNota = function(){
    this.notaFinal = ( this.nota1 + this.nota2 + this.nota3) / 3;
};
Alumno.prototype.cambiarNotas = function(nota1 , nota2, nota3){
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.calcularNota();
};
Alumno.prototype.comparar = function(otroAlumno) {
    if (this.notaFinal > otroAlumno.getNotaFinal()) {
        return 1;
    } else if (this.notaFinal < otroAlumno.getNotaFinal()) {
        return -1;
    } else {
        return 0;
    }
};
Alumno.prototype.estaAprobado = function (){
    return this.notaFinal >= 5;
};
Alumno.prototype.mostrarInformacion = function() {
    let info = "INFORMACIÓN DEL ALUMNO\n";
    info += "DNI:" + this.dni + "\n";
    info += "Nombre:" + this.nombre + "\n";
    info += "Edad:" + this.edad + " años\n";
    info += "Fecha de Nacimiento:" + this.fechaNacimiento + "\n";
    info += "Sexo:" + this.sexo + "\n";
    info += "Nota Trimestre 1:" + this.nota1 + "\n";
    info += "Nota Trimestre 2:" + this.nota2 + "\n";
    info += "Nota Trimestre 3:" + this.nota3 + "\n";
    info += "Nota Final:" + this.notaFinal.toFixed(2) + "\n";
    info += "Estado:" + (this.estaAprobado() ? "APROBADO" : "SUSPENSO") + "\n";
    return info;
}