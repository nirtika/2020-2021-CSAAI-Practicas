//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const imgs = document.getElementsByClassName('imagesrc');
const ctx = canvas.getContext('2d');
//-- Acceso al boton
const color = document.getElementById('color');
const grises = document.getElementById('gris');
const blur = document.getElementById('blur');
const bright = document.getElementById('bright');
const contrast = document.getElementById('contrast');
const invert = document.getElementById('invert');
const saturate = document.getElementById('saturate');
const sepia = document.getElementById('sepia');

//-- Acceso al deslizador
const deslizadorrojo = document.getElementById('deslizadorrojo');
const deslizadorverde = document.getElementById('deslizadorverde');
const deslizadorazul = document.getElementById('deslizadorazul');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');


let img = [];
function imgsel(){ //seleccionar y poner imagen en canvas
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = (ev) => {
          img = ev.target;
          canvas.width = img.width;
          canvas.height = img.height;      
          ctx.drawImage(img, 0,0);
        }
    }
}
imgsel();
    
function rgb(){
        //-- Mostrar el nuevo valor del deslizador
        range_R.innerHTML = deslizadorrojo.value;
        range_G.innerHTML = deslizadorverde.value;
        range_B.innerHTML = deslizadorazul.value;
    
        //-- Situar la imagen original en el canvas
        //-- No se han hecho manipulaciones todavia
    
        ctx.drawImage(img, 0,0);
    
        //-- Obtener la imagen del canvas en pixeles
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
        //-- Obtener el array con todos los píxeles
        let data = imgData.data
    
        //-- Obtener el umbral de rojo del desliador
        umbral_R = deslizadorrojo.value
        umbral_G = deslizadorverde.value
        umbral_B = deslizadorazul.value
    
        //-- Filtrar la imagen según el nuevo umbral
        for (let i = 0; i < data.length; i+=4) {
          if (data[i] > umbral_R){
            data[i] = umbral_R;
          }
          if (data[i+1] > umbral_G) {
            data[i+1] = umbral_G;
          }
          if (data[i+2] > umbral_B) {
            data[i+2] = umbral_B;
          }
        }
        //-- Poner la imagen modificada en el canvas
        ctx.putImageData(imgData, 0, 0);
}
deslizadorrojo.oninput = () => {
    rgb();
}
deslizadorverde.oninput = () =>{
    rgb();
}
    
deslizadorazul.oninput = () =>{
    rgb();
}
//color on click
color.onclick = () =>{
    document.getElementById('umbralRGB').classList.remove("hide");
}
