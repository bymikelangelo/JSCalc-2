class Calculadora {
    //recibe las etuiquetas el index que corresponden a la pantalla
    constructor(verOperacion, verResultado) {
        this.verOperacion = verOperacion;
        this.verResultado = verResultado;
        this.operacion = "";  //operacion que recibira eval()
        this.resultado = "";  //recibe el resultado de eval()
        this.numeroActual = "";  //utilizamos la variable para comprobar si el numero tecleado es correcto
        this.finOperacion = false;  //indica si se ha terminado una operacion aritmetica. Se iguala a true al pulsar igual y ser valida la expresion
        this.findError = false;  //si eval() devuelve error se iguala a true y permite mostrar syntaxError en resultado
        this.lastBoton = ["numero", "suma", "resta", "mult", "div", "percent", "potencia", "raiz"];

        //falla al calcular potencia o porcentaje de un numero compuesto por parentesis
    } 
    
    //añade el numero (o parentesis o punto) a la variable operacion.
    agregarNumero(numero) {
        if (this.finOperacion == true) {  //entra si acaba de terminar una operacion al pulsar igual
            this.operacion = "";
            this.finOperacion = false;
        }
        if (numero === ".") {  //filtra si el punto es valido en la expresion
            if (this.operacion === "" || this.numeroActual === "") {
                this.numeroActual = "0" + numero;
                this.operacion = this.operacion + "0" + numero;
            }
            else if (this.numeroActual.includes(".")) {
                return
            }
            else {
                this.numeroActual = this.numeroActual.toString() + numero;
                this.operacion = this.operacion.toString() + numero;
            }
        }
        else if (numero === "(") {  //añade el parentesis de apertura
            if (this.operacion.charCodeAt(this.operacion.length-1) >= 48 && this.operacion.charCodeAt(this.operacion.length-1) <= 57) {
                this.operacion = this.operacion + "*(";
            }
            else {
                this.operacion = this.operacion + "("
            }
        }
        else {  //entra para valores numericos o parentesis de cierre
            this.numeroActual = this.numeroActual.toString() + numero;
            this.operacion = this.operacion.toString() + numero;
        }
        this.calcular();
        this.refrescarPantalla();
    }

    //añade el signo de operacion a la expresion aritmetica
    agregarOpera(opera) {
        if (this.finOperacion == true) {  //entra al pulsar igual. Permite concatenar otra operacion con el resultado anterior.
            this.operacion = this.resultado.toString();
            //this.numeroActual = this.resultado.toString();  //solo lo utilizariamos en el caso de usar "numeroActual" al pulsar la potencia o porcentaje
            this.resultado = "";
            this.finOperacion = false;
        }
        /*
        En la mayoria de casos el programa comprueba el ultimo valor de "this.operacion" para permitir la entrada del signo.
        Si el signo es válido y se coloca en la expresion, "numeroActual" se reinicia a cadena vacia.
        */
        switch (opera) {
            //sumar
            case "+":  
                if (this.operacion.charAt(this.operacion.length-1) == "-") {
                    this.operacion = this.operacion.toString().slice(0, -1);
                    this.operacion = this.operacion + "+";
                    this.numeroActual = "";
                }
                else if (this.operacion.charAt(this.operacion.length-1) == "+") {
                    return
                }
                else {
                    this.operacion = this.operacion + "+";
                    this.numeroActual = "";
                }
                break;
            //resta
            case "-":  
                if (this.operacion.charAt(this.operacion.length-1) == "-") {
                    return;
                }
                else if (this.operacion.charAt(this.operacion.length-1) == "+") {
                    this.operacion = this.operacion.toString().slice(0, -1);
                    this.operacion = this.operacion + "-";
                    this.numeroActual = "";
                }
                else {
                    this.operacion = this.operacion + "-";
                    this.numeroActual = "";
                }
                break;
            //multiplicar
            case "×":  
                if (this.operacion === "") {
                    return;
                }
                else {
                    if (this.operacion.charAt(this.operacion.length-1) === "*") {
                        return;
                    }
                    else if (this.operacion.charAt(this.operacion.length-1) == "/") {
                        this.operacion = this.operacion.toString().slice(0, -1);
                        this.operacion = this.operacion + "*";
                        this.numeroActual = "";
                    }
                    else {
                        this.operacion = this.operacion + "*";
                        this.numeroActual = "";
                    }
                }
                break;
            //dividir
            case "÷":  
                if (this.operacion === "") {
                    return;
                }
                else {
                    if (this.operacion.charAt(this.operacion.length-1) == "*") {
                        this.operacion = this.operacion.toString().slice(0, -1);
                        this.operacion = this.operacion + "/";
                        this.numeroActual = "";
                    }
                    else if (this.operacion.charAt(this.operacion.length-1) == "/") {
                        return;
                    }
                    else {
                        this.operacion = this.operacion + "/";
                        this.numeroActual = "";
                    }
                }
                break;
            //porcentaje
            case "%":  
                if (this.operacion === "") {
                    return
                }
                else {
                    if ((this.operacion.charCodeAt(this.operacion.length-1) >= 48 && this.operacion.charCodeAt(this.operacion.length-1) <= 57) || this.operacion.charCodeAt(this.operacion.length-1) === 41) {
                        //el siguiente fragmento de codigo no se utiliza pues da problemas al hacer porcentajes de operaciones con parentesis tipo (3+5)*(48/100)
                        /*
                        this.operacion = this.operacion.slice(0, -this.numeroActual.length);
                        this.operacion = this.operacion + "(" + this.numeroActual + "/100)*";
                        */
                        this.operacion = this.operacion + "*(1/100)*";
                        this.numeroActual = "";
                    }
                    else if (this.operacion.charAt(this.operacion.length-1) === "*") {
                        this.operacion = this.operacion + "(1/100)*";
                    }
                    else {
                        return;
                    }
                }
                break;
            //raiz cuadrada
            case "√":  
                if ((this.operacion.charCodeAt(this.operacion.length-1) >= 48 && this.operacion.charCodeAt(this.operacion.length-1) <= 57) || this.operacion.charCodeAt(this.operacion.length-1) === 41) {
                    this.operacion = this.operacion + "*Math.sqrt(";
                    this.numeroActual = "";
                }
                else {
                    this.operacion = this.operacion + "Math.sqrt("
                    this.numeroActual = "";
                }
                break;
            //potencia
            case "^": 
                if ((this.operacion.charCodeAt(this.operacion.length-1) >= 48 && this.operacion.charCodeAt(this.operacion.length-1) <= 57) || this.operacion.charCodeAt(this.operacion.length-1) === 41) {
                    //el siguiente fragmento de codigo no se utiliza pues da problemas al elevar operaciones con parentesis tipo (3+5)**(48/100)
                    /*
                    this.operacion = this.operacion.slice(0, -this.numeroActual.length);
                    this.operacion = this.operacion + "Math.pow(" + this.numeroActual + ", ";  //da problemas al concatenar con raices
                    //this.operacion = this.operacion + "(" + this.numeroActual + "**"; 
                    */
                    this.operacion = this.operacion + "**";  
                    this.numeroActual = "";
                }
                else {
                    return;
                }
                break;
            default:
                return;
        }
        this.calcular();
        this.refrescarPantalla();
    }

    //reinicia la operacion. Guarda el resultado de la operacion anterior para concatenar operaciones. Si se pulsa otro numero, se empieza una nueva operacion de 0.
    pulsarIgual() {
        if (this.findError === true) {
            this.resultado = "syntaxError"
        }
        else {
            this.finOperacion = true;
        }
        this.verOperacion.textContent = this.operacion.toString(); 
        this.verResultado.innerHTML = "<h3>" + this.resultado + "</h3>";
    }

    //solo si el boton +- esta habilitado. Codigo no utilizado.
    /*
    cambiarSigno() {
        this.operacion = this.operacion * (-1);
        this.refrescarPantalla();
    }
    */

    //borra el ultimo caracter de la expresion
    borrar() {
        this.finOperacion = false;
        if (this.operacion === "") {  //si la expresion ya es vacia reinicia la calculadora
            this.borrarTodo();
        }
        else {
            this.operacion = this.operacion.slice(0, -1);
            this.numeroActual = this.numeroActual.slice(0, -1);
            this.calcular();
            this.refrescarPantalla();
        }
    }

    //reinicia todos los valores de la calculadora.
    borrarTodo() {
        this.operacion = "";
        this.resultado = "";
        this.numeroActual = "";
        this.finOperacion = false; 
        this.findError = false; 
        this.refrescarPantalla();
    }

    //llama a la funcion eval() para calcular la expresion guardada en "this.operacion". Gracias a esto permite obtener el resultado en tiempo real.
    calcular() {
        try {
            if (this.operacion === "") {  //evita llamar a eval() con cadena vacia, pues devuelve undefined
                this.resultado = "";
            }
            else {
                //eval("") devuelve 'undefined' y no error, por lo que es necesario volver a definir la variable.
                var calculo = eval(this.operacion.toString());
                this.findError = false;
                this.resultado = calculo;
            }
        }
        catch (syntaxError) {  //captura el error. La variable "this.resultado" no se actualiza mostrando el ultimo resultado valido
            this.findError = true;
            console.log("syntaxError");
            this.resultado = this.resultado;
        }
    }

    //funcion que refresca la pantalla de la calculadora. Es llamada por todas las demas funciones.
    refrescarPantalla() {
        try {
            this.verOperacion.textContent = this.operacion.toString(); 
            this.verResultado.textContent = this.resultado.toString();
        }
        catch (typeError) {  //captura el error si la variable resuldadoo es undefined.
            console.log("typeError");
            this.resultado = ""
        }

    }
}