import { Cell, CellStatus } from "./Cell";
import { Field } from "./Field";

export class Ship {
  field;
  lenght;
  life;
  status = "alive";
  coords: Cell[] = [];
  constructor(lenght: number, field: Field) {
    this.lenght = lenght;
    this.life = lenght;
    this.field = field;
  }

  public getInjury() {
    this.life--;
    if (this.life === 0) {
      this.dead();
    }
  }

  public addCoords(cell: Cell) {
    this.coords.push(cell);
  }

  public dead() {
    this.status = "dead";
    for (let cell of this.coords) {
      this.openTheCell(cell);
    }
  }

  // если корабль уничтожен, открываем ячейки вокруг
  private openTheCell(cell: Cell) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // если выходим за границы поля
        if (
          cell.x + j < 0 ||
          cell.x + j > 9 ||
          cell.y + i > 9 ||
          cell.y + i < 0
        ) {
          continue;
        }
        if (
          this.field.cells[cell.y + i][cell.x + j].status === CellStatus.EMPTY
        ) {
          this.field.cells[cell.y + i][cell.x + j].status = CellStatus.FREE;
        }
      }
    }
  }
}
