let x = 50, y = 50;

function setup() {
  var canvas = createCanvas(800, 550);
  }
  
  function draw() {
    background(220);
    circle(x,y,25);
  }

  function update(){
   x++;
   y++;
  }