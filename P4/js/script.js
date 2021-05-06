//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const imgs = document.getElementsByClassName('imagesrc');
const ctx = canvas.getContext('2d');
//-- Acceso al boton
const color = document.getElementById('color');
const grises = document.getElementById('gris');
const noise = document.getElementById('Noise');
const bright = document.getElementById('bright');
const contrast = document.getElementById('contrast');
const invert = document.getElementById('invert');
const saturate = document.getElementById('saturate');
const negative = document.getElementById('negativo');

//-- Acceso al deslizador
const deslizadorrojo = document.getElementById('deslizadorrojo');
const deslizadorverde = document.getElementById('deslizadorverde');
const deslizadorazul = document.getElementById('deslizadorazul');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');

ctx.font = "25px Arial";
ctx.textAlign = 'center';
ctx.fillStyle = '#FFFFFF';
ctx.fillText("Selecciona una imagen", canvas.width/2, canvas.height/2);

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
    document.getElementById('umbralRGB').classList.toggle("hide");
}
//gris on click
gris.onclick = () =>{
    document.getElementById('umbralRGB').classList.add('hide');
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    //-- Calcular el brillo para CADA PIXEL y ponerselo por igual a cada componente
    for (var i = 0; i < data.length; i+=4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      brillo = (3 * r + 4 * g + b)/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
}

//negativo
negative.onclick = () => {
    ctx.drawImage(img, 0,0);
    
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
          data[i] = 255 - data[i]
          data[i+1] = 255 - data[i+1]
          data[i+2] = 255 - data[i+2]
    }
    ctx.putImageData(imgData, 0, 0);
}

//invert
invert.onclick =()=>{
    ctx.translate(0, canvas.height)
    ctx.scale(1,-1);
    ctx.drawImage(img, 0, 0);
}
//