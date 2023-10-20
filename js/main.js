console.log("main");
//elementos del DOM
let startBtnNode = document.querySelector("#start-btn");
let startScreenNode = document.querySelector("#start-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameBoxNode = document.querySelector("#game-box");

//valirable vacia para invocar el objeto juego
let gameObject;

//Star el juego
const startGame = () => {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //comienza el gameLoop
  gameObject = new Game();
  gameObject.gameLoop();
};

//event listener
//boton Start
startBtnNode.addEventListener("click", startGame);
//movimiento con la tecla
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    gameObject.homer.movementLeft();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    gameObject.homer.movementRight();
  }
});
