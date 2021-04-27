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
    }
    //restar vidas
    if (y > canvas.height) {
        vida--;        
    }
    // gmae over
    if(vida==2){
        alert('Game Over')       
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

