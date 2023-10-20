console.log("game");
class Game {
  constructor() {
    this.gameIsOn = true; //para poder parar el juego
  }

  //Funcionalidades del juego

  //creacion de Homer

  //creacion de objetos

  //gameLoop
  gameLoop = () => {
    console.log("recursion funcionando");
    //recursion
    //if (this.gameIsOn === true) {
    requestAnimationFrame(this.gameLoop);
    //}
  };
}
