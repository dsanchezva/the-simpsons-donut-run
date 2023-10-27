class Comodin {
  constructor(randomPoss, beer, speed) {
    this.rotation = 0;
    this.randomPoss = randomPoss;
    this.beer = beer;
    this.speed = speed; //initial speed
    // create the element
    this.comodinNode = document.createElement("img");
    if (this.beer === true) {
      this.comodinNode.src = "./images/duff-beer.png";
      gameBoxNode.append(this.comodinNode);
    } else {
      this.comodinNode.src = "./images/plutonium.png";
      gameBoxNode.append(this.comodinNode);
    }
    //dimensiones
    if (beer === true) {
      this.w = 80;
      this.h = 50;
    } else {
      this.w = 40;
      this.h = 20;
    }
    this.x = this.randomPoss; //possition lateral
    this.y = -50; //possition vertical

    //change the  dimension on the DOM
    this.comodinNode.style.width = `${this.w}px`;
    this.comodinNode.style.height = `${this.h}px`;
    this.comodinNode.style.position = "absolute";
    this.comodinNode.style.top = `${this.y}px`;
    this.comodinNode.style.left = `${this.x}px`;
  }

  movement = () => {
    this.y += this.speed;
    this.comodinNode.style.top = `${this.y}px`;
  };
  comodinRotation = () => {
    this.rotation++;
    if (this.rotation === 360) {
      this.rotation = 0;
    }
    this.comodinNode.style.transform = `rotate(${this.rotation}deg)`;
  };
}
