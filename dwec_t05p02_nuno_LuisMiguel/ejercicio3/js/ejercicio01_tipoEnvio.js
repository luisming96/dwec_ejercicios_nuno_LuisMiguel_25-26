class TipoEnvio {
    #nombre;
    #diasMaximo;
    #pesoMaximo;
    #precio;

    constructor(nombre, diasMaximo, precio) {
        this.nombre = nombre;
        this.diasMaximo = diasMaximo;
        this.#pesoMaximo = 0;
        this.precio = precio;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (Util.validarNombrePedido(nombre)) {
            this.#nombre = nombre;
        }
    }

    get diasMaximo() {
        return this.#diasMaximo;
    }

    set diasMaximo(dias) {
        if (Util.validarDiasEnvio(dias)) {
            this.#diasMaximo = dias;
        }
    }

    get pesoMaximo() {
        return this.#pesoMaximo;
    }

    set pesoMaximo(peso) {
        if (Util.validarPeso(peso)) {
            this.#pesoMaximo = peso;
        }
    }

    get precio() {
        return this.#precio;
    }

    set precio(precio) {
        if (Util.validarReal(precio)) {
            this.#precio = precio;
        }
    }

    mostrarDatosTipoEnvio() {
        return `${this.#nombre} - Entrega máxima: ${this.#diasMaximo} días - Precio: ${this.#precio}€`;
    }
}