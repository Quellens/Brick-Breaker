var canvas = document.getElementById("gameScreen"),
ctx = canvas.getContext("2d"),
x = canvas.width / 2,
y = canvas.height - 80,
xrichtung = 7,
yrichtung = -7,
ballRadius = 10,
paddleHeight= 30,
paddleWidth= 150,
paddleX = canvas.width / 2 - paddleWidth / 2,
paddleY = canvas.height - paddleHeight - 10,
paddledx, rightpressed, leftpressed,
cnter = 0;

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
  
}
main.play();
draw();

var mobiledevice = ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1));
if(mobiledevice){
  main.pause();
  var script = document.getElementById("script");
 var btn1 = document.createElement("button");
 btn1.innerHTML = "🠔";
 document.body.insertBefore(btn1, script);

 var btn2 = document.createElement("button");
btn2.innerHTML = "🠖"
document.body.insertBefore(btn2, script);
btn1.classList.add("button"); btn2.classList.add("button");
 
btn1.addEventListener("touchstart", ()=>{
  leftpressed = true;
  rightpressed = false;
})
btn2.addEventListener("touchstart", ()=>{
  leftpressed = false;
  rightpressed = true;
})
btn1.addEventListener("touchend", ()=>{
  leftpressed = false;
})

btn2.addEventListener("touchend", ()=>{
  rightpressed = false;
})
}
