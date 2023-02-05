import classNames from "classnames";
import React, { FC } from "react";
import { Cell } from "../../model/Cell";
import { Field } from "../../model/Field";
import { Player } from "../../model/Player";
import CellComponent from "../CellComponent";
import styles from "./FieldComponents.module.css";

interface FieldProps {
  field: Field;
  currentPlayer: Player;
  player: Player;
  isEnemy?: boolean;
  setField: (field: Field) => void;
  swapPlayer: () => void;
  setWinner: (player: Player) => void;
}

const letters = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];

const FieldComponent: FC<FieldProps & React.HTMLAttributes<HTMLDivElement>> = ({
  field,
  setField,
  isEnemy = false,
  swapPlayer,
  player,
  currentPlayer,
  setWinner,
  ...props
}) => {
  const updateField = () => {
    const newField = field.getCopy();
    setField(newField);
  };

  const handlerAttackButton = (cell: Cell) => {
    const result = currentPlayer.attack(cell);

    updateField();

    if (!player.isAlive()) {
      setWinner(currentPlayer);
    }
    if (!result) {
      // если игрок попал ход не переходит
      swapPlayer();
    }
  };

  return (
    <div className={classNames(styles.field, props.className)}>
      <div className={styles.header}></div>
      {letters.map((header) => (
        <div key={header} className={styles.header}>
          {header}
        </div>
      ))}
      {field.cells.map((row, index) => (
        <React.Fragment key={index}>
          <div className={styles.header}>{index + 1}</div>
          {row.map((cell, index) => (
            <CellComponent
              isEnemy={isEnemy}
              status={cell.status}
              cell={cell}
              key={index}
              onClick={isEnemy ? handlerAttackButton : () => {}}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FieldComponent;
