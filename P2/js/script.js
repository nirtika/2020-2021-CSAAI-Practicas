console.log("Ejecutando JS...");
//-- Elementos de la interfaz de la calculadora
const display = document.getElementById("display_res")
const display_err= document.getElementById("display_err")
const igual = document.getElementById("igual")
const reset = document.getElementById("reset")
const clear = document.getElementById("clear")
const punto = document.getElementById("punto")
const ans = document.getElementById("ans")
const porcentaje = document.getElementById('porcentaje');
// todos los 'digits' que hay en el html
let digitos = document.getElementsByClassName("digits")
//-- array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operaciones")

var resultado; // valor de resultado

const sin =document.getElementById('sin');
const cos =document.getElementById('cos');
const tan =document.getElementById('tan');
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
    sin.disabled = false;
    cos.disabled = false;
    tan.disabled= false;
    digito(ev.target.value); // ev=evento, ev.target da el valor del boton que ha sido pulsado
  }
}

//-- el array de los operadores: sumar, restar, multiplicar, dividir,
for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    sin.disabled = false;
    cos.disabled = false;
    tan.disabled= false;
    if(estado == ESTADO.OP1){
      display.innerHTML += ev.target.value;
      estado = ESTADO.OPERATION;
      ESTADO.comprobarcoma = true;
    }
  }
}
if(display.innerHTML =="" && display_err.innerHTML==""){
  sin.disabled = true;
  cos.disabled = true;
  tan.disabled = true;
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
porcentaje.onclick =() =>{
    estado == ESTADO.OP1
    display.innerHTML+= porcentaje.value;
    ESTADO.seno = false;
}

document.getElementById('raiz').onclick =() =>{
  resultado= Math.sqrt(display.innerHTML);
  display.innerHTML=resultado
  
  
}

sin.onclick =()=>{
    display.innerHTML = 'sin ('.concat(display.innerHTML).concat(')')
    var valor_disp = display.innerHTML;
    resultado_seno = valor_disp.replace( /(^.*\[|\].*$)/g, '' );
    resultado_sin= valor_disp * Math.PI/180;
    resultado = Math.sin(resultado_seno);
}
cos.onclick =()=>{
  display.innerHTML = 'Math.cos ('.concat(display.innerHTML).concat(')')
  var valor_disp_cos = display.innerHTML;
  resultado_coseno = valor_disp_cos.replace( ')', '' ).replace('(', '' ).replace('cos','');
  resultado_coseno= valor_disp_cos* Math.PI/180;
  resultado = Math.cos(resultado_coseno);
  alert(valor_disp_cos)
  //display.innerHTML=Math.cos(display.innerHTML * Math.PI/180 )
}
tan.onclick =()=>{
  display.innerHTML = 'tan('.concat(display.innerHTML).concat(')')
  var valor_disp = display.innerHTML;
  resultado_seno = valor_disp.replace( /(^.*\[|\].*$)/g, '' );
  resultado_sin= valor_disp * Math.PI / 180;
  resultado = Math.tan(resultado_sin);
}

//-- Calculos
igual.onclick = () => {
  sin.disabled = true;
  cos.disabled = true;
  tan.disabled = true;
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
    resultado = eval(display.innerHTML.replace('π', 'Math.PI').replace('%','*0.01').replace('^','**').replace('tan','Math.tan').replace('sin','Math.sin'));
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
    sin.disabled = true;
    cos.disabled = true;
    tan.disabled = true;
}
  
//-- Borra el ultimo digito(C)
clear.onclick = () => {
  display.innerHTML= display.innerHTML.slice(0, -1);
  display_err.innerHTML="";
  sin.disabled = true;
  cos.disabled = true;
  tan.disabled = true;
}

//-- boton ans
ans.onclick = () =>{
  sin.disabled = false;
  cos.disabled = false;
  tan.disabled = false;
  if(estado != ESTADO.INIT){
    display.innerHTML += resultado;
    //estado = ESTADO.OP1;
  }
}


  // mostrar syntax error
  /*window.onerror = function() {
    //alert('Syntax Error');
    display_err.innerHTML="Syntax Error"
    return true;
}*/

//tabs
document.getElementById('normal').onclick= () =>{
    document.getElementById('sci').classList.add('hide')
}
document.getElementById('scientific').onclick= () =>{
  document.getElementById('sci').classList.remove('hide')
}
