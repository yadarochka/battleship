import { Cell, CellStatus } from "./Cell";
import { Field } from "./Field";

export enum PlayerType {
  "PLAYER" = "player",
  "ENEMY" = "enemy",
}

export class Player {
  playerType;
  name: string = "";
  field: Field = new Field(this);
  constructor(playerType: PlayerType) {
    this.playerType = playerType;
  }

  attack(target: Cell) {
    if (target.player === this) {
      return true;
    }
    if (target.status === CellStatus.DEAD) {
      return true;
    }
    if (target.status === CellStatus.ALIVE) {
      target.setStatus(CellStatus.DEAD);
      return true;
    }
    if (target.status === CellStatus.EMPTY) {
      target.setStatus(CellStatus.FREE);
      return false;
    }
  }
}
