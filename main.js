const botonesNumero = document.getElementsByName("data-number");
const botonesOpera = document.getElementsByName("data-opera");
const botonIgual = document.getElementsByName("data-igual");
const botonBorrar = document.getElementsByName("data-clear");
const botonBorrarTodo = document.getElementsByName("data-all-clear");
const botonSigno = document.getElementsByName("data-signo");
const verOperacion = document.getElementById("operacion");
const verResultado = document.getElementById("resultado");

const calculadora = new Calculadora(verOperacion, verResultado);

function actualizarValores() {
    calculadora.calcular();
    calculadora.refrescarPantalla();
}

botonesNumero.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.agregarNumero(boton.innerText);
    });
})

botonesOpera.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.agregarOpera(boton.innerText);
        actualizarValores();
    });
})

botonIgual.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.pulsarIgual();
    })
})

botonBorrar.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.borrar();
    })
})

botonBorrarTodo.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.borrarTodo();
    })
})

/*botonSigno.forEach(boton => {
    boton.addEventListener("click", function() {
        calculadora.cambiarSigno();
    })
})*/




