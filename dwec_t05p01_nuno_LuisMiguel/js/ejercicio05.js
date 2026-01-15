document.addEventListener("DOMContentLoaded", () => {
    const campoTexto = document.getElementById('campoTexto');
    const listaSalida = document.getElementById('listaSalida');

    function mostrarEvento(event) {
        const item = document.createElement('li');
        item.className = 'list-group-item';

        item.innerHTML = `
            <h6 class="text-primary">${event.type}</h6>
            
            <b>Datos principales:</b><br>
            Key: ${event.key} | Code: ${event.code} | keyCode (Heredado): ${event.keyCode} <br>
            
            <b>Modificadores:</b><br>
            Alt: ${event.altKey} | Ctrl: ${event.ctrlKey} | Shift: ${event.shiftKey} <br>
            
            <b>Deprecados:</b><br>
            charCode: ${event.charCode} | keyCode: ${event.keyCode} | which: ${event.which}
        `;

        listaSalida.prepend(item);

        if (listaSalida.children.length > 20) {
            listaSalida.removeChild(listaSalida.lastElementChild);
        }
    }
    campoTexto.addEventListener('keydown', mostrarEvento);
    campoTexto.addEventListener('keyup', mostrarEvento);
});