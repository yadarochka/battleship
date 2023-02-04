import { Field } from "./Field";

export enum PlayerType {
  "PLAYER" = "player",
  "ENEMY" = "enemy",
}

export class Player {
  playerType;
  name: string = "";
  field: Field = new Field();
  constructor(playerType: PlayerType) {
    this.playerType = playerType;
  }
}
