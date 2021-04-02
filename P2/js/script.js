console.log("Ejecutando JS...");
//-- Elementos de la interfaz de la calculadora
const display = document.getElementById("display_res")
const display_res= document.getElementById("display_err")
const igual = document.getElementById("igual")
const reset = document.getElementById("reset")
const clear = document.getElementById("clear")
const punto = document.getElementById("punto")
const ans = document.getElementById("ans")
const porcentaje = document.getElementById('porcentaje')
const factorial = document.getElementById('fact')
const ln = document.getElementById('ln')
const log = document.getElementById('log')
const abs = document.getElementById('abs')
const pow_2 = document.getElementById('power_2')
const ex = document.getElementById('ex')
const camb_signo = document.getElementById('cambiar_signo')
const inv = document.getElementById('inv')
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

//-- Calculos
igual.onclick = () => {
  display_res.innerHTML=display.innerHTML
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
    resultado = eval(display.innerHTML.replace('π', 'Math.PI').replace('^','**'))
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
    display_res.innerHTML=""
    
}
  
//-- Borra el ultimo digito(C)
clear.onclick = () => {
  display.innerHTML= display.innerHTML.slice(0, -1);
  display_res.innerHTML="";
  
}

//-- boton ans
ans.onclick = () =>{
  if(estado != ESTADO.INIT){
    display.innerHTML += resultado;
    estado = ESTADO.OP1;
  }
}

//porcentaje
porcentaje.onclick =() =>{  
  display.innerHTML += porcentaje.value
  //estado == ESTADO.OP1
}

//raiz cuadrada
document.getElementById('raiz').onclick =() =>{  
  display_res.innerHTML= '&Sqrt;'.concat(display.innerHTML)
  resultado= Math.sqrt(display.innerHTML);
  display.innerHTML=resultado
}
//raiz cubica
document.getElementById('raiz_cub').onclick =() =>{  
  display_res.innerHTML= '&#8731;'.concat(display.innerHTML)
  resultado= Math.cbrt(display.innerHTML);
  display.innerHTML=resultado
}

//seno
sin.onclick =()=>{
  display_res.innerHTML = 'sin ('.concat(display.innerHTML).concat(')')
  var valor_disp = eval(display.innerHTML.replace('π', '*Math.PI'))
  resultado_sin= valor_disp * Math.PI/180
  resultado = Math.sin(resultado_sin)
  display.innerHTML= resultado
}

//coseno
cos.onclick =()=>{
  display_res.innerHTML = 'cos ('.concat(display.innerHTML).concat(')')
  var valor_disp_cos = eval(display.innerHTML.replace('π', '*Math.PI'))
  resultado_coseno= valor_disp_cos* Math.PI/180
  resultado = Math.cos(resultado_coseno)
  display.innerHTML= resultado
}

//tan
tan.onclick =()=>{
  display_res.innerHTML = 'tan('.concat(display.innerHTML).concat(')')
  var valor_disp = eval(display.innerHTML.replace('π', '*Math.PI'))
  resultado_tan= valor_disp * Math.PI / 180;
  resultado = Math.tan(resultado_tan);
  display.innerHTML= resultado
}

//factorial
factorial.onclick =()=>{
  var dato = display.innerHTML;
  let x = 1;
  for(let i = dato; i>0; i--){
      x *= i;
      resultado = x
      display.innerHTML= resultado
  }
  display_res.innerHTML= dato.concat('!')
}

//ln
ln.onclick =()=>{
  display_res.innerHTML = 'ln ('.concat(display.innerHTML).concat(')')
  resultado = Math.log(display.innerHTML)
  display.innerHTML= resultado
  //console.log(resultado)
}

//log
log.onclick =()=>{
  display_res.innerHTML = 'log ('.concat(display.innerHTML).concat(')')
  resultado = Math.log10(display.innerHTML)
  display.innerHTML= resultado
}

// abs
abs.onclick =()=>{
  resultado = Math.abs(display.innerHTML)
  display.innerHTML= resultado
}

// x^2
pow_2.onclick =()=>{
  display_res.innerHTML= display.innerHTML.concat('<sup>2</sup>')
  resultado = Math.pow(display.innerHTML,2)
  display.innerHTML= resultado
}

//e^x
ex.onclick =()=>{
  display_res.innerHTML= ('e<sup>').concat(display.innerHTML).concat('</sup>')
  resultado = Math.exp(display.innerHTML)
  display.innerHTML= resultado
}

//cambio de signo
camb_signo.onclick =()=>{
  var num = Math.sign(display.innerHTML)
  if(num ==1){
    display.innerHTML= - display.innerHTML
  }else{
    display.innerHTML= display.innerHTML*-1
  }
}

//inv
inv.onclick =()=>{
  var num = display.innerHTML
  display_res.innerHTML= num.concat('<sup>-1</sup>')
  resultado = (1/num)
  display.innerHTML= resultado
}

//mostrar syntax error
window.onerror = function() {
    //alert('Syntax Error');
    display_res.innerHTML="Syntax Error"
    return true;
}

//tabs
document.getElementById('basic').onclick= () =>{
    document.getElementById('sci').classList.add('hide')
    reset.onclick()
    estado= ESTADO.INIT
}
document.getElementById('scientific').onclick= () =>{
  document.getElementById('sci').classList.remove('hide')
  reset.onclick()  
  estado= ESTADO.INIT
}
