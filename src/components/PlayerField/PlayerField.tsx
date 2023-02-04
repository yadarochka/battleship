import React from "react";
import { Player } from "../../model/Player";
import FieldComponent from "../FieldComponent/FieldComponent";

interface PlayerField {
  player: Player;
}

const PlayerField: FC<PlayerField> = ({ player }) => {
  return (
    <div className="column">
      <div>Поле игрока {player.name}</div>
      <FieldComponent
        className={classNames("field", {
          "disabled-field": currentPlayer !== enemy,
        })}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
        field={player.field}
        setField={setPlayerField}
      />
    </div>
  );
};

export default PlayerField;
