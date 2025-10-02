console.log("T03p02 - Ejercicio 01");
function validarNumeros() {
    let numeros = [];
    
    if (arguments.length === 0) {
        return [0];
    }
    
    for (let i = 0; i < arguments.length; i++) {
        let valor = arguments[i];
        
        if (typeof valor === "string") {
            valor = parseFloat(valor);
            if (isNaN(valor)) {
                console.log("Error: el argumento " + arguments[i] + " no es un número válido");
                return undefined;
            }
        }
        
        if (typeof valor !== "number" || isNaN(valor)) {
            console.log("Error: el argumento " + arguments[i] + " no es un número válido");
            return undefined;
        }
        
        numeros.push(valor); 
    }
    
    return numeros; 
}

let calcularMedia = function(numeros) {
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    return suma / numeros.length;
};

let calcularMaximo = (numeros) => {
    let maximo = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
    }
    return maximo;
};

let calcularMinimo = (numeros) => {
    let minimo = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] < minimo) {
            minimo = numeros[i];
        }
    }
    return minimo;
};

function calcularDesviaciones(numeros, media) {
    let desviaciones = [];
    for (let i = 0; i < numeros.length; i++) {
        desviaciones[i] = numeros[i] - media;
    }
    return desviaciones;
}

let generarMensaje = function(media, maximo, minimo, desviaciones) {
    if (media < 30) {
        return "Tu destino es entrenar más duro. Tus estadísticas están por debajo del mínimo requerido.";
    } else if (media >= 30 && media <= 60) {
        return "Estás en el camino del héroe. El valor máximo alcanzado fue " + maximo + " y el mínimo " + minimo + ".";
    } else {
        return "Eres un maestro legendario. Tus desviaciones son: [" + desviaciones + "].";
    }
};

function oraculo() {
    let numeros = validarNumeros.apply(null, arguments); 
    
    if (numeros === undefined) {
        return undefined; 
    }
    let media = calcularMedia(numeros);
    let maximo = calcularMaximo(numeros);
    let minimo = calcularMinimo(numeros);
    let desviaciones = calcularDesviaciones(numeros, media);
    let mensaje = generarMensaje(media, maximo, minimo, desviaciones);
    
    console.log("Media: " + media);
    console.log("Máximo: " + maximo);
    console.log("Mínimo: " + minimo);
    console.log("Desviaciones:" + desviaciones);
    console.log(mensaje);
    
    return mensaje;
}

(function() {
    console.log("Prueba 1: Sin argumentos");
    oraculo();
    
    console.log("Prueba 2: Estadísticas bajas");
    oraculo(10, 15, 20);
    
    console.log("Prueba 3: Camino del héroe");
    oraculo(40, 50, 35, 55);
    
    console.log("Prueba 5: Con cadenas numéricas");
    oraculo("45", 50, "55");
    
    console.log("Prueba 6: Con error");
    oraculo(30, "juan", 40);
})();