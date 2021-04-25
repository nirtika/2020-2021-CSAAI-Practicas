const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button_play = document.getElementById('button_play'); //id del boton play
const level_op=document.getElementById("level");
//sonidos
const sound_over = new Audio('/P3/finish.mp3');
const sound_click= new Audio('/P3/bricks.mp3');
const sound_tone= new Audio('/P3/tone.wav');

//-- Definir el tamaño del canvas
canvas.width = 490;
canvas.height = 700;

//nivel
let level;

//-- Velocidades del objeto
let velx = 4;
let vely = -2;

const juego={
    jugando:false,
}
const paddle ={
    height : 10,
    width :80,
    x:(canvas.width-65)/2, //posicion X de la raqueta
    y:canvas.height-15      //posicion y
}
const ball ={
    x : (canvas.width+15)/2,
    y: canvas.height-25 ,
    radius : 10
}

// mover la raqueta(teclado)
let rightpress= false;
let leftpress = false;

// variables para ladrillos
const ladrillo = {
    width:50,
    height : 15,
    padding:5,
    marginTop:165
}

const filas = 5;
const columnas = 9;
const bricks = [];

let vida = 3;
let puntos = 0;

for(c=0; c<columnas; c++) {
    bricks[c] = [];
    for(r=0; r<filas; r++) {
        bricks[c][r] = { x: 0, y: 0, visible:true};
    }
}
function drawBricks() {    
    for(c=0; c<columnas; c++) {
       // bricks[c] = [];
        for(r=0; r<filas; r++) {
            if(bricks[c][r].visible){
                const brickX = (c*(ladrillo.width+ladrillo.padding));
                const brickY = (r*(ladrillo.height+ladrillo.padding)+ladrillo.marginTop);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, ladrillo.width, ladrillo.height);
                ctx.fillStyle = 'white';           
                ctx.fill();
                ctx.closePath();
            }
        }
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
    //tiempo
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

    // dibujar ladrillos
    drawBricks();

    // dibujar la raqueta
    ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    ctx.closePath();

    //Dibujar bola
    ctx.beginPath();
        //-- Dibujar un circulo: coordenadas x,y del centro
        //-- Radio, Angulo inicial y angulo final
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    ctx.closePath();
}
draw();

//sonido
function play_sound(sound){
    sound.currentTime = 0;
    sound.play();
}

// detectar colision ladrilllos
function collisionDetection() {
    for(c=0; c<columnas; c++) {
        for(r=0; r<filas; r++) {
            const ladr = bricks[c][r];
            if(ladr.visible){
                if(ball.x > ladr.x && ball.x < ladr.x+ladrillo.width && ball.y > ladr.y && ball.y < ladr.y+ladrillo.height) {
                    vely = -vely;
                    puntos++;
                    play_sound(sound_click);
                    ladr.visible=false; //quitar el ladrillo
                }
            }               
        }
    }
}
level_op.addEventListener("change", setlevel);

function setlevel(){
    level = level_op.options[level_op.selectedIndex].value;
   console.log(level);
}


//-- Funcion principal de animacion
function update() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw();
    
    //-- Condicion de rebote en extremos verticales del canvas
    if (ball.x < 0 || ball.x >= (canvas.width) ) {
        velx = -velx;
    }

    //-- Condición de rebote en extremos horizontales del canvas
    if (ball.y <= 150 || ball.y > canvas.height) {
        vely = -vely;
    }
   
    // mover la raqueta
    if(rightpress && paddle.x < canvas.width-paddle.width) {
        paddle.x += 5;
    }
    else if(leftpress && paddle.x > 0) {
        paddle.x -= 5;
    }

    //rebote en la raqueta
    if (ball.x - ball.radius > paddle.x && ball.x + ball.radius < paddle.x + paddle.width 
        && ball.y + ball.radius > paddle.y) {
        vely = -vely;
    }

    // restar vidas
     if (ball.y > canvas.height) {
        vida--;
        if(level ==1){valorinicial();}
        play_sound(sound_tone);
        ball.x=(canvas.width+15)/2; //posición inicial
        ball.y=canvas.height-25;
        paddle.x=(canvas.width-65)/2;
        //paddle.y =canvas.height-15;
        
    }
    //detectar colision ladrillos
    collisionDetection();
    gameOver();       
    
    //-- Actualizar la posición
    ball.x = ball.x + velx;
    ball.y = ball.y + vely;
    
    if (juego.jugando== true){
        //) Volver a ejecutar update cuando toque
        requestAnimationFrame(update);
    }
}

function valorinicial(){ //volover a dibujar los ladrillos
    for(c=0; c<columnas; c++) {
        bricks[c] = [];
        for(r=0; r<filas; r++) {
            bricks[c][r] = { x: 0, y: 0, visible:true};
        }
    }
}

function gameOver(){
    if (vida==0){
        valorinicial();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        juego.jugando=false;
        play_sound(sound_over)
        ctx.strokeStyle = 'red';
        ctx.font = "78px Arial";
        ctx.strokeText('Game Over..', canvas.width/2,canvas.height/2);
        ctx.fillStyle = 'green';
        ctx.font = "40px Arial";
        ctx.fillText('Puntos:', canvas.width/2,canvas.height/2+100);
        ctx.fillText(puntos, canvas.width/2+95,canvas.height/2+100);

    }    
}

button_play.onclick= () =>{
    juego.jugando=true;
    puntos=0;
    vida=3;
    //-- ¡Que empiece la función!
    update();
    
}

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
