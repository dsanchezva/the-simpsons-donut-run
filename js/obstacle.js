console.log("obstacle");
class Obstacle {
  constructor(randomPoss, donut) {
    this.randomPoss = randomPoss;
    this.donut = donut;
    this.speed = 1; //velocidad inicial de caida
    // crear el elemento
    this.obstacleNode = document.createElement("img");
    if (this.donut === true) {
      this.obstacleNode.src = "./images/donut-50.png";
      gameBoxNode.append(this.obstacleNode);
    } else {
      this.obstacleNode.src = "./images/brocoli.png";
      gameBoxNode.append(this.obstacleNode);
    }
    //dimensiones

    this.w = 50;
    this.h = 50;
    this.x = this.randomPoss; //posicion lateral
    this.y = -50; //posicion vertical

    //cambiar las dimensiones en el dom
    this.obstacleNode.style.width = `${this.w}px`;
    this.obstacleNode.style.height = `${this.h}px`;
    this.obstacleNode.style.position = "absolute";
    this.obstacleNode.style.top = `${this.y}px`;
    this.obstacleNode.style.left = `${this.x}px`;
  }

  movement = () => {
    this.y += this.speed;
    this.obstacleNode.style.top = `${this.y}px`;
  };
}
