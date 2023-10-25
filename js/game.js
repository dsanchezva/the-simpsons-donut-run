console.log("game");
class Game {
  constructor() {
    this.gameIsOn = true; //para poder parar el juego
    this.homer = new Homer();

    this.gameObjectsArr = []; //array de objetos
    this.comodinObjectsArr = []; //array de comodines
    this.timer = 0;
    this.dificultUp = 120;
    this.level = 0;
    this.point = 0;
    this.lives = 3;
    this.speedObstacles = 1;
    this.superHomer = false; //no hay colision cuando esta activo
    this.superVelocidad = false; //aumentamos la velocidad cuando esta activo
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
      this.comodinAppear();
      this.backgroundChange();
    } else if (this.point % 5 === 0) {
      //por cada 5 niveles aumentan los objetos
      if (this.dificultUp > 20) {
        this.dificultUp -= 20;
        this.level++;
        this.comodinAppear();
        this.backgroundChange();
      }
    }
  };
  //Iformacion del juego en el DOM
  undateInfo = () => {
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
  //creacion de comodines
  comodinAppear = () => {
    //selector de cerveza  o barra de plutonio
    let beer = true;
    //selector de tipo de objeto random 50%
    let randomSelector2 = Math.random() * 10;
    if (randomSelector2 > 5) {
      beer = false;
    } else {
      beer = true;
    }
    //creacion del comodin
    let randomPossComodin = Math.random() * 500;
    if (beer === true) {
      console.log("duff");
      let newBeerObjects = new Comodin(
        randomPossComodin,
        beer,
        this.speedObstacles
      );
      this.comodinObjectsArr.push(newBeerObjects);
    } else {
      console.log("plutonio");
      let newPutonObject = new Comodin(
        randomPossComodin,
        beer,
        this.speedObstacles
      );
      this.comodinObjectsArr.push(newPutonObject);
    }
  };
  //desaparicion de objetos

  obstaclesDisapear = () => {
    if (this.gameObjectsArr.length > 0) {
      if (this.gameObjectsArr[0].y > 500) {
        this.gameObjectsArr[0].obstacleNode.remove();
        this.gameObjectsArr.shift();
      }
    }
    if (this.comodinObjectsArr.length > 0) {
      if (this.comodinObjectsArr[0].y > 500) {
        this.comodinObjectsArr[0].comodinNode.remove();
        this.comodinObjectsArr.shift();
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
          //cambio de icono cuando colisiona con un donut
          this.homer.homerNode.style.width = `80px`;
          this.homer.homerNode.style.height = `80px`;
          this.homer.homerNode.src = "./images/homer-happy.png";

          setTimeout(() => {
            if (this.superHomer === false) {
              this.homer.homerNode.src = "./images/homer-icon-big.png";
            } else {
              this.homer.homerNode.style.width = `90px`;
              this.homer.homerNode.style.height = `150px`;
              this.homer.homerNode.style.top = `255px`;
              this.homer.homerNode.src = "./images/super-homer.png";
            }
          }, 500);
        }
      } else if (this.superHomer === false) {
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
          //cambio de icono cuando colisiona con un brocoli
          this.homer.homerNode.src = "./images/homer-angry-100.png";
          setTimeout(() => {
            if (this.superHomer === false) {
              this.homer.homerNode.src = "./images/homer-icon-big.png";
            } else {
              this.homer.homerNode.src = "./images/super-homer.png";
            }
          }, 500);
        }
      }
    });
    //colision de los comodines
    this.comodinObjectsArr.forEach((comodin, index) => {
      if (comodin.beer === true) {
        if (
          comodin.x < this.homer.x + this.homer.w &&
          comodin.x + comodin.w > this.homer.x &&
          comodin.y < this.homer.y + this.homer.h &&
          comodin.y + comodin.h > this.homer.y
        ) {
          // Collision detectedcon cerveza
          //eliminamos el objeto del juego
          this.comodinObjectsArr[index].comodinNode.remove();
          this.comodinObjectsArr.splice(index, 1);
          this.sonidoColisionDonut();
          //cambio de icono cuando colisiona con una cerveza
          this.homer.homerNode.src = "./images/super-homer.png";
          this.superHomer = true;
          this.homer.homerNode.style.width = `90px`;
          this.homer.homerNode.style.height = `150px`;
          this.homer.homerNode.style.top = `255px`;
          setTimeout(() => {
            this.homer.homerNode.src = "./images/homer-icon-big.png";
            this.superHomer = false;
            this.homer.homerNode.style.width = `80px`;
            this.homer.homerNode.style.height = `80px`;
            this.homer.homerNode.style.top = `325px`;
          }, 15000);
        }
      } else {
        //plutonio collision
        if (
          comodin.x < this.homer.x + this.homer.w &&
          comodin.x + comodin.w > this.homer.x &&
          comodin.y < this.homer.y + this.homer.h &&
          comodin.y + comodin.h > this.homer.y
        ) {
          // Collision detected!
          this.comodinObjectsArr[index].comodinNode.remove();
          this.comodinObjectsArr.splice(index, 1);
          this.sonidoColisionBrocoli();
          //cambio de velocidad cuando colisiona con el plutonio
          this.superVelocidad = true;
          //activar super velocidad
          this.superSpeed();
          this.speedObstacles += 3;
          if (this.dificultUp > 20) {
            this.dificultUp -= 20;
          }
          setTimeout(() => {
            this.superVelocidad = false;
            this.speedObstacles -= 3;
            if (this.dificultUp > 20) {
              this.dificultUp += 20;
            }
          }, 4000);
        }
      }
    });
  };
  //supervelocidad
  superSpeed = () => {
    this.gameObjectsArr.forEach((eachObject, index) => {
      eachObject.speed += 5;
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
  //cambio de fondo
  backgroundChange = () => {
    if (this.level === 1) {
      gameBoxNode.style.backgroundImage = "src(`./images/fondo2.png`)";
    } else if (this.level === 2) {
    } else if (this.level === 3) {
    } else if (this.level === 4) {
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
    //movimiento de los comodines
    this.comodinObjectsArr.forEach((eachObject) => {
      eachObject.movement();
      eachObject.comodinRotation();
    });

    this.timer++;
    //recursion
    if (this.gameIsOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
