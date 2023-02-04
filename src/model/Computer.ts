import { getRandomInt } from "../utils/getRandomInt";
import { Player } from "./Player";

export class Computer extends Player {
  preparingForAttack(player: Player) {
    const ky = getRandomInt(0, 9);
    const kx = getRandomInt(0, 9);
    return this.attack(player.field.cells[ky][kx]);
  }
  public getCopy() {
    const newComputer = new Computer();
    newComputer.name = this.name;
    newComputer.field = this.field;
    return newComputer;
  }
}
