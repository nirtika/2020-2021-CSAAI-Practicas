const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button_play = document.getElementById('button_play'); //id del boton play
const level_op=document.getElementById("level");
const inst = document.getElementById('man');
const btn_inst = document.getElementById('btn_inst');//botón instrucciones
const close_inst = document.getElementById('close');

//sonidos
const sound_over = new Audio('sound/finish.mp3');
const sound_click= new Audio('sound/bricks.mp3');
const sound_tone= new Audio('sound/tone.wav');

//-- Definir el tamaño del canvas
canvas.width = 490;
canvas.height = 700;

//nivel
let level;//nivel fácil pordefecto

//-- Velocidades
let velx = 4;
let vely = -3;

const juego={
    jugando:false,
}
// variables raqueta
const paddle ={
    height : 10,
    width :100,
    x:(canvas.width-65)/2, //posicion X de la raqueta
    y:canvas.height-30      //posicion y
}
let colors_list = ['aqua', '#99ccff', '#8099cc', '#52a366', '#e6c499', '#b3ffd7', '#96eded', '#73abc7', '#26bf8c', 'red', '#ffb2b2', '#bdd991', '#8fd1d1', '#bdbdff']

// variables bola
const ball ={
    x : (canvas.width+35)/2,
    y: canvas.height-42,
    radius : 10,
    colors : colors_list[Math.floor(Math.random()*14)]
}

// mover la raqueta(teclado)
let rightpress= false;
let leftpress = false;

// variables para ladrillos
const ladrillos = {
    filas: 5,
    width:50,
    columnas: 9,
    height : 15,
    padding:5,
    marginTop:165,
    total:45,
    bricks:[],
}

let vida = 3;
let puntos = 0;

//contador tiempo
let microseg = 0;
let second = 0;
let min = 0;

//ladrillos
function crearBricks(){ //crear
    for(c=0; c<ladrillos.columnas; c++) {
        ladrillos.bricks[c] = [];
        for(r=0; r<ladrillos.filas; r++) {
            ladrillos.bricks[c][r] = { x: 0, y: 0, visible:true};
        }
    }
}
crearBricks();

