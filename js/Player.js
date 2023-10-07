class Player {
  constructor() {
    this.name = null;
    this.index = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.life = 185
    this.fuel = 185
  }

  // it gives the player count to the fire base
  getCount() {
    var playerCountRef = database.ref('playerCount')
    playerCountRef.on("value", (data) => {
      playerCount = data.val()
    })
  }

  
 
  //it updates the player count
  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    })
  }
 
  // updates the x and y position of the cars
  update() {
    var playerIndex = 'players/player' + this.index
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank:this.rank,
      score:this.score,
      life:this.life
    })
  }

  //adds the players

  addPlayer() {

    var playerIndex = 'players/player' + this.index
    if (this.index == 1) {
      this.positionX = width / 2 - 100
    }
    else {
      this.positionX = width / 2 + 100
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    })



  }

  // static method is only accessible through the class
  static getPlayersInfo() {
    var playerInfoRef = database.ref("/players")
    playerInfoRef.on('value', data => {
      allPlayers = data.val()
      //console.log(allPlayers)
    })
  }

  getCarsAtEnd(){
    database.ref('carsAtEnd').on('value',(data)=>{
      this.rank=data.val()
    })
    
  
  }

  static updateCarsAtEnd(rank){
    database.ref('/').update({
      carsAtEnd:rank
    })
  }

  getDistance() {
    var playerDistanceRef= database.ref("players/player" + this.index)
    playerDistanceRef.on("value",data => {
      var data = data.val()
      this.positionX=data.positionX;
      this.positionY=data.positionY
    })
  }


}
