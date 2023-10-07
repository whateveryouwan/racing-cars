var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var allPlayers
var track
var car1img
var car2img
var cars=[]
var car1
var car2
var coinImg
var coins
var obstacle1Img,obstacle2Img,obstacles
var fuelImg,fuels
var lifeImg

//adds all the images
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  track=loadImage("./assets/track.jpg")
  car1img=loadImage("./assets/car1.png")
  car2img=loadImage("./assets/car2.png")
  coinImg=loadImage("./assets/goldCoin.png")
  obstacle1Img=loadImage("./assets/obstacle1.png")
  obstacle2Img=loadImage("./assets/obstacle2.png")
  fuelImg=loadImage("./assets/fuel.png")
  lifeImg=loadImage("./assets/life.png")
}


//used to set up the game
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState()
}
//used to display the images an make the fuction go over infinte times
function draw() {
  background(backgroundImage);

  if (playerCount == 2) {
    game.update(1)
  }

  if (gameState==1){
    game.play()
    
  }
}
//makes the screen size of the game
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
