import React, { FC, memo, useEffect, useState } from "react";
import { Cell, CellStatus } from "../../model/Cell";
import classnames from "classnames";

interface CellProps {
  isEnemy: boolean;
  cell: Cell;
  onClick: () => void;
}

const CellComponent: FC<CellProps> = ({ cell, onClick, isEnemy }) => {
  return (
    <div
      onClick={onClick}
      className={classnames("cell", {
        dead: cell.status === CellStatus.DEAD,
        alive: cell.status === CellStatus.ALIVE && !isEnemy,
        free: cell.status === CellStatus.FREE,
      })}
    ></div>
  );
};

export default CellComponent;
