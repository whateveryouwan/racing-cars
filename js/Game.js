class Game {
  constructor() {
    this.resetButton = createButton("reset");
    this.leaderboardtitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")

  }
  //starts the game if there is 2 players
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount()

    car1 = createSprite(width / 2 - 50, height - 100)
    car2 = createSprite(width / 2 + 50, height - 100)

    car1.addImage("car1", car1img)
    car2.addImage("car2", car2img)
    car1.scale = 0.07
    car2.scale = 0.07
    cars = [car1, car2]

    coins = new Group()
    this.addSprites(coins, 20, coinImg, 0.1)

    obstacles = new Group()
    fuels = new Group()
    this.addSprites(fuels, 4, fuelImg, 0.02)

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Img },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Img },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Img },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Img },
      { x: width / 2, y: height - 2800, image: obstacle2Img },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Img },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Img },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Img },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Img },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Img },
      { x: width / 2, y: height - 5300, image: obstacle1Img },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Img }
    ];

    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Img, 0.04, obstaclesPositions)

  }

  addSprites(spritesGroup, numberOfSprites, spriteImg, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      if (positions.length < 0) {
        x = positions[i].x
        y = positions[i].y
        spriteImg = positions[i].image

      }

      x = random(width / 2 + 150, width / 2 - 150)
      y = random(-height * 4.5, height - 400)
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImg);
      sprite.scale = scale;
      spritesGroup.add(sprite)


    }
  }

  //handles the title
  handleelements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class('gameTitleAfterEffect')

    this.leaderboardtitle.html("Leaderboard")
    this.leaderboardtitle.class("resetText")
    this.leaderboardtitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText")
    this.leader1.position(width / 3 - 50, 80)

    this.leader2.class("leadersText")
    this.leader2.position(width / 3 - 50, 130)


    this.resetButton.position(width / 2 + 230, 40);
    this.resetButton.class('resetButton')


  }

  // makes play gameState
  play() {
    this.handleelements();
    this.handleResetButton()
    Player.getPlayersInfo();

    player.getCarsAtEnd()

    if (allPlayers !== undefined) {


      image(track, 0, -height * 5, width, height * 6)
      this.showFuelBar()

      this.showLifeBar()

      this.showLeaderboard()

      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1


        //use the data from the database to display the moving cars
        var x = allPlayers[plr].positionX
        var y = height - allPlayers[plr].positionY


        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        if (index == player.index) {
          fill("red")
          ellipse(x, y, 60, 60)
          this.handleCoins(index)
          //changing camera postion
          camera.position.y = cars[index - 1].position.y

        }


      }
      this.handlePlayerControls()

      const finishline = height * 6 - 100
      if (player.positionY > finishline) {
        gameState = 2
        player.rank += 1
        console.log(player.rank)
        Player.updateCarsAtEnd(player.rank)
        player.update()
        this.showRank()
      }
      drawSprites()
    }



  }
  //reset the database
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        carsAtEnd: 0,
        players: {}

      })
      window.location.reload()
    })
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    })
  }

  //adds the car controls
  handlePlayerControls() {
    console.log("moving");
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 1
      player.update()
    }
  }

  //gets the gameState
  getState() {
    var gamestateRef = database.ref('gameState')

    gamestateRef.on("value", function (data) {
      gameState = data.val();
    })
  }

  // updates the waiting screen to the track
  update(state) {
    database.ref('/').update({
      gameState: state
    })
  }

  showLeaderboard() {
    var leader1, leader2
    var players = Object.values(allPlayers)
    if (players[0].rank == 0 && players[1].rank == 0 || players[0].rank == 0) {
      //&emsp one tab of space 
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score

    }
    if (players[1].rank == 1) {
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
    }
  }

  showLifeBar(){
    push()
    image(lifeImg,width/2-130,height-player.positionY-300,20,20)
    fill('white')
    rect(width/2-100,height-player.postionY-300,185,20)
    fill('#f50057')
    rect(width/2-100,height-player.postionY-300,player.life,20)
    pop()
  }

  showFuelBar(){
    push()
    image(fuelImg,width/2-130,height-player.positionY-350,50,50)
    fill('white')
    rect(width/2-100,height-player.postionY-350,185,40)
    fill('#f50057')
    rect(width/2-100,height-player.postionY-350,player.fuel,20)
    pop()
  }

  handleCoins(index) {
    cars[index - 1].overlap(coins, function (collector, collected) {
      player.score += 20;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove()
    })
  }
}
