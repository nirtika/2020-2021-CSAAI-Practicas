console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al boton
const grises = document.getElementById('grises');
const color = document.getElementById('color');
//-- Acceso al deslizador
const deslizadorrojo = document.getElementById('deslizadorrojo');
const deslizadorverde = document.getElementById('deslizadorverde');
const deslizadorazul = document.getElementById('deslizadorazul');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};


color.onclick = () =>{
    deslizadorrojo.value = 255;
    deslizadorverde.value = 255;
    deslizadorazul.value = 255;
    ctx.drawImage(img, 0,0);
    //-- Funcion de retrollamada del deslizador
    deslizadorrojo.oninput = () => {
        //-- Mostrar el nuevo valor del deslizador
        range_value_rojo.innerHTML = deslizadorrojo.value;
        

        //-- Situar la imagen original en el canvas
        //-- No se han hecho manipulaciones todavia
        ctx.drawImage(img, 0,0);

        //-- Obtener la imagen del canvas en pixeles
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //-- Obtener el array con todos los píxeles
        let data = imgData.data

        //-- Obtener el umbral de rojo del desliador
        umbral = deslizadorrojo.value

        //-- Filtrar la imagen según el nuevo umbral
        for (let i = 0; i < data.length; i+=4) {
            if (data[i] > umbral)
            data[i] = umbral;
        }

        //-- Poner la imagen modificada en el canvas
        ctx.putImageData(imgData, 0, 0);
    }
    deslizadorverde.oninput = () =>{
        range_value_verde.innerHTML = deslizadorverde.value;
        //-- Situar la imagen original en el canvas
        //-- No se han hecho manipulaciones todavia
        ctx.drawImage(img, 0,0);

        //-- Obtener la imagen del canvas en pixeles
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //-- Obtener el array con todos los píxeles
        let data = imgData.data

        //-- Obtener el umbral de rojo del desliador
        umbral = deslizadorverde.value

        //-- Filtrar la imagen según el nuevo umbral
        for (let i = 0; i < data.length; i+=4) {
            if (data[i] > umbral)
            data[i] = umbral;
        }

        //-- Poner la imagen modificada en el canvas
        ctx.putImageData(imgData, 0, 0);
    }
  
    deslizadorazul.oninput = () =>{
        range_value_azul.innerHTML = deslizadorazul.value;
        //-- Situar la imagen original en el canvas
        //-- No se han hecho manipulaciones todavia
        ctx.drawImage(img, 0,0);

        //-- Obtener la imagen del canvas en pixeles
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //-- Obtener el array con todos los píxeles
        let data = imgData.data

        //-- Obtener el umbral de rojo del desliador
        umbral = deslizadorazul.value

        //-- Filtrar la imagen según el nuevo umbral
        for (let i = 0; i < data.length; i+=4) {
            if (data[i] > umbral)
            data[i] = umbral;
        }

        //-- Poner la imagen modificada en el canvas
        ctx.putImageData(imgData, 0, 0);
    }
}
// filtro grises
function filtroGrises(){
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

grises.onclick = () =>{
    filtroGrises();
}

console.log("Fin...");