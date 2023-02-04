import classNames from "classnames";
import { FC } from "react";
import { Computer } from "../../model/Computer";
import { Field } from "../../model/Field";
import { Player } from "../../model/Player";
import FieldComponent from "../FieldComponent";
import styles from "./PlayerField.module.css";

interface PlayerField {
  player: Player;
  currentPlayer: Player;
  setWinner: (player: Player) => void;
  swapPlayer: () => void;
  setPlayerField: (field: Field) => void;
  isEnemy?: boolean;
}

const PlayerField: FC<PlayerField> = ({
  player,
  currentPlayer,
  setWinner,
  swapPlayer,
  setPlayerField,
  isEnemy = false,
}) => {
  return (
    <div className={styles.playerField}>
      <div>Поле игрока {player.name}</div>
      <FieldComponent
        className={classNames({
          [styles.disabled]: currentPlayer === player,
          [styles.cursor]: !isEnemy,
        })}
        setWinner={setWinner}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
        field={player.field}
        setField={setPlayerField}
        isEnemy={isEnemy}
      />
    </div>
  );
};

export default PlayerField;
