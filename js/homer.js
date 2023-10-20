console.log("homer");
class Homer {
  constructor() {
    //crear el elemento en el DOM
    this.homerNode = document.createElement("img"); //
    this.homerNode.src = "./images/homer-icon-80.png"; //
    gameBoxNode.append(this.homerNode);

    this.movementSpeed = 8; //velocidad de movimiento
    //dimensiones

    this.w = 80;
    this.h = 80;
    this.x = 300; //posicion lateral
    this.y = 325; //posicion vertical

    //cambiar las dimensiones en el dom
    this.homerNode.style.width = `${this.w}px`;
    this.homerNode.style.height = `${this.h}px`;
    this.homerNode.style.position = "absolute";
    this.homerNode.style.top = `${this.y}px`;
    this.homerNode.style.left = `${this.x}px`;
  }

  movementLeft = () => {
    if (this.x > -12) {
      this.x -= this.movementSpeed;
      this.homerNode.style.left = `${this.x}px`;
    }
  };
  movementRight = () => {
    if (this.x < 532) {
      this.x += this.movementSpeed;
      this.homerNode.style.left = `${this.x}px`;
    }
  };
}
