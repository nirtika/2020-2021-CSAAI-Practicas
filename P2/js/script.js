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
    display.innerHTML=boton.innerHTML;
  } else{
    display.innerHTML += boton.innerHTML;
    display_res.innerHTML ='';
  }
  console.log(boton.value)
}

// hacer operaciones
igual.onclick = () => {
  display_res.innerHTML = eval(display.innerHTML.replace(/π/g, 'Math.PI'));
}

//-- limpiar (boton AC)
reset.onclick = () => {
  display.innerHTML = "";
  display_res.innerHTML=""
}
//-- borrar (boton C)
clear.onclick = () => {
  display.innerHTML= display.innerHTML.slice(0, -1);
}

