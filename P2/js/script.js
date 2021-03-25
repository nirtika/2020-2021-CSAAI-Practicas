//-- Elementos de la interfaz de la calculadora
const display = document.getElementById("display_res")
const igual = document.getElementById("igual")
const reset = document.getElementById("reset")
const clear = document.getElementById("clear")
const punto = document.getElementById("punto");
const display_err= document.getElementById("display_err")
const ans = document.getElementById("ans");
// todos los 'digits' que hay en el html
let digitos = document.getElementsByClassName("digits")
//-- array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operaciones"); 

var ans_2 =ans.value; // valor de ans
//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
  }

//--Variable del estados
let estado = ESTADO.INIT;

//-- el array de los digitos
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev)=> {
    digito(ev.target.value); // ev=evento, ev.target da el valor del boton que ha sido pulsado
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
      }
    }
  }

//-- el array de los operadores: sumar, restar, multiplicar, dividir,
for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    if(estado == ESTADO.OP1){
           display.innerHTML += ev.target.value;
           estado = ESTADO.OPERATION;
    }
  }
}

//-- Calculos
igual.onclick = () => {
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
      resultado = eval(display.innerHTML.replace('π', 'Math.PI'));
      display.innerHTML = resultado
      estado = ESTADO.OP1;
      ans_2 = resultado;
  }
}


//-- limpiar (boton AC)
reset.onclick = () => {
    display.innerHTML = "";
    display_err.innerHTML=""
}
  
//-- /-- Borra el ultimo digito(C)
clear.onclick = () => {
    display.innerHTML= display.innerHTML.slice(0, -1);
    display_err.innerHTML="";
}


  //-- boton ans
ans.onclick = () =>{
    if( ans_2 != 'ans'){
      display.innerHTML = ans_2;
    }
}
  
  // mostrar syntax error
window.onerror = function() {
    //alert('Syntax Error');
    display_err.innerHTML="Syntax Error"
    return true;
}
