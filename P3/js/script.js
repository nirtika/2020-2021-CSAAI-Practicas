var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//-- Definir el tamaño del canvas
canvas.width = 490;
canvas.height = 700;

//-- Velocidades del objeto
let velx = 2;
let vely = -2;

const paddle ={
    height : 10,
    width :65,
    x:(canvas.width-60)/2, //posicion X de la raqueta
    y:canvas.height-15      //posicion y
}
const ball ={
    x : (canvas.width-60)/2,
    y: canvas.height-15 ,
    radius : 10
}

// mover la raqueta
let rightpress= false;
let leftpress = false;

//id del boton play
const button_play = document.getElementById('button_play')

// variables para ladrillos
const ladrillo = {
    width:50,
    height : 15,
    padding:5,
    marginTop:160
}

const filas = 5;
const columnas = 9;
const bricks = [];

let vida = 3;
let puntos = 0;

function drawBricks() {
    for(c=0; c<columnas; c++) {
        bricks[c] = [];
        for(r=0; r<filas; r++) {
            const brickX = (c*(ladrillo.width+ladrillo.padding));
            const brickY = (r*(ladrillo.height+ladrillo.padding)+ladrillo.marginTop);
            bricks[c][r] = {brickX, brickY};
            ctx.beginPath();
            ctx.rect(brickX, brickY, ladrillo.width, ladrillo.height);
            ctx.fillStyle = 'white';           
            ctx.fill();
            ctx.closePath();
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
    if (ball.x < 0 || ball.x >= (canvas.width) ) {
        velx = -velx;
    }

    //-- Condición de rebote en extremos horizontales del canvas
    if (ball.y <= 0 || ball.y > canvas.height) {
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
    }

    //-- Actualizar la posición
    ball.x = ball.x + velx;
    ball.y = ball.y + vely;
    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}


 

button_play.onclick= () =>{
    //-- ¡Que empiece la función!
    update();
    
}

