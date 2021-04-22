var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
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
var paddleHeight = 10;
var paddleWidth = 65;
var paddleX = (canvas.width-60)/2; //posicion X de la raqueta

// mover la raqueta
var rightpress= false;
var leftpress = false;

//id del boton play
const button_play = document.getElementById('button_play')

// variables para ladrillos
var filas = 5;
var columnas = 9;
// anchura, altura,padding, margin
var brickWidth = 50; 
var brickHeight = 15; 
var brickPadding = 5;
var marginTop = 160;

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
    ctx.fillText("3", canvas.width-60, 120);

    // Puntos
    ctx.font = "25px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("Puntos", 50, 90);
    ctx.fillText("3", 50, 120);

    
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
        ctx.rect(paddleX, canvas.height-15, paddleWidth, paddleHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    ctx.closePath();

    //Dibujar bola
    ctx.beginPath();
        //-- Dibujar un circulo: coordenadas x,y del centro
        //-- Radio, Angulo inicial y angulo final
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    ctx.closePath();
}
draw();

function drawBricks() {
    for(c=0; c<columnas; c++) {
        for(r=0; r<filas; r++) {
            var brickX = (c*(brickWidth+brickPadding));
            var brickY = (r*(brickHeight+brickPadding));
            ctx.beginPath();
            ctx.rect(brickX, brickY+marginTop, brickWidth, brickHeight);
            ctx.fillStyle = "white";           
            ctx.fill();
            ctx.closePath();
        }
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
    
    //-- Actualizar la posición
    x = x + velx;
    y = y + vely;
    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

button_play.onclick= () =>{
    //-- ¡Que empiece la función!
    update();
}