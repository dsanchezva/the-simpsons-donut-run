console.log("game");
class Game {
  constructor() {
    this.gameIsOn = true; //para poder parar el juego
    this.homer = new Homer();
  }

  //Funcionalidades del juego

  //creacion de Homer

  //creacion de objetos

  //gameLoop
  gameLoop = () => {
    //recursion
    if (this.gameIsOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
