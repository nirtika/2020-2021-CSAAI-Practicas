var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//-- Definir el tamaño del canvas
canvas.width = 500;
canvas.height = 700;
//-- Coordenadas del objeto
let x = canvas.width/2;
let y = canvas.height-25;
//-- Velocidades del objeto
let velx = 2;
let vely = -2;

// anchura y altura de la paleta
var paddleHeight = 10;
var paddleWidth = 65;
var paddleX = (canvas.width-10)/2; //posicion X de la paleta

// mover la paleta
var rightpress= false;
var leftpress = false;

//dibujar elementos
function draw(){
        
    // Texto en canvas
    //-- Texto solido
    ctx.font = "25px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("BreakOut", canvas.width/2, 25);

    // dibujar ladrillo
    ctx.beginPath();
        ctx.rect(2, 40, 50, 5);
        ctx.fillStyle = "blue";
        ctx.fill();
    ctx.closePath();

    // dibujar palo
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


//// funcion leer tecla derecha y izq
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

    // mover la paleta
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
//-- ¡Que empiece la función!
update();

