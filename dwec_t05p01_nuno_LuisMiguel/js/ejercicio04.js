document.addEventListener("DOMContentLoaded", () => {
    const inputAlimento = document.getElementById('inputAlimento');
    const btnAdd = document.getElementById('btnAdd');
    const btnDelete = document.getElementById('btnDelete');
    const btnList = document.getElementById('btnList');
    const lista = document.getElementById('listaAlimentos');

    function actualizarBotonOrdenar() {
        btnList.disabled = lista.children.length <= 1;
    }

    btnAdd.addEventListener('click', () => {
        const alimento = inputAlimento.value.trim();
        if (alimento !== '') {
            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.textContent = alimento;
            lista.appendChild(item);
            inputAlimento.value = '';
            actualizarBotonOrdenar();
        }
    });

    btnDelete.addEventListener('click', () => {
        const alimento = inputAlimento.value.trim();
        if (alimento !== '') {
            const items = lista.children;
            for (let i = 0; i < items.length; i++) {
                if (items[i].textContent === alimento) {
                    lista.removeChild(items[i]);
                    inputAlimento.value = '';
                    actualizarBotonOrdenar();
                    break;
                }
            }
        }
    });

    btnList.addEventListener('click', () => {
        const items = Array.from(lista.children);
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
        lista.innerHTML = '';
        items.forEach(item => lista.appendChild(item));
    });
});