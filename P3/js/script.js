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
        ctx.rect(250, canvas.height-15, 50, 8);
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


//-- Funcion principal de animacion
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //-- Condicion de rebote en extremos verticales del canvas
    if (x < 0 || x >= (canvas.width) ) {
        velx = -velx;
    }

    //-- Condición de rebote en extremos horizontales del canvas
    if (y <= 0 || y > canvas.height) {
        vely = -vely;
    }
    draw();
    //-- Actualizar la posición
    x = x + velx;
    y = y + vely;
    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}
//-- ¡Que empiece la función!
update();