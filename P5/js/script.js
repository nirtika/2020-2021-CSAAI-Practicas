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
const img_test = document.getElementById("img_test");
const btn_video4 = document.getElementById("btn_video4");
const modo_manual = document.getElementById("btn_src_manual");
const modo_bucle = document.getElementById("btn_src_bucle");
const modo_auto = document.getElementById('btn_src_auto');
const btn_off= document.getElementById('btn_src_off');
const vol_on= document.getElementById('vol_on');
const vol_off= document.getElementById('vol_off');
const bucle_off = document.getElementById('bucle_off');
const bucle_on = document.getElementById('bucle_on');
const btn_pause = document.getElementById('pause');
const btn_play = document.getElementById('play');
const btn_stop = document.getElementById('stop');

let loop_video; //bucle
let loop_auto; //auto
let auto_play;

// modos
const MODO={
  manual: false,
  bucle:false,
  auto:false
}

// videos
const PLAYING={
  vUno: false,
  vDos:false,
  vTres:false
}
//estilos (ocultar / mostrar elementos)
modo_manual.style.display='none';
modo_bucle.style.display='none';
modo_auto.style.display='none';
btn_test.style.display='none';
btn_video1.style.display='none';
btn_video2.style.display='none';
btn_video3.style.display='none';
vol_off.style.display='none';
vol_on.style.display='none';
bucle_off.style.display='none';
bucle_on.style.display='none';
btn_pause.style.display='none';
btn_play.style.display = 'none';
btn_stop.style.display='none';

//-- Establecer las dimensiones de los vídeos
directo.width=480;
directo.height=280;
video1.width=300;  
video1.height=150;
video2.width=300;  
video2.height=150;
video3.width=300;  
video3.height=150;
img_test.width=300;  
img_test.height=150;

//-- Imagen de Test usada
const OFF_IMAGE_URL = "img/test.jpg";
const TEST_IMAGE_URL = "img/standby.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = OFF_IMAGE_URL;
video1.poster = OFF_IMAGE_URL;
video2.poster = OFF_IMAGE_URL;
video3.poster = OFF_IMAGE_URL;
img_test.src = OFF_IMAGE_URL;


//-- Botón de FUENTES-ON
btn_src_on.onclick = () => {
  //estilos
  modo_manual.style.display='';
  modo_bucle.style.display='';
  modo_auto.style.display='';
  btn_test.style.display='';
  btn_video1.style.display='';
  btn_video2.style.display='';
  btn_video3.style.display='';
  btn_src_on.disabled=true;
  btn_video1.disabled = true;
  btn_video2.disabled = true;
  btn_video3.disabled = true;
  //-- Establecer la fuente de las cámaras
  video1.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video1.mp4";
  video2.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video2.mp4";
  video3.src="https://github.com/nirtika/VIDEOS_2020-2021-CSAAI-Practicas/raw/main/video3.mp4";
  img_test.src=TEST_IMAGE_URL;

  //-- Reproducimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();
  
  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = OFF_IMAGE_URL;
};

//active button 
const btn_modos = document.getElementById("opciones");
// el div que contiene los buttones
const btns = btn_modos.getElementsByClassName("btn_modo");

// añadir class active en el button
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
      // si no hay active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    // añadir clase active
    this.className += " active";
  });
}


//-- Botón de FUENTES-OFF
btn_src_off.onclick = () => {
  window.clearInterval(loop_video);
  window.clearInterval(loop_auto);
  window.clearTimeout(auto_play);

  video1.src=OFF_IMAGE_URL;
  video2.src=OFF_IMAGE_URL;
  video3.src=OFF_IMAGE_URL;
  img_test.src=OFF_IMAGE_URL;
  directo.src = OFF_IMAGE_URL;
  directo.poster = OFF_IMAGE_URL;

  modo_manual.style.display='none';
  modo_bucle.style.display='none';
  modo_auto.style.display='none';
  btn_test.style.display='none';
  btn_video1.style.display='none';
  btn_video2.style.display='none';
  btn_video3.style.display='none';
  vol_on.style.display='none';
  vol_off.style.display='none';
  bucle_off.style.display='none';
  bucle_on.style.display='none';
  modo_manual.classList.remove('active');
  modo_bucle.classList.remove('active');
  modo_auto.classList.remove('active');
  btn_src_on.disabled=false;
  btn_pause.style.display='none';
  btn_play.style.display = 'none';
  btn_stop.style.display='none';
  
}

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    //directo.src = '';
};

  //-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    PLAYING.vUno=true;
    PLAYING.vDos=false;
    PLAYING.vTres=false;
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster='';
    vol_off.style.display='';
    btn_pause.style.display='';  
    btn_stop.style.display='';
    //check_modo();
    if(MODO.bucle){
      bucle_off.style.display='';
    }
    if (MODO.auto) {
      btn_pause.style.display='none';  
      btn_stop.style.display='none';
      bucle_off.style.display='none';
      bucle_on.style.display='none';
    }
};
  //-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
  PLAYING.vDos=true;
  PLAYING.vUno=false;
  PLAYING.vTres=false;
  directo.src = video2.src;
  directo.currentTime = video2.currentTime;
  directo.play();
  directo.poster='';
  vol_off.style.display='';
  btn_pause.style.display='';  
  btn_stop.style.display='';
 // check_modo(); 
  if(MODO.bucle){
    bucle_off.style.display='';
  }
  if (MODO.auto) {
    btn_pause.style.display='none';  
    btn_stop.style.display='none';
    bucle_off.style.display='none';
    bucle_on.style.display='none';
  }
};
//-- Botón de Selección de la cámara 3
btn_video3.onclick = () => {
  PLAYING.vTres=true;
  PLAYING.vDos=false;
  PLAYING.vUno=false;
  directo.src = video3.src;
  directo.currentTime = video3.currentTime;
  directo.play();
  directo.poster='';
  vol_off.style.display='';
  btn_pause.style.display='';  
  btn_stop.style.display='';
  //check_modo();
  if(MODO.bucle){
    bucle_off.style.display='';
  }
  if (MODO.auto) {
    btn_pause.style.display='none';  
    btn_stop.style.display='none';
    bucle_off.style.display='none';
    bucle_on.style.display='none';
  }
};

