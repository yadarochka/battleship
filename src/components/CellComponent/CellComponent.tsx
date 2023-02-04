import React, { FC, memo, useEffect, useState } from "react";
import { Cell, CellStatus } from "../../model/Cell";
import classnames from "classnames";

interface CellProps {
  cell: Cell;
  onClick: () => void;
}

const CellComponent: FC<CellProps> = ({ cell, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classnames("cell", {
        dead: cell.status === CellStatus.DEAD,
        alive: cell.status === CellStatus.ALIVE,
        free: cell.status === CellStatus.FREE,
      })}
    ></div>
  );
};

export default CellComponent;
