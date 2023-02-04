import { Cell, CellStatus } from "./Cell";

export class Ship {
  lenght;
  life;
  status = "alive";
  coords: Cell[] = [];
  constructor(lenght: number) {
    this.lenght = lenght;
    this.life = lenght;
  }

  getInjury() {
    this.life--;
    if (this.life === 0) {
      this.status = "dead";
    }
  }

  addCoords(cell: Cell) {
    this.coords.push(cell);
  }
}
