import { getRandomInt } from "../utils/getRandomInt";
import { Cell, CellStatus } from "./Cell";
import { Player } from "./Player";

export class Computer extends Player {
  preparingForAttack(player: Player) {
    const ky = getRandomInt(0, 9);
    const kx = getRandomInt(0, 9);
    return this.attack(player.field.cells[ky][kx]);
  }

  attack(cell: Cell) {
    if (cell.status === CellStatus.ALIVE) {
      cell.status = CellStatus.DEAD;
      return true;
    }
    if (cell.status === CellStatus.FREE) {
      return true;
    }
    if (cell.status === CellStatus.EMPTY) {
      cell.status = CellStatus.FREE;
      return false;
    }
    return false;
  }
}
