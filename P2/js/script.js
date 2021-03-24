console.log("Ejecutando JS...");

//-- Elementos de la interfaz de la calculadora
const display = document.getElementById("display_digitos")
const display_res= document.getElementById("display_resultado")
const igual = document.getElementById("igual")
const clear = document.getElementById("clear")
const reset = document.getElementById("reset")
const ans = document.getElementById("ans");

// todos los 'digits' que hay en el html
let digitos = document.getElementsByClassName("digits")

for(i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    digito(ev.target) // ev=evento, ev.target=me da el valor del boton que ha sido pulsado
  }
}

function digito(boton){
  if (display.innerHTML=="0"){
    display.innerHTML+=boton.innerHTML;
  } else{
    display.innerHTML += boton.innerHTML;
    display_res.innerHTML ='';
  }
}

var ans_2 =ans.value; // valor de ans

// calcular
igual.onclick = () => {
  resultado = eval(display.innerHTML.replace(/π/g, 'Math.PI').replace(/÷/g,'/'));
  display_res.innerHTML = resultado;
  ans_2= resultado;  
}

//-- limpiar (boton AC)
reset.onclick = () => {
  display.innerHTML = "";
  display_res.innerHTML=""
}

//-- borrar (boton C)
clear.onclick = () => {
  display.innerHTML= display.innerHTML.slice(0, -1);
  display_res.innerHTML="";
}

//-- boton ans
ans.onclick = () =>{
  if( ans_2 != 'ans'){
    display.innerHTML = ans_2;
    display_res.innerHTML="";
  }
}

// mostrar syntax error
window.onerror = function() {
  //alert('Syntax Error');
  display_res.innerHTML="Syntax Error"
  return true;
}
