import { Cell, CellStatus } from "./Cell";
import { Field } from "./Field";

export class Player {
  name: string = "";
  field: Field = new Field(this);

  public attack(target: Cell) {
    if (target.player === this) {
      return true;
    }
    if (
      target.status === CellStatus.DEAD ||
      target.status === CellStatus.FREE
    ) {
      return true;
    }
    if (target.status === CellStatus.ALIVE) {
      target.setStatus(CellStatus.DEAD);
      target.ship?.getInjury();
      if (target.ship?.status === "dead") {
        target.player.field.shipDead(target.ship);
      }
      return true;
    }
    if (target.status === CellStatus.EMPTY) {
      target.setStatus(CellStatus.FREE);
      return false;
    }
  }

  public getCopy() {
    const newPlayer = new Player();
    newPlayer.name = this.name;
    newPlayer.field = this.field;
    return newPlayer;
  }
}
