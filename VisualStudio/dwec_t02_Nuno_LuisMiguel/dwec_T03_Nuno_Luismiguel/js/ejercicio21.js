console.log("T03 - Ejercicio 21");
function validarTelefono(telefono) {
    let patronNacional = /^[6789]\d{8}$/;
    let regExpTelefono = new RegExp(patronNacional);
    return regExpTelefono.test(telefono);
}
function validarPrefijoTeléfonoEsp(telefono) {
    let patronPrefijo = /^\+34/;
    return patronPrefijo.test(telefono);
}

function validarTelefonoConSin(telefono) {
    if (validarPrefijoTeléfonoEsp(telefono)) {
        let telefonoSinPrefijo = telefono.substring(3);
        return validarTelefono(telefonoSinPrefijo);
    } else {
        return validarTelefono(telefono);
    }
}
console.log("--- Validación de Números Nacionales (válidos) ---");
console.log("Móvil Válido (6):", validarTelefono("650111222")); 
console.log("Fijo Válido (9):", validarTelefono("912345678"));  

console.log("--- Validación de Teléfonos Con o Sin Prefijo ---");
console.log("1. Móvil Válido sin +34:", validarTelefonoConSin("600000000"));       
console.log("2. Fijo Válido con +34:", validarTelefonoConSin("+34876543210")); 
    
console.log("--- Validación de Teléfonos Inválidos ---");
console.log("3. Corto (8 dígitos):", validarTelefonoConSin("61234567"));         
console.log("4. Prefijo OK, pero número inválido (empieza por 5):", validarTelefonoConSin("+34555444333")); 
console.log("5. Empieza por 5:", validarTelefonoConSin("511223344"));