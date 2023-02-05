import { Cell, CellStatus } from "./Cell";
import { Field } from "./Field";

export class Player {
  name: string = "";
  field: Field = new Field(this);

  public attack(target: Cell) {
    if (
      target.status === CellStatus.DEAD ||
      target.status === CellStatus.FREE
    ) {
      return true;
    }
    if (target.status === CellStatus.ALIVE) {
      target.setStatus(CellStatus.DEAD);
      target.ship?.getInjury();
      return true;
    }
    if (target.status === CellStatus.EMPTY) {
      target.setStatus(CellStatus.FREE);
      return false;
    }
  }

  public isAlive() {
    return !!this.field.ships.filter((ship) => ship.status === "alive").length;
  }

  public getCopy() {
    const newPlayer = new Player();
    newPlayer.name = this.name;
    newPlayer.field = this.field;
    return newPlayer;
  }
}
