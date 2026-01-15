document.addEventListener("DOMContentLoaded", () => {
    const zonaParrafos = document.getElementById('zonaParrafos');

    zonaParrafos.addEventListener('click', (event) => {
        if (event.target.tagName === 'P') {
            event.target.innerText = event.target.innerText.toUpperCase();
            event.target.classList.add('bg-warning');

            setTimeout(() => {
                event.target.classList.remove('bg-warning');
            }, 500);
        }
    });

    zonaParrafos.addEventListener('dblclick', (event) => {
        if(event.target.tagName === 'P') {
            event.target.innerText = event.target.innerText.toLowerCase();
            event.target.classList.add('bg-warning');
        
            setTimeout(() => {
                event.target.classList.remove(' bg-warning');
            }, 500);
        }
    });
});