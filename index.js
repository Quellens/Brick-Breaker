
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 80;
var xrichtung = 7;
var yrichtung = -7;
var ballRadius = 10;
var paddleHeight= 30;
var paddleWidth= 150;
var paddleX = canvas.width / 2 - paddleWidth / 2;
var paddleY = canvas.height - paddleHeight - 10;
var paddledx;
var rightpressed;
var leftpressed;
var cnter = 0;


let right = new Audio();
let left = new Audio();
let punkt = new Audio();
let main = new Audio();

right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
punkt.src ="audio/Punkt.mp3";
main.src ="audio/backgroundmusic.mp3"
right.volume = 0.3;
left.volume = 0.3;
punkt.volume = 0.5;
main.volume = 0.7;

let gutGespielt = new Image();
gutGespielt.src = "img/ggalert.png";


function keyDownHandler(event){
if (event.keyCode == 39){
    rightpressed = true;
    right.play();
    } else if (event.keyCode == 37)  {
    leftpressed = true;
    left.play()
    } 
}

function keyUpHandler(event){
    if(event.keyCode == 37){
       leftpressed = false;
        
       } else if (event.keyCode == 39){ 
       rightpressed = false;
          
       }
}

document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup', keyUpHandler,false);

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawScore(){
    ctx.fillStyle = "#3d3d29";
    ctx.strokeStyle = "#3d3d29";
    ctx.beginPath();
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Ball gelandet: " + Math.floor((cnter / 2)), 15 ,30);
    ctx.fillStyle = "#3d3d29";
    ctx.strokeStyle = "#3d3d29";
    ctx.fill();
    ctx.closePath();
    
}

function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height)
  drawBall();
  drawPaddle();
       
  if (x + xrichtung < ballRadius || x + xrichtung > canvas.width - ballRadius){
      xrichtung = -xrichtung;
  } 
    
  if (y + yrichtung < ballRadius ||(y + yrichtung > canvas.height -paddleHeight - ballRadius && x + xrichtung > paddleX && x + xrichtung < paddleX + paddleWidth )) {  
    yrichtung = -yrichtung; 
    cnter++; 
  } else if(y + yrichtung > canvas.height){
      location.reload();
  }
    
if (Math.floor(cnter / 2) == 10){ punkt.play();
     ctx.drawImage(gutGespielt, 200, 200);
    } 
if (Math.floor(cnter / 2) == 15){
     canvas.style.backgroundColor = "gray";
     xrichtung = 10;
     yrichtung = 10; 
                                 }   
if (Math.floor(cnter / 2) == 25){
      punkt.play();
      ctx.drawImage(gutGespielt, 200, 200);
    }
if (Math.floor(cnter / 2) == 30){    
    canvas.style.backgroundColor = "gold";
      xrichtung = 12;
      yrichtung = 12;
}
if (Math.floor(cnter / 2) == 40){
   document.body.style.backgroundColor ="#1a0000";
} 
if (Math.floor(cnter / 2) == 42){
   document.body.style.backgroundColor ="#0059b3";
} 
if (Math.floor(cnter / 2) == 44){
   document.body.style.backgroundColor ="#333300";
}
if (Math.floor(cnter / 2) == 46){
   document.body.style.backgroundColor ="#2d862d";
   canvas.style.backgroundColor = "aliceblue"
} 
if (Math.floor(cnter / 2) == 48){
   document.body.style.backgroundColor ="#86592d";
   
} 
if (Math.floor(cnter / 2) == 50){
    alert("Du hast gewonnen!");
    Math.floor(cnter / 2) = 51;
}
    
    
  if(rightpressed && (paddleWidth + paddleX) < canvas.width){
    paddledx = 7;
    paddleX += paddledx;
  } else if (leftpressed && paddleX > 0){
      paddledx = 7;
      paddleX -= paddledx;
  } else { paddledx = 0;}
    
  drawScore();
  x+= xrichtung;
  y+= yrichtung;
requestAnimationFrame(draw);
  main.play();
}

draw();


function analysierer(){
    console.log("Paddle: "+paddleX);
}

setInterval(analysierer,1000)