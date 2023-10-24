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
    this.speedObstacles = 1;

    this.audioOuch = new Audio();
    this.audioYuhu = new Audio();
    //crear el sonido
  }

  //Funcionalidades del juego
  levelUp = () => {
    if (this.point % 10 === 0) {
      //por cada 10 niveles sube la velocidad
      this.speedObstacles += 0.2;
      this.level++;
    } else if (this.point % 5 === 0) {
      //por cada 5 niveles aumentan los objetos
      if (this.dificultUp > 20) {
        this.dificultUp -= 20;
        this.level++;
      }
    }
  };
  //Iformacion del juego en el DOM
  undateInfo = () => {
    console.log(this.lives);
    if (this.lives < 3) {
      lifeThreeNode.style.display = "none";
    }
    if (this.lives < 2) {
      lifeTwoNode.style.display = "none";
    }
    if (this.lives < 1) {
      lifeOneNode.style.display = "none";
    }

    scoreNode.innerText = `${this.point}`;
    levelNode.innerText = `${this.level}`;
  };

  //creacion de objetos
  obstacleAppear = () => {
    //selector de donut o blrocoli
    let donut = true;
    //selector de tipo de objeto random 60% brocolis
    let randomSelector = Math.random() * 10;
    if (randomSelector > 4) {
      donut = false;
    } else {
      donut = true;
    }

    //creadion de objetos
    if (this.timer % this.dificultUp === 0) {
      //posicion random
      let randomPoss = Math.random() * 500;
      if (donut === true) {
        let newDonutObject = new Obstacle(
          randomPoss,
          donut,
          this.speedObstacles
        );
        this.gameObjectsArr.push(newDonutObject);
      } else {
        let newHealtyObject = new Obstacle(
          randomPoss,
          donut,
          this.speedObstacles
        );
        this.gameObjectsArr.push(newHealtyObject);
      }
    }
  };
  //rotacion de los donuts
  donutsRotation = () => {};
  //desaparicion de objetos

  obstaclesDisapear = () => {
    if (this.gameObjectsArr.length > 0) {
      if (this.gameObjectsArr[0].y > 500) {
        this.gameObjectsArr[0].obstacleNode.remove();
        this.gameObjectsArr.shift();
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
          this.point++;
          //eliminamos el objeto del juego
          this.gameObjectsArr[index].obstacleNode.remove();
          this.gameObjectsArr.splice(index, 1);
          //llamada para aumentar el nivel
          this.levelUp();
          this.sonidoColisionDonut();
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
          this.gameObjectsArr[index].obstacleNode.remove();
          this.gameObjectsArr.splice(index, 1);
          this.lives--;
          this.gameOver();
          this.sonidoColisionBrocoli();
        }
      }
    });
  };
  //sonido colision
  sonidoColisionBrocoli = () => {
    this.audioOuch.src = "./audio/homero-ouch-f.mp3";
    this.audioOuch.volume = 0.1;
    this.audioOuch.play().then(() => {
      return true;
    });
  };
  sonidoColisionDonut = () => {
    this.audioYuhu.src = "./audio/homer_simpson_yuju.mp3";
    this.audioYuhu.volume = 0.1;
    this.audioYuhu.play().then(() => {
      return true;
    });
  };

  gameOver = () => {
    if (this.lives === 0) {
      this.gameIsOn = false; //paramos el gameloop
      gameScreenNode.style.display = "none"; //desctivamos la pantalla de juego
      gameOverScreenNode.style.display = "flex"; //activamos la pantalla del final
    }
  };

  //gameLoop
  gameLoop = () => {
    //creacion de objetos
    this.obstacleAppear();
    //creacion datos del juego
    this.undateInfo();
    //eliminacion de objetos
    this.obstaclesDisapear();
    //colision de objetos
    this.collisionObstacles();
    //movimiento de los objetos
    this.gameObjectsArr.forEach((eachObject) => {
      eachObject.movement();
      eachObject.donutRotation();
    });

    this.timer++;
    //recursion
    if (this.gameIsOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
