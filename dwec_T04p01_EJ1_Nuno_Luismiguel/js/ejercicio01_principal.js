console.log("T04p01 - Ejercicio 01 - PRINCIPAL");
function funcionPrueba1() {
    let alumno1 = new Alumno("12345678A", "Juan Castillo",0,"2000-08-14",5,5,7, "h");
    let alumno2 = new Alumno("87654321B", "María García", 0, "2006-07-20", 4, 5, 3, "m");
    
    console.log(alumno1.mostrarInformacion());
    console.log(alumno2.mostrarInformacion());
    
    console.log("Nota final alumno1: " + alumno1.getNotaFinal());
    console.log("Edad alumno2: " + alumno2.getEdad());
    
    alumno1.cambiarNotas(10, 9, 8);
    console.log("Nuevas notas alumno1: " + alumno1.getNotaFinal());
    
    console.log("Comparación: " + alumno1.comparar(alumno2));
    
    console.log("Alumno1 aprobado: " + alumno1.estaAprobado());
    console.log("Alumno2 aprobado: " + alumno2.estaAprobado());
    
    alumno2.setNombre("María López");
    console.log("Nuevo nombre: " + alumno2.getNombre());
}
funcionPrueba1();