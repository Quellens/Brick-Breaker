let playerScore = 0, speed = 8, paddle, ball, bricks, gameState, bcolor, paddlewidth, inp, inp2, inp3, rows = 10, bricksPerRow = 10;

let rightö = new Audio();
let leftö = new Audio();
let punkt = new Audio();
let main = new Audio();

const createColor = () => color(random(0, 255), random(0, 255), random(0, 255));

const createBricks = ()  => {
    let bricks = [], brickWidth = width / bricksPerRow;
    for (let row = 0; row < rows; row++) {
      for (let i = 0; i < bricksPerRow; i++) {
        brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25);
        bricks.push(brick);
      }
    }
    return bricks;
  }

function setup() {
  createCanvas(800, 600);
  gameState = 'menu';
  paddlewidth = 170;
  paddle = new Paddle(paddlewidth, speed);
  ball = new Ball();
  bcolor = createColor();
  bricks = createBricks();
  inp = createInput(paddlewidth.toString(), "range");
  inp2 = createInput("10", "number");
  inp3 = createInput("10", "number");
  rows = 10;
  bricksPerRow = 10;

// Game Music 
  rightö.src = "audio/right.mp3";
  leftö.src = "audio/left.mp3";
  punkt.src ="audio/Punkt.mp3";
  main.src ="audio/backgroundmusic.mp3"
  rightö.volume = 0.3;
  leftö.volume = 0.3;
  punkt.volume = 0.5;
  main.volume = 0.7;
 
}

function draw() {
  background(bcolor);
  paddle.display();
  if(gameState === 'playing') {
  //  main.play();
    ball.bounceEdge();
    ball.bouncePaddle();
    ball.update();

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left');
      leftö.play();
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right');
      rightö.play();
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      if (bricks[i].isColliding(ball)) {
        bricks.splice(i, 1);
        playerScore += 1;
        ball.reverse("y");
       } else {
        bricks[i].display();
      }
    }


    if(playerScore %  20 == 0 && playerScore !== 0) punkt.play();
    ball.display();

    textSize(32)
    fill(255)
    text(`Score:${playerScore}`, width - 150, 50)

    if (ball.belowBottom()) {
      gameState = 'Lose'
    }

    if (bricks.length === 0) {
      gameState = 'Win'
    }
  } else if(gameState === 'menu'){
    
    bricks.forEach(brck => brck.display())

    button1 = createButton('Change background-color');
    button1.position(width/2, height/2);
    button1.mousePressed(()=>{ 
     bcolor = createColor();
    });
    button2 = createButton('Start');
    button2.position(width/2 , height/2-20);
    button2.mousePressed(()=>{ 
     gameState = "playing";
     removeElements();
    });

    inp.position(100, height - 20);
    inp.attribute("min", 20)
    inp.attribute("max", 300)
    inp.mouseMoved(()=>{
    inp.attribute("oninput", "paddlewidth = this.value")
    paddlewidth = parseInt(paddlewidth);
    paddle = new Paddle(paddlewidth,speed);
    ball = new Ball();
    })

    button3 = createButton('New Bricks');
    button3.position(width/2 , height/2+20);
    button3.mousePressed(()=>{ 
    bricks = createBricks();
    });

    inp2.position(width/2 , height/2+40);
    inp2.attribute("min", 1)
    inp2.attribute("max", 15)   
    inp2.attribute("oninput", "rows = parseInt(this.value); bricks = createBricks();");

    inp3.position(width/2 , height/2+60)    
    inp3.attribute("min", 1)
    inp3.attribute("max", 30)
    inp3.attribute("oninput", "bricksPerRow = parseInt(this.value); bricks = createBricks();");
   

  } else {
    textSize(100)
    gameState === 'Lose' ? fill(55) : fill(55);
    let btnback = createButton("Back to the menu");
    btnback.position(width/ 2, height/ 2 + 200);
    btnback.mousePressed(()=>{
      gameState = "menu";
      removeElements();
      setup();
    })
   setInterval(()=>{
   
    if(main.volume <= 0.05){ main.pause()}
    else { main.volume -= 0.01;}
   }, 200)
    text(`You ${gameState}!`, width / 2 - 220, height / 2)
  }
}

class Paddle {
    constructor(width, speed) {
      this.width = width;
      this.height = 25;
      this.location = createVector((canvas.width / 2) - (this.width / 2) , height - 35);
      this.speed = {
        right: createVector(speed, 0),
        left: createVector(speed * -1, 0)
      };
    }
    
    

    display() {
      fill(color(25))
      rect(this.location.x, this.location.y, this.width, this.height)
    }
  
    move(direction) {
      this.location.add(this.speed[direction])
  
      if(this.location.x < 0) {
        this.location.x = 0
      } else if(this.location.x + this.width > width) {
        this.location.x = width - this.width   
      }
    }

  }

class Ball {
    constructor() {
      this.radius = 10;
      this.size = this.radius * 2
      this.location = createVector(paddle.location.x + (paddle.width / 2), (paddle.location.y - this.radius - 5))
      this.velocity = createVector(-5, 5)
      this.paddle = paddle
    }
  
    bouncePaddle() {
      if (this.location.x + this.radius >= this.paddle.location.x &&
          this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {          
            if (this.location.y + this.radius > this.paddle.location.y) {
              this.reverse('y');
              this.velocity.x = (this.location.x -this.paddle.location.x - this.paddle.width/2)/10;
              this.location.y = (this.paddle.location.y - this.radius - 1);
            }
          }
    }
  
    bounceEdge() {
      if (this.location.x + this.radius >= width) {
        this.location.x = width - this.radius;
        this.reverse('x')
      } else if(this.location.x - this.radius <= 0) {
        this.location.x = this.radius;
        this.reverse('x')
      } else if(this.location.y - this.radius <= 0) {
        this.location.y = this.radius;
        this.reverse('y')
      }
    }
  
    display() {
      fill(color(215))
      circle(this.location.x, this.location.y, this.size)
    }
  
    update() {
      this.location.add(this.velocity)
    }
  
    reverse(coord) {
      this.velocity[coord] *= -1
    }
  
    belowBottom() {
      return this.location.y - this.radius > paddle.location.y
    }
  }

  class Brick {
    constructor(location, width, height) {
      this.location = location
      this.width = width
      this.height = height
      this.color = createColor()
    }
  
    display() {
      fill(this.color)
      rect(this.location.x, this.location.y, this.width, this.height)
    }
  
    isColliding(ball) {
      const bool = (ball.location.y - ball.radius <= this.location.y + this.height &&
        ball.location.y + ball.radius >= this.location.y &&
        ball.location.x + ball.radius >= this.location.x &&
        ball.location.x - ball.radius <= this.location.x + this.width) 
     return bool;
    }
  }