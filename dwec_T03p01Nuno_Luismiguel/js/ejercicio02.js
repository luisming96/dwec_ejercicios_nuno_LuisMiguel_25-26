console.log("T03 - Ejercicio 02");
/*Los métodos slice(), substr() y substring() se utilizan para extraer una parte de una cadena de texto en JavaScript,
pero se diferencian en cómo interpretan sus parámetros de entrada

slice(start, end): Extrae una subcadena desde el índice start hasta (pero sin incluir) el índice end. 
Admite índices negativos para contar desde el final de la cadena.

substring(start, end): Es similar a slice(), pero no admite índices negativos. Si el start es mayor que el end, los intercambia automáticamente.

substr(start, length): Extrae una subcadena a partir del índice start y de la longitud especificada por length. OBSOLETO y no se recomienda su uso en nuevos desarrollos.*/

let texto = "Pimientitos";

console.log (texto.slice(2, 6));      // "mien"
console.log (texto.substring(3,8)); // "ienti"
console.log (texto.substr(-1,5));    // "s"

console.log (texto.slice(-5));        // "titos"
console.log (texto.substring(5));   // "ntitos"
console.log (texto.substr(5));      // "ntitos"