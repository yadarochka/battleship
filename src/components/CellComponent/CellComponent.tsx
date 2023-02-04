import React, { FC, memo, useEffect, useState } from "react";
import { Cell, CellStatus } from "../../model/Cell";
import classnames from "classnames";

interface CellProps {
  isEnemy: boolean;
  cell: Cell;
  onClick: (cell: Cell) => void;
  status: CellStatus;
}

const CellComponent: FC<CellProps> = ({ cell, onClick, isEnemy, status }) => {
  return (
    <div
      onClick={() => onClick(cell)}
      className={classnames("cell", {
        dead: status === CellStatus.DEAD,
        alive: status === CellStatus.ALIVE && !isEnemy,
        free: status === CellStatus.FREE,
      })}
    ></div>
  );
};

export default CellComponent;
