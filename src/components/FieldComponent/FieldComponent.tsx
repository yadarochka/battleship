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
}

const FieldComponent: FC<FieldProps & React.HTMLAttributes<HTMLDivElement>> = ({
  field,
  setField,
  isEnemy = false,
  swapPlayer,
  currentPlayer,
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
    const result = field.player.attack(cell);
    updateField();
    // если игрок попал ход не переходит
    if (!result) {
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
