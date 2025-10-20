console.log("T03p03 - Ejercicio 02");
function pedirDatos() {
  let cantidad;
  do {
    cantidad = parseInt(prompt("¿Cuántos números vas a introducir?"));
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Error: Debe ser un número mayor que cero");
    }
  } while (isNaN(cantidad) || cantidad <= 0);

  let numeros = [];
  for (let i = 0; i < cantidad; i++) {
    let num = parseFloat(prompt("Introduce el número " + (i + 1) + ":"));
    numeros.push(num);
  }
  return numeros;
}

function calcularMedia(array) {
  let suma = 0;
  for (let i = 0; i < array.length; i++) {
    suma += array[i];
  }
  return suma / array.length;
}

function calcularSuperioresMedia(array, media) {
  let superiores = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > media) {
      superiores.push(array[i]);
    }
  }
  return superiores;
}

function ordenarArray(array, orden) {
  let arr = [...array];
  
  for (let i = 1; i < arr.length; i++) {
    let actual = arr[i];
    let j = i - 1;
    
    if (orden === "asc") {
      while (j >= 0 && arr[j] > actual) {
        arr[j + 1] = arr[j];
        j--;
      }
    } else {
      while (j >= 0 && arr[j] < actual) {
        arr[j + 1] = arr[j];
        j--;
      }
    }
    arr[j + 1] = actual;
  }
  return arr;
}

function mostrarArray(array, mensaje) {
  if (mensaje) {
    console.log(mensaje + " [" + array + "]");
  } else {
    console.log("[" + array + "]");
  }
}

function mostrarArrayOrdenado(array) {
  let arrayOrdenado = ordenarArray(array, "asc");
  mostrarArray(arrayOrdenado, "Array ordenado:");
}

let numeros = pedirDatos();
mostrarArray(numeros, "Array original:");
let media = calcularMedia(numeros);
console.log("Media: " + media);
let superiores = calcularSuperioresMedia(numeros, media);
console.log("Números superiores a la media: " + superiores.length);
mostrarArrayOrdenado(numeros);