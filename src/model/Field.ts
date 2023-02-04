import { getRandomInt } from "../utils/getRandomInt";
import { isOutsideOfArray } from "../utils/isOutsideOfArray";
import { Cell, CellStatus } from "./Cell";

export class Field {
  cells: Cell[][] = [];
  ships = [
    { shipCount: 1, size: 4 },
    { shipCount: 2, size: 3 },
    { shipCount: 3, size: 2 },
    { shipCount: 4, size: 1 },
  ];

  initialCells() {
    for (let x = 0; x < 10; x++) {
      const row = [];
      for (let y = 0; y < 10; y++) {
        row.push(new Cell(y, x));
      }
      this.cells.push(row);
    }
  }

  setupShips() {
    const ships = JSON.parse(JSON.stringify(this.ships));

    for (let ship of ships) {
      let { shipCount, size } = ship;
      if (shipCount <= 0) {
        continue;
      }
      let shipsPlaced = false;
      while (shipCount > 0) {
        let kx = getRandomInt(0, 9);
        let ky = getRandomInt(0, 9);
        console.log("точка", ky, kx);
        if (this.isHorizontalPlaceFree(ky, kx, size)) {
          for (let i = 0; i < size; i++) {
            this.cells[ky][kx + i].setStatus(CellStatus.ALIVE);
          }
          shipCount -= 1;
        } else if (this.isVerticalPlaceFree(ky, kx, size)) {
          for (let i = 0; i < size; i++) {
            this.cells[ky + i][kx].setStatus(CellStatus.ALIVE);
          }
          shipCount -= 1;
        }
        if (shipCount <= 0) {
          shipsPlaced = true;
        }
      }
    }
  }

  isCellFree(y: number, x: number) {
    console.log("смотрим точку", y, x);
    if (this.cells[y][x].status !== CellStatus.EMPTY) {
      return false;
    }
    // смотрим вокруг ячейки
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // если выходим за границы поля
        if (x + j < 0 || x + j > 9 || y + i > 9 || y + i < 0) {
          continue;
        }
        if (this.cells[y + i][x + j].status !== CellStatus.EMPTY) {
          return false;
        }
      }
    }
    return true;
  }

  isHorizontalPlaceFree(y: number, x: number, size: number) {
    if (length === 1) {
      return this.isCellFree(y, x);
    }
    // если выходим за границы, то поставить корабль не можем
    if (x + size > 9) {
      return false;
    }
    // проверяем голову корабля
    if (!this.isCellFree(y, x)) {
      return false;
    }
    // проверяем хвост корабля
    if (!this.isCellFree(y, x + size)) {
      return false;
    }

    return true;
  }

  isVerticalPlaceFree(y: number, x: number, size: number) {
    if (length === 1) {
      return this.isCellFree(y, x);
    }
    // если выходим за границы, то поставить корабль не можем
    if (y + size > 9) {
      return false;
    }
    // проверяем голову корабля
    if (!this.isCellFree(y, x)) {
      return false;
    }
    // проверяем хвост корабля
    if (!this.isCellFree(y + size, x)) {
      return false;
    }

    return true;
  }

  isOusideOfField = isOutsideOfArray(10);
}
