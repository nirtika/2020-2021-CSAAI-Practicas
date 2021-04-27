const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//-- Definir el tamaño del canvas
canvas.width = 490;
canvas.height = 700;
//-- Coordenadas del objeto
let x = canvas.width/2;
let y = canvas.height-25;
//-- Velocidades del objeto
let velx = 2;
let vely = -2;

// anchura y altura de la raqueta
const paddleHeight = 10;
const paddleWidth = 65;
let paddleX = (canvas.width-60)/2; //posicion X de la raqueta
const paddleY =canvas.height-15;
const ballradius=10
// mover la raqueta
var rightpress= false;
var leftpress = false;

//id del boton play
const button_play = document.getElementById('button_play')


let vida = 3;
let puntos = 0;

//sonidos
const sound_raqueta = new Audio('raqueta.mp3')
const sound_rebote = new Audio('rebote.mp3')

//ladirllos
const LADRILLO = {
    F: 5,   //-- Filas
    C: 6,   //-- Columnas
    w: 75,  //-- Anchura
    h: 20,  //-- Altura
    padding: 10,  //-- Espacio alrededor del ladrillo
    visible: true //-- Estado del ladrillo: activo o no
  }

//-- Creación de los ladrillos. La estructura se almacena 
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];

//-- Recorrer todas las filas. La variable i toma valores de 0 hasta F-1 (número de filas)
for (let i = 0; i < LADRILLO.F; i++) {
  ladrillos[i] = [];  //-- Inicializar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

  //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
  for (let j = 0; j < LADRILLO.C; j++) {

    //-- Calcular valores para el ladrillo de la fila i y la columna j
    //-- Algunos valores son constates. Otros depeden de i y j
    ladrillos[i][j] = {
      x: (LADRILLO.w + LADRILLO.padding) * j,
      y: (i*(LADRILLO.h+LADRILLO.padding)+150),
      w: LADRILLO.w,
      h: LADRILLO.h,
      padding: LADRILLO.padding,
      visible: LADRILLO.visible
    };
  }
}



//dibujar elementos
function draw(){
        
    // Texto en canvas
    //-- Texto solido
    ctx.font = "35px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("BreakOut", canvas.width/2, 30);

    
    // Texto Vida
    ctx.font = "25px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("Vida", canvas.width-60, 90);
    ctx.fillText(vida, canvas.width-60, 120);

    // Puntos
    ctx.fillText("Puntos", 50, 90);
    ctx.fillText(puntos, 50, 120);
    ctx.fillText('Time', canvas.width/2,120)

    
    // draw a red line
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(500, 50);
    ctx.moveTo(0, 140);
    ctx.lineTo(500, 140);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // dibujar la raqueta
    ctx.beginPath();
        ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    ctx.closePath();

    //Dibujar bola
    ctx.beginPath();
        //-- Dibujar un circulo: coordenadas x,y del centro
        //-- Radio, Angulo inicial y angulo final
        ctx.arc(x, y, ballradius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    ctx.closePath();
    
    //-- Dibujar ladrillos
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
          //-- Si el ladrillo es visible se pinta
            if (ladrillos[i][j].visible) {
                ctx.beginPath();
                    ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.closePath();
                if(x > ladrillos[i][j].x && x < ladrillos[i][j].x+LADRILLO.w && y > ladrillos[i][j].y && y < ladrillos[i][j].y+LADRILLO.h) {
                    vely = -vely;
                    puntos++; //sumar puntos
                    play_sound(sound_rebote);
                    ladrillos[i][j].visible=false;//quitar ladrillos
                }                
            }
        }
     }

}
draw();

// funcion leer tecla derecha y izq
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// evento teclado
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightpress = true;
    }
    else if(e.keyCode == 37) {
        leftpress = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightpress = false;
    }
    else if(e.keyCode == 37) {
        leftpress = false;
    }
}

//-- Funcion principal de animacion
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    //-- Condicion de rebote en extremos verticales del canvas
    if (x < 0 || x >= (canvas.width) ) {
        velx = -velx;
    }

    //-- Condición de rebote en extremos horizontales del canvas
    if (y <= 0 || y > canvas.height) {
        vely = -vely;
        
    }

    // mover la raqueta
    if(rightpress && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftpress && paddleX > 0) {
        paddleX -= 7;
    }

    //rebote en la raqueta
    if (x - ballradius > paddleX && x + ballradius < paddleX + paddleWidth 
        && y + ballradius > paddleY) {
        vely = -vely;
        play_sound(sound_raqueta);
    }
    //restar vidas
    if (y > canvas.height) {
        vida--;        
    }
    // gmae over
    if(vida==0){
        alert('Game Over')       
    }
    //-- Actualizar la posición
    x = x + velx;
    y = y + vely;
    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

function play_sound(sound){
    sound.currentTime = 0;
    sound.play();
}

button_play.onclick= () =>{
    //-- ¡Que empiece la función!
    update();
    
}
document.addEventListener("keydown", tecla_empezar);
//empezar el juego(tecla espacio)
function tecla_empezar(ev) {
    switch (ev.keyCode) {
       case 32: //space
       update();
       break;
    }

}
