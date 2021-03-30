console.log("Ejecutando JS...");
//-- Elementos de la interfaz de la calculadora
const display = document.getElementById("display_res")
const display_err= document.getElementById("display_err")
const igual = document.getElementById("igual")
const reset = document.getElementById("reset")
const clear = document.getElementById("clear")
const punto = document.getElementById("punto")
const ans = document.getElementById("ans")

// todos los 'digits' que hay en el html
let digitos = document.getElementsByClassName("digits")
//-- array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operaciones")

var resultado; // valor de resultado

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
    comprobarcoma: false,
  }

//--Variable del estados
let estado = ESTADO.INIT;

//-- el array de los digitos
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev)=> {
    digito(ev.target.value); // ev=evento, ev.target da el valor del boton que ha sido pulsado
  }
}

//-- el array de los operadores: sumar, restar, multiplicar, dividir,
for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    if(estado == ESTADO.OP1){
      display.innerHTML += ev.target.value;
      estado = ESTADO.OPERATION;
      ESTADO.comprobarcoma = true;
    }
  }
}

function digito(boton) {
  if(estado == ESTADO.INIT) {
      display.innerHTML = boton;
      estado = ESTADO.OP1;
    }else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
      display.innerHTML += boton;
      if (estado == ESTADO.OPERATION) {
        estado = ESTADO.OP2;
        ESTADO.comprobarcoma = false;
      }
    }
  }
const porcentaje = document.getElementById('porcentaje')
porcentaje.onclick =() =>{
    estado == ESTADO.OP1
    display.innerHTML+= porcentaje.value;
}

//-- Calculos
igual.onclick = () => {
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
    resultado = eval(display.innerHTML.replace('π', 'Math.PI').replace('%','*0.01'));
    display.innerHTML = resultado
    estado = ESTADO.OP1;
  }
}

//-- evitar dos comas seguidas
punto.onclick = (ev) => {
    if(ESTADO.comprobarcoma){
      console.log("Error dos comas");
    }else{
      display.innerHTML += ev.target.value;
      ESTADO.comprobarcoma = true;
    }
  }


//-- limpiar (boton AC)
reset.onclick = () => {
    display.innerHTML = "";
    display_err.innerHTML=""
    estado = ESTADO.INIT
}
  
//-- Borra el ultimo digito(C)
clear.onclick = () => {
    display.innerHTML= display.innerHTML.slice(0, -1);
    display_err.innerHTML="";
}

//-- boton ans
ans.onclick = () =>{
  if(estado != ESTADO.INIT){
    display.innerHTML += resultado;
    estado = ESTADO.OP1;
  }
}
  
  // mostrar syntax error
window.onerror = function() {
    //alert('Syntax Error');
    display_err.innerHTML="Syntax Error"
    return true;
}
