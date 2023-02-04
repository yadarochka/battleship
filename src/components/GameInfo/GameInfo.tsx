import React, { FC } from "react";
import { Computer } from "../../model/Computer";
import { Player } from "../../model/Player";
import { useIsTablet } from "../../utils/useIsTablet";
import ShipsInfo from "../ShipsInfo";
import styles from "./GameInfo.module.css";

interface GameInfoProps {
  currentPlayer: Player;
  player: Player;
  enemy: Computer;
  startGame: () => void;
  changeNames: () => void;
}

const GameInfo: FC<GameInfoProps> = ({
  currentPlayer,
  player,
  enemy,
  startGame,
  changeNames,
}) => {
  const isTablet = useIsTablet();

  if (isTablet) {
    return (
      <div className={styles.info}>
        <div className={styles.moves}>Ход игрока {currentPlayer?.name}</div>
        <div className={styles.buttons}>
          <button onClick={startGame}>Рестарт</button>
          <button onClick={changeNames}>Сменить имена</button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.info}>
      <div className={styles.moves}>Ход игрока {currentPlayer?.name}</div>
      <div className={styles.row}>
        <ShipsInfo ships={player.field.ships} />
        <ShipsInfo ships={enemy.field.ships} />
      </div>
      <div className={styles.buttons}>
        <button onClick={startGame}>Рестарт</button>
        <button onClick={changeNames}>Сменить имена</button>
      </div>
    </div>
  );
};

export default GameInfo;