//dibujar ladrillos
function drawBricks() {        
    for(c=0; c<ladrillos.columnas; c++) {
       // ladrillos.bricks[c] = [];
        for(r=0; r<ladrillos.filas; r++) {
            if(ladrillos.bricks[c][r].visible){
                const brickX = (c*(ladrillos.width+ladrillos.padding));
                const brickY = (r*(ladrillos.height+ladrillos.padding)+ladrillos.marginTop);
                ladrillos.bricks[c][r].x = brickX;
                ladrillos.bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, ladrillos.width, ladrillos.height);
                if(r==0){   // pcolor según ladrillo.filas
                    ctx.fillStyle = '#28B463';
                }else if(r==1){
                    ctx.fillStyle = '#FF5733';
                }else if(r==2){
                    ctx.fillStyle='#999966';
                }else if(r==3){
                    ctx.fillStyle='#2874A6';
                }else{
                    ctx.fillStyle = '#FFFFFF';
                }                           
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//dibujar elementos en canvas
function draw(){        
    setlevel();
    cronometro();
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
    ctx.fillText('Time:', canvas.width/2-20,120);
    ctx.fillText(min+':'+second, canvas.width/2+50,120)
    //nivel
    ctx.font = "20px Arial";
    ctx.textAlign = 'center';
    ctx.fillText('Nivel:', canvas.width/2-20,75);
    ctx.fillText(level, canvas.width/2+50,75);
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
        ctx.fillStyle = ball.colors;
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
    for(c=0; c<ladrillos.columnas; c++) {
        for(r=0; r<ladrillos.filas; r++) {
            const brick = ladrillos.bricks[c][r];
            if(brick.visible){
                if(ball.x > brick.x && ball.x < brick.x+ladrillos.width && ball.y > brick.y && ball.y < brick.y+ladrillos.height) {
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
                    brick.visible=false; //quitar el ladrillos
                    ladrillos.total--; // restar num del ladrillos
                    win();// función ganador
                    //console.log(ladrillos.total);
                }
            }               
        }
    }
}

level_op.addEventListener("change", setlevel);
//elegir nivel
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
        paddle.x += 3;
    }
    else if(leftpress && paddle.x > 0) {
        paddle.x -= 3;
    }

    //rebote en la raqueta
    if (ball.x - ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width 
        && ball.y + ball.radius >= paddle.y) {
        vely = Math.floor(Math.random() * -5 + (-1)); //random entre -1 y -5
        console.log(vely);
        ball.colors = colors_list[Math.floor(Math.random()*16)];
        
    }

    // restar vidas
    if (ball.y > paddle.y) {
        vida--;
        if(level =='Difficult'){crearBricks();puntos=0;}
        play_sound(sound_tone);
        ball.x=(canvas.width+35)/2; //posición inicial
        ball.y=canvas.height-42;
        paddle.x=(canvas.width-65)/2;
        ball.colors = colors_list[Math.floor(Math.random()*16)]; 
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
        document.removeEventListener("keydown", tecla_empezar);
    }else{
        button_play.disabled=false;
        level_op.disabled = false;
        document.addEventListener("keydown", tecla_empezar);        
    }

    if (juego.jugando== true){
        //) Volver a ejecutar update cuando toque
       // cronometro();
        requestAnimationFrame(update);
    }
    
}

//cronometro
function cronometro(){
    microseg ++;
    
    if (microseg === 100) {
        microseg = 0;
        second ++;
        if (second < 10) {
            second = "0" + second;
        }
        
    }
    if (second == 60) {
        min ++;
        second = 0;
        if (min < 10) {
            min = "0" + min;
        }
        if (second == 0) {
            second = "0" + second;
        }
    }
}

// gameOver
function gameOver(){
    if (vida==0){
        crearBricks();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        juego.jugando=false;
        play_sound(sound_over)
        ctx.strokeStyle = 'red';
        ctx.font = "78px Arial";
        ctx.strokeText('..Game Over..', canvas.width/2,canvas.height/2);
        ctx.fillStyle = 'green';
        ctx.font = "40px Arial";
        ctx.fillText('Puntos:', canvas.width/2,canvas.height/2+100);
        ctx.fillText(puntos, canvas.width/2+100,canvas.height/2+100);
        button_play.innerHTML='Restart';
    }      
}

// gana => si distruye todos los ladrillos
function win(){
    if(ladrillos.total==0){
        crearBricks();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        juego.jugando=false;
        play_sound(sound_over)
        ctx.strokeStyle = 'grey';
        ctx.font = "80px Sans Serif ";
        ctx.strokeText('Has Ganado..', canvas.width/2,canvas.height/2);
        ctx.fillStyle = 'green';
        ctx.font = "40px Arial";
        ctx.fillText('Puntos:', canvas.width/2,canvas.height/2+100);
        ctx.fillText(puntos, canvas.width/2+100,canvas.height/2+100);
        ball.x=(canvas.width+35)/2; //posición inicial
        ball.y=canvas.height-42;
        paddle.x=(canvas.width-65)/2;
        button_play.innerHTML='Restart';
    } 
}

//empezar el juego
function start_Game(){
    juego.jugando=true;
    puntos=0;
    vida=3;
    microseg=0;
    min=0;
    second=0;
    ladrillos.total=45;
    //-- ¡Que empiece la función!
    update();
    
}
//boton play
button_play.onclick= () =>{
    //button_play.innerHTML='Play';
    start_Game();
}

//boton instrucciones
btn_inst.onclick= () =>{
    inst.classList.toggle('show');
    //inst.classList.add('show');
}

//button cerrar instrucciones
close_inst.onclick= () =>{
    inst.classList.remove('show');
    //inst.classList.add('show');
}

document.addEventListener("keydown", tecla_empezar);
//empezar el juego(tecla espacio)
function tecla_empezar(ev) {
    //button_play.innerHTML='Play';
    switch (ev.keyCode) {
       case 32: //space
        start_Game();
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
