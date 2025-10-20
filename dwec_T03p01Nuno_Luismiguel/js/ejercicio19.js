console.log("T03 - Ejercicio 19");
let a = ["Sung", "Luffy", "Goku", "Sakura", "Asta", "Kenshin", "Meliodas"]; // 'a' es un array con 7 nombres.
let b = new Date(); // 'b' obtiene la fecha y hora actuales.
let c = a[b.getDay() % a.length]; // 'c' selecciona un nombre de 'a' usando el día de la semana (0=Dom, 6=Sab).
let d = 0; // 'd' es un contador que se usará para calcular un número binario.
for (let i = 0; i < c.length; i++) { // Bucle que itera sobre cada letra del nombre seleccionado en 'c'.
  let e = Math.floor(Math.random() * c.length); // 'e' es un índice aleatorio dentro de la longitud de 'c'.
  let f = c.charAt(e); // 'f' obtiene la letra en la posición aleatoria 'e' del nombre 'c'.
  if (i % 2 === 0) { // Si el índice del bucle 'i' es par (0, 2, 4...).
    f = f.toUpperCase(); // Convierte la letra 'f' a mayúscula.
    c = c.slice(0, i) + f + c.slice(i + 1); // ¡ERROR! Esto intenta reemplazar la letra en 'c' en la posición 'i',
                                             // pero usa la letra 'f' (que es de la posición aleatoria 'e').
                                             // El intento es modificar 'c' con la mayúscula, pero la lógica es confusa.
  }
  if ("aeiou".includes(f.toLowerCase())) { // Si la letra 'f' (aleatoria) es una vocal (minúscula o mayúscula).
    d += Math.pow(2, i); // Suma $2^i$ a 'd' (creando un número binario basado en la posición 'i' del bucle).
  }
  console.log(f); // Muestra la letra 'f' (la letra aleatoria, ya sea modificada a mayúscula o no).
}
console.log(d.toFixed(0)); // Muestra el valor final de 'd' (el número binario calculado).
console.log(c); // Muestra el nombre 'c' después del intento de modificación en el bucle.
console.log(e); // Muestra el último valor **aleatorio** de 'e' (el índice aleatorio de la última iteración). // 
// ¡NOTA! En JavaScript moderno, 'e' no estaría definida fuera del bucle `for` si se declarara con `let` dentro de `for`. 
// Aquí funciona porque está dentro del bucle, pero se muestra después.