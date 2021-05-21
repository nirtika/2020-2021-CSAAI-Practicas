//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const video1 = document.getElementById("video1");
const btn_video1 = document.getElementById("btn_video1");
const video2 = document.getElementById("video2");
const btn_video2 = document.getElementById("btn_video2");
const video3 = document.getElementById("video3");
const btn_video3 = document.getElementById("btn_video3");
const img_stand = document.getElementById("img_test");
const btn_video4 = document.getElementById("btn_video4");
const modo_manual = document.getElementById("btn_src_manual");
const modo_bucle = document.getElementById("btn_src_bucle");
const btn_off= document.getElementById('btn_src_off');
const vol_on= document.getElementById('vol_on');
const vol_off= document.getElementById('vol_off');

let loop; //bucle
// modos
const MODO={
  manual: false,
  bucle:false
}

modo_manual.style.display='none';
modo_bucle.style.display='none';
btn_test.style.display='none';
btn_video1.style.display='none';
btn_video2.style.display='none';
btn_video3.style.display='none';
vol_off.style.display='none'
vol_on.style.display='none'

//-- Establecer las dimensiones de los vídeos
directo.width=480;
directo.height=280;
video1.width=300;  
video1.height=150;
video2.width=300;  
video2.height=150;
video3.width=300;  
video3.height=150;
img_stand.width=300;  
img_stand.height=150;

//-- Imagen de Test usada
const OFF_IMAGE_URL = "img/test.jpg";
const TEST_IMAGE_URL = "img/standby.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = OFF_IMAGE_URL;
video1.poster = OFF_IMAGE_URL;
video2.poster = OFF_IMAGE_URL;
video3.poster = OFF_IMAGE_URL;
img_stand.src = OFF_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
  modo_manual.style.display='';
  modo_bucle.style.display='';
  btn_test.style.display='';
  btn_video1.style.display='';
  btn_video2.style.display='';
  btn_video3.style.display='';
  
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video1.mp4";
  video2.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video2.mp4";
  video3.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video3.mp4";
  img_stand.src=TEST_IMAGE_URL;

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();
  
  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = OFF_IMAGE_URL;
};

//-- Boton de FUENTES-OFF
btn_src_off.onclick = () => {
  modo_manual.style.display='none';
  modo_bucle.style.display='none';
  btn_test.style.display='none';
  btn_video1.style.display='none';
  btn_video2.style.display='none';
  btn_video3.style.display='none';
  video1.src=null;
  video2.src=null;
  video3.src=null;
  directo.src = null;
  directo.poster = OFF_IMAGE_URL;
  video1.poster = OFF_IMAGE_URL;
  video2.poster = OFF_IMAGE_URL;
  video3.poster = OFF_IMAGE_URL;
  img_stand.src = OFF_IMAGE_URL;
}

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

modo_manual.onclick = () => {
  MODO.manual = true;
  MODO.bucle = false;
  window.clearInterval(loop);
};

  //-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    vol_on.style.display='none'
    vol_off.style.display=''
    
};
  //-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
  directo.src = video2.src;
  directo.currentTime = video2.currentTime;
  directo.play();
  vol_on.style.display='none'
    vol_off.style.display=''
};
//-- Botón de Selección de la cámara 3
btn_video3.onclick = () => {
  directo.src = video3.src;
  directo.currentTime = video3.currentTime;
  directo.play();
  vol_on.style.display='none'
  vol_off.style.display=''
};


modo_bucle.onclick =() =>{
  MODO.bucle = true;
  MODO.manual = false;
 
  video1.play();
  video2.play();
  video3.play();
  inicio = directo.currentTime;
  loop = setInterval(bucle, 2000);
}

function bucle() {
  directo.currentTime = inicio;
}

// control volumen
vol_off.onclick =()=>{
  directo.muted = true;
  vol_on.style.display='';
  vol_off.style.display='none';
}

vol_on.onclick =()=>{
  directo.muted = false;
  vol_off.style.display='';
  vol_on.style.display='none';
}
