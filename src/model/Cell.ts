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
  ship: Ship | null = null;
  status: CellStatus = CellStatus.EMPTY;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public setStatus(status: CellStatus) {
    this.status = status;
  }

  public setShip(ship: Ship) {
    this.ship = ship;
  }
}
