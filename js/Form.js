class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
 
  }


  // hides the loading screen when the track comes on
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }
//set the components of the waiting screen
  setElementsPosition(){
    this.titleImg.position(150,50);
    this.input.position(width/2 - 110,height/2 - 80)
    this.playButton.position(width/2-90,height/2 - 20)
    this.greeting.position(width/2-300,height/2-100)
  }
//add the images of the loading screen
  setElementsStyle(){
    this.titleImg.class('gameTitle')
    this.input.class('customInput')
    this.playButton.class('customButton')
    this.greeting.class('greeting')
  }
//adds what happens when the button for the name subistion is pressed
  handleMousePressed() {
    this.playButton.mousePressed(() =>{
      this.input.hide()
      this.playButton.hide()
      var message = `${this.input.value()}
      </br> Waiting for the other players to join ...
      `
      this.greeting.html(message)
      playerCount = playerCount + 1;

      player.name = this.input.value()
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount)
      player.getDistance()
    })
  }
//displays the elements
  display() {
    this.setElementsPosition()
    this.setElementsStyle()
    this.handleMousePressed()
  }
}

