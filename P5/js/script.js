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
const modo_auto = document.getElementById("auto");
const modo_manual = document.getElementById("manual");
const modo_bucle = document.getElementById("bucle");
//const btn_opcn= document.getElementsBy('btn_opc')
const MODO={
  manual: false,
  auto: false,
  bucle:false

}

modo_auto.disabled = true;
modo_manual.disabled = true;
modo_bucle.disabled = true;

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
const TEST_IMAGE_URL = "img/test.jpg";
const TEST_IMAGE_URL2 = "img/standby.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;
video3.poster = TEST_IMAGE_URL;
img_stand.src = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {

  modo_auto.disabled = false;
  modo_manual.disabled = false;
  modo_bucle.disabled = false;
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
  img_stand.src=TEST_IMAGE_URL2;

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();
  
  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL2;
    directo.src = null;
};


modo_manual.onclick = () => {

  MODO.manual = true;
  check_modo();
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
  
};

function check_modo(){
  if(MODO.manual){
    console.log('hola');
    btn_video1.classList.remove("hide");
    btn_video2.classList.remove("hide");
    btn_video3.classList.remove("hide");
  }
}