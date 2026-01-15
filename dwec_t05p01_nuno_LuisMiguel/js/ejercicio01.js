function limpiarColores(main) {
    main.classList.remove('bg-danger', 'bg-primary', 'bg-success');
}

function pulsarBotonRojo(main){
    limpiarColores(main);         
    main.classList.add('bg-danger'); 
}

document.addEventListener("DOMContentLoaded", () => {
    const btnRojo = document.getElementById('btnRojo');
    const btnAzul = document.getElementById('btnAzul');
    const btnVerde = document.getElementById('btnVerde');
    const main = document.querySelector('main');

    btnRojo.addEventListener('click', () => {
        pulsarBotonRojo(main);
    });

    btnAzul.addEventListener('click', () => {
        limpiarColores(main);
        main.classList.add('bg-primary');
    });

    btnVerde.addEventListener('click', () => {
        limpiarColores(main);
        main.classList.add('bg-success');
    });
});