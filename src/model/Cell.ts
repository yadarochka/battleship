import { Player } from "./Player";
import { Ship } from "./Ship";

export enum CellStatus {
  "EMPTY" = "empty",
  "ALIVE" = "alive",
  "DEAD" = "dead",
  "FREE" = "free",
}

export class Cell {
  readonly x: number;
  readonly y: number;
  player;
  ship: Ship | null = null;
  status: CellStatus = CellStatus.EMPTY;

  constructor(x: number, y: number, player: Player) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  public setStatus(status: CellStatus) {
    this.status = status;
  }

  public setShip(ship: Ship) {
    this.ship = ship;
  }
}