// Modo manual
modo_manual.onclick = () => {
  window.clearInterval(loop_video);
  window.clearInterval(loop_auto);
  window.clearTimeout(auto_play);
  MODO.manual = true;
  MODO.bucle = false;
  MODO.auto = false;
  check_modo();  
  bucle_on.style.display='none';
  bucle_off.style.display='none';
  if (MODO.auto== false) {
    vol_off.style.display='';
    btn_pause.style.display='';  
    btn_stop.style.display='';
  }
};

//modo bucle
modo_bucle.onclick =() =>{
  window.clearTimeout(auto_play);
  window.clearInterval(loop_auto);
  MODO.bucle = true;
  MODO.manual = false;
  MODO.auto = false;
  check_modo();
  video1.play();
  video2.play();
  video3.play();
  inicio = directo.currentTime;
  loop_video = setInterval(bucle, 2000);
  bucle_off.style.display='';
  
}
function bucle() {
  directo.currentTime = inicio;
}

//modo auto
modo_auto.onclick=()=>{
  MODO.bucle = false;
  MODO.manual = false;
  MODO.auto = true;
  check_modo();
  window.clearInterval(loop_video);
  btn_video1.onclick();
  auto_play= setTimeout(btn_video2.onclick, 3000);
  auto_play= setTimeout(btn_video3.onclick, 6000);
  loop_auto= setInterval(change_video, 9000);  
}
function change_video() {
  btn_video1.onclick();
  setTimeout(btn_video2.onclick, 3000);
  setTimeout(btn_video3.onclick, 6000);
}

//habilitar boton para selecionar video
function check_modo(){
  if(MODO.manual || MODO.bucle){
    //console.log('MANUAL');
    btn_video1.disabled = false;
    btn_video2.disabled = false;
    btn_video3.disabled = false;
    btn_test.disabled= false;
  }else{
    btn_video1.disabled = true;
    btn_video2.disabled = true;
    btn_video3.disabled = true;
    btn_test.disabled= true;
  }
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

// bucle on y off
bucle_off.onclick =()=>{
  MODO.bucle= false;
  window.clearInterval(loop_video);
  bucle_on.style.display='';
  bucle_off.style.display='none';
}
bucle_on.onclick =()=>{
  inicio = directo.currentTime;
  loop_video = setInterval(bucle, 2000);
  bucle_off.style.display='';
  bucle_on.style.display='none';
}
// botón pausar
btn_pause.onclick =()=>{
  directo.src = TEST_IMAGE_URL;
  directo.poster = TEST_IMAGE_URL;
  directo.pause();
  //directo.poster=TEST_IMAGE_URL;
  btn_play.style.display='';
  btn_pause.style.display = 'none';
}

// botón reproducir
btn_play.onclick =()=>{
  
  btn_pause.style.display='';
  btn_play.style.display = 'none';
  if(PLAYING.vUno){
    //video1.play();
    directo.src=video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster='';
  }else if(PLAYING.vDos){
    //video2.play();
    directo.src=video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    directo.poster='';
  }else{
    //video3.play();
    directo.src=video3.src;
    directo.currentTime = video3.currentTime;
    directo.play();
    directo.poster='';
  }

}

// botón parar
btn_stop.onclick =()=>{ 
  btn_pause.style.display='none';
  btn_play.style.display = '';
  if(PLAYING.vUno ){
    //video1.play();
    directo.src=video1.src;
    directo.currentTime = 0;
    directo.pause();
    directo.poster=OFF_IMAGE_URL;
  }else if(PLAYING.vDos){
    //video2.play();
    directo.src=video2.src;
    directo.currentTime = 0;
    directo.pause();
    directo.poster=OFF_IMAGE_URL;
  }else{
    //video3.play();
    directo.src=video3.src;
    directo.currentTime = 0;
    directo.pause();
    directo.poster=OFF_IMAGE_URL;
  }
  if (MODO.bucle) {
    directo.currentTime = 0;
    directo.pause();
    directo.src=OFF_IMAGE_URL;
    directo.poster=OFF_IMAGE_URL;
  }

}