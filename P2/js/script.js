console.log("Ejecutando JS...");

//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display_digitos")
display_res= document.getElementById("display_resultado")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicar = document.getElementById("multiplicar")
dividir = document.getElementById("dividir")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
reset = document.getElementById("reset")

let digitos = document.getElementsByClassName("digits")


for(i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{  //digitos[i] es el boton
    digito(ev.target) // ev=evento, ev.target=me da el valor del boton que ha sido pulsado
  }
}

function digito(boton){
  if (display.innerHTML=="0"){
    display.innerHTML=boton.value;

  } else{
    display.innerHTML += boton.value;
    display_res.innerHTML ='1';
  }
}
