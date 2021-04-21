var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// dibujar palo
ctx.beginPath();
ctx.rect(2, 140, 50, 8);
ctx.fillStyle = "#FFFFFF";
ctx.fill();
ctx.closePath();

// dibujar ladrillo
ctx.beginPath();
ctx.rect(2, 14, 50, 5);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

//dibujar bola
ctx.beginPath();
ctx.arc(150, 80, 8, 0, Math.PI*2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();


