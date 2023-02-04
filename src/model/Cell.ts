export enum CellStatus {
  "EMPTY" = "empty",
  "ALIVE" = "alive",
  "DEAD" = "dead",
  "FREE" = "free",
}

export class Cell {
  readonly x: number;
  readonly y: number;
  status: CellStatus = CellStatus.EMPTY;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setStatus(status: CellStatus) {
    this.status = status;
  }

  log() {
    console.log(this.status);
  }
}
