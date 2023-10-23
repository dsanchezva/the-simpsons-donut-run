console.log("game");
class Game {
  constructor() {
    this.gameIsOn = true; //para poder parar el juego
    this.homer = new Homer();

    this.gameObjectsArr = []; //array de objetos
    this.timer = 0;
    this.dificultUp = 120;
    this.level = 0;
    this.point = 0;
    this.lives = 3;
    this.speedObject = 2;
  }

  //Funcionalidades del juego
  levelUp = () => {
    if (level % 10 === 0) {
      this.dificultUp -= 5;
    }
  };

  //creacion de objetos
  obstacleAppear = () => {
    //selector de donut o blrocoli
    let donut = true;
    //selector de tipo de objeto random 70% brocolis
    let randomSelector = Math.random() * 10;
    if (randomSelector > 3) {
      donut = false;
    } else {
      donut = true;
    }
    //creadion de objetos
    if (this.timer % this.dificultUp === 0) {
      let randomPoss = Math.random() * 500;
      console.log(randomPoss);
      if (donut === true) {
        let newDonutObject = new Obstacle(randomPoss, donut);
        this.gameObjectsArr.push(newDonutObject);
      } else {
        let newHealtyObject = new Obstacle(randomPoss, donut);
        this.gameObjectsArr.push(newHealtyObject);
      }
    }
  };
  // colisiones de objetos
  collisionObstacles = () => {
    this.gameObjectsArr.forEach((obstacle, index) => {
      //donut collision
      if (obstacle.donut === true) {
        if (
          obstacle.x < this.homer.x + this.homer.w &&
          obstacle.x + obstacle.w > this.homer.x &&
          obstacle.y < this.homer.y + this.homer.h &&
          obstacle.y + obstacle.h > this.homer.y
        ) {
          // Collision detected!
          console.log("collision de donut");
          this.point++;
          //eliminamos el objeto del juego
          this.gameObjectsArr[index].obstacleNode.remove();
          this.gameObjectsArr.slice(index, 1);
        }
      } else {
        //brocoli collision
        if (
          obstacle.x < this.homer.x + this.homer.w &&
          obstacle.x + obstacle.w > this.homer.x &&
          obstacle.y < this.homer.y + this.homer.h &&
          obstacle.y + obstacle.h > this.homer.y
        ) {
          // Collision detected!
          console.log("collision de brocoli");
        }
      }
    });
  };

  //desaparicion de objetos

  obstaclesDisapear = () => {
    if (this.gameObjectsArr[0].y > 500) {
      this.gameObjectsArr[0].obstacleNode.remove();
      this.gameObjectsArr.shift();
    }
  };

  return;
  //gameLoop
  gameLoop = () => {
    //creacion de objetos
    this.obstacleAppear();
    //eliminacion de objetos
    this.obstaclesDisapear();
    //colision de objetos
    this.collisionObstacles();
    //movimiento de los objetos
    this.gameObjectsArr.forEach((eachObject) => {
      eachObject.movement();
    });

    this.timer++;
    //recursion
    if (this.gameIsOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
