import React, { FC } from "react";
import { Cell, CellStatus } from "../../model/Cell";
import classnames from "classnames";
import styles from "./CellComponent.module.css";

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
      className={classnames(styles.cell, {
        [styles.dead]: status === CellStatus.DEAD,
        [styles.alive]: status === CellStatus.ALIVE && !isEnemy,
        [styles.free]: status === CellStatus.FREE,
      })}
    ></div>
  );
};

export default CellComponent;
