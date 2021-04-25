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
let level;//nivel facil pordefecto

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
                if(r==0){   // pcolor según filas
                    ctx.fillStyle = '#28B463';
                }else if(r==1){
                    ctx.fillStyle = '#FF5733';
                }else if(r==2){
                    ctx.fillStyle='#2874A6';
                }else if(r==3){
                    ctx.fillStyle='#BB8FCE';
                }else{
                    ctx.fillStyle = '#FFFFFF';
                }                           
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//dibujar elementos
function draw(){        
    setlevel();
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
    //nivel
    ctx.font = "20px Arial";
    ctx.textAlign = 'center';
    ctx.fillText('Nivel:', canvas.width/2-20,75)
    ctx.fillText(level, canvas.width/2+50,75)
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
            const brick = bricks[c][r];
            if(brick.visible){
                if(ball.x > brick.x && ball.x < brick.x+ladrillo.width && ball.y > brick.y && ball.y < brick.y+ladrillo.height) {
                    vely = -vely;
                    if(r==2 || r==1){   // puntos según filas
                        puntos+=5;
                    }else if(r==0){
                        puntos+=10;
                    }else if(r==3){
                        puntos+=2;
                    }else{
                        puntos++;
                    }                    
                    play_sound(sound_click);
                    brick.visible=false; //quitar el ladrillo
                }
            }               
        }
    }
}
level_op.addEventListener("change", setlevel);

function setlevel(){
    level = level_op.options[level_op.selectedIndex].value;
    //console.log(level);
   
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
        if(level =='Difficult'){valorinicial();}
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

    //deshabilitar button y opcion nivel
    if(juego.jugando==true){
        button_play.disabled=true;
        level_op.disabled = true;
    }else{
        button_play.disabled=false;
        level_op.disabled = false;
        
    }

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
document.addEventListener("keydown", tecla_empezar);
function tecla_empezar(ev) {
    switch (ev.keyCode) {
       case 32: //space
        juego.jugando=true;
        puntos=0;
        vida=3;
        //-- ¡Que empiece la función!
        update();
       break;
    }

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
