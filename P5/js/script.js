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
const modo_auto = document.getElementById("btn_src_auto");
const modo_manual = document.getElementById("btn_src_manual");
const modo_bucle = document.getElementById("btn_src_bucle");
const btn_off= document.getElementById('btn_src_off');

let loop;
// modos
const MODO={
  manual: false,
  auto: false,
  bucle:false
}

modo_auto.style.display='none';
modo_manual.style.display='none';
modo_bucle.style.display='none';
btn_test.style.display='none';

//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.width=200;  
video2.height=100;
video3.width=200;  
video3.height=100;
img_stand.width=200;  
img_stand.height=100;

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
  modo_auto.style.display='';
  modo_manual.style.display='';
  modo_bucle.style.display='';
  btn_test.style.display='';
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
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
  modo_auto.style.display='none';
  modo_manual.style.display='none';
  modo_bucle.style.display='none';
  btn_test.style.display='none';
  video1.src=null;
  video2.src=null;
  video3.src=null;
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
  MODO.auto = false;
  MODO.bucle = false;
  check_modo();
  window.clearInterval(loop);
};

  //-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    
};
  //-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
  directo.src = video2.src;
  directo.currentTime = video2.currentTime;
  directo.play();
};
//-- Botón de Selección de la cámara 3
btn_video3.onclick = () => {
  directo.src = video3.src;
  directo.currentTime = video3.currentTime;
  directo.play();
};


modo_auto.onclick = () => {
  MODO.auto = true;
  MODO.manual = false;
  MODO.bucle = false;
  check_modo();
  window.clearInterval(loop);  
};

modo_bucle.onclick =() =>{
  MODO.bucle = true;
  MODO.manual = false;
  MODO.auto = false;
  check_modo();
  video1.play();
  video2.play();
  video3.play();
  inicio = directo.currentTime;
  loop = setInterval(bucle, 2000);
}

function bucle() {
  directo.currentTime = inicio;
}

function check_modo(){
  if(MODO.manual || modo_bucle){
    console.log('MANUAL');
    btn_video1.classList.remove("hide");
    btn_video2.classList.remove("hide");
    btn_video3.classList.remove("hide");
  }if(MODO.auto){
    btn_video1.classList.add("hide");
    btn_video2.classList.add("hide");
    btn_video3.classList.add("hide");
  }
}