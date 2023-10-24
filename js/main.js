console.log("main");
//elementos del DOM
let startBtnNode = document.querySelector("#start-btn");
let startScreenNode = document.querySelector("#start-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameBoxNode = document.querySelector("#game-box");
let restartBtnNode = document.querySelector("#reset-btn");
//botones sonido
let muteBtnNode = document.querySelector("#mute-btn");
let soundOnBtnNode = document.querySelector("#unmute-btn");
//info para mostrar
let lifeOneNode = document.querySelector("#life1");
let lifeTwoNode = document.querySelector("#life2");
let lifeThreeNode = document.querySelector("#life3");

let scoreNode = document.querySelector("#score-nummber");
let levelNode = document.querySelector("#level-nummber");

//valirable vacia para invocar el objeto juego
let gameObject;
//crear el sonido
let soundBackground = new Audio();
let soundOn = true;
//Star el juego
const startGame = () => {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //comienza el gameLoop
  gameObject = new Game();
  gameObject.gameLoop();
};

//restart del juego
const restartGame = () => {
  gameOverScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  lifeTwoNode.style.display = "block";
  lifeThreeNode.style.display = "block";

  gameBoxNode.innerHTML = ``;
  //comienza el gameLoop
  gameObject = new Game();
  gameObject.gameLoop();
};
//iniciar el sonido de fondo
const soundStart = () => {
  soundOn = true;
  console.log("soundStart");
};
const soundEnd = () => {
  soundOn = false;
  console.log("sound stop");
};
if (soundOn === true) {
  soundBackground.src = "./audio/sound-simpsons.mp3";
  soundBackground.volume = 0.1;
  soundBackground.play().then(() => {
    return true;
  });
}
//event listener
//boton Start
startBtnNode.addEventListener("click", startGame);
//reset boton
restartBtnNode.addEventListener("click", restartGame);
//mute boton
muteBtnNode.addEventListener("click", soundEnd);
soundOnBtnNode.addEventListener("click", soundStart);
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
