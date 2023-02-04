import classNames from "classnames";
import { FC } from "react";
import { Field } from "../../model/Field";
import { Player } from "../../model/Player";
import { useIsMobile } from "../../utils/useIsMobile";
import { useIsTablet } from "../../utils/useIsTablet";
import FieldComponent from "../FieldComponent";
import ShipsInfo from "../ShipsInfo";
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
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  console.log(isMobile, isTablet);

  if (isMobile) {
    return (
      <div className={styles.column}>
        <div>Поле игрока {player.name} МОБ ВЕРСИЯ</div>
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
  }
  if (isTablet) {
    return (
      <div className={styles.row}>
        <div className={styles.column}>
          <div>Поле игрока {player.name} ПЛАНШЕТ ВЕРСИЯ</div>
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
        <ShipsInfo ships={player.field.ships} />
      </div>
    );
  }

  return (
    <div className={styles.column}>
      <div>Поле игрока {player.name} ОБЫЧНАЯ ВЕРСИЯ</div>
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
