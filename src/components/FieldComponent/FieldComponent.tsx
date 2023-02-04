import React, { FC } from "react";
import { Cell } from "../../model/Cell";
import { Field } from "../../model/Field";
import { Player } from "../../model/Player";
import CellComponent from "../CellComponent/CellComponent";

interface FieldProps {
  field: Field;
  setField: (field: Field) => void;
  swapPlayer: () => void;
  currentPlayer: Player;
  isEnemy?: boolean;
  setWinner: (player: Player) => void;
}

const FieldComponent: FC<FieldProps & React.HTMLAttributes<HTMLDivElement>> = ({
  field,
  setField,
  isEnemy = false,
  swapPlayer,
  currentPlayer,
  setWinner,
  ...props
}) => {
  const updateField = () => {
    const newField = field.getCopy();
    setField(newField);
  };

  const handlerAttackButton = (cell: Cell) => {
    if (cell.player === currentPlayer) {
      return;
    }
    const result = currentPlayer.field.player.attack(cell);

    updateField();
    if (
      cell.player.field.ships.filter((ship) => ship.status === "alive")
        .length === 0
    ) {
      setWinner(currentPlayer);
    }
    if (!result) {
      // если игрок попал ход не переходит
      swapPlayer();
    }
  };

  return (
    <div className={props.className}>
      {field.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell, index) => (
            <CellComponent
              isEnemy={isEnemy}
              status={cell.status}
              cell={cell}
              key={index}
              onClick={handlerAttackButton}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FieldComponent;
