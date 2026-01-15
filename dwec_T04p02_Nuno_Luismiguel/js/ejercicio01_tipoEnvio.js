class TipoEnvio {
    #nombre;
    #diasMaximoEntrega;
    #pesoMaximo;
    #precio;

    constructor(nombre, diasMaximoEntrega, pesoMaximo, precio) {
        this.nombre = nombre;
        this.diasMaximoEntrega = diasMaximoEntrega;
        this.pesoMaximo = pesoMaximo;
        this.precio = precio;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        if (!Util.validarTitulo(valor)) {
            throw new Error("El nombre debe ser una cadena válida.");
        }
        this.#nombre = valor.trim();
    }

    get diasMaximoEntrega() {
        return this.#diasMaximoEntrega;
    }

    set diasMaximoEntrega(valor) {
        if (!Util.validarDiasEnvio(valor)) {
            throw new Error("Los días de entrega deben ser un número positivo mayor que 0.");
        }
        this.#diasMaximoEntrega = Number(valor);
    }

    get pesoMaximo() {
        return this.#pesoMaximo;
    }

    set pesoMaximo(valor) {
        if (!Util.validarPeso(valor)) {
            throw new Error("El peso máximo debe ser un número positivo mayor que 0.");
        }
        this.#pesoMaximo = Number(valor);
    }

    get precio() {
        return this.#precio;
    }

    set precio(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("El precio debe ser un número positivo mayor que 0.");
        }
        this.#precio = Number(valor);
    }

    mostrarDatosTipoEnvio() {
        return `Nombre: ${this.#nombre} | Días máximo: ${this.#diasMaximoEntrega} | Peso máximo: ${this.#pesoMaximo}g | Precio: ${this.#precio.toFixed(2)}€`;
    }
}