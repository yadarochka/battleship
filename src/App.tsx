import classNames from "classnames";
import { useEffect, useState } from "react";
import "./App.css";
import FieldComponent from "./components/FieldComponent/FieldComponent";
import { Computer } from "./model/Computer";
import { Field } from "./model/Field";
import { Player, PlayerType } from "./model/Player";
import { sleep } from "./utils/sleep";

function App() {
  const [player, setPlayer] = useState(new Player(PlayerType.PLAYER));
  const [enemy, setEnemy] = useState(new Computer(PlayerType.ENEMY));
  const [currentPlayer, setCurrentPlayer] = useState(player);

  const [playerField, setPlayerField] = useState(player.field);
  const [enemyField, setEnemyField] = useState(enemy.field);

  const startGame = () => {
    const newPlayer = new Player(PlayerType.PLAYER);
    newPlayer.name = "Данил" || "";
    newPlayer.field = new Field(newPlayer);
    newPlayer.field.initialCells();
    newPlayer.field.setupShips();
    setPlayer(newPlayer);

    const newEnemy = new Computer(PlayerType.ENEMY);
    newEnemy.name = "Компьютер";
    newEnemy.field = new Field(newEnemy);
    newEnemy.field.initialCells();
    newEnemy.field.setupShips();
    setEnemy(newEnemy);

    setCurrentPlayer(newPlayer);
  };
  useEffect(() => {
    startGame();
  }, []);

  // ходы компьютера
  useEffect(() => {
    console.log(currentPlayer === enemy);
    if (currentPlayer === enemy) {
      computerAttack();
    }
  }, [currentPlayer]);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer.playerType === player.playerType ? enemy : player
    );
  }

  const computerAttack = () => {
    sleep(1).then(() => {
      const result = enemy.preparingForAttack(player);
      if (!result) {
        swapPlayer();
      } else {
        computerAttack();
        setPlayerField(player.field.getCopy());
      }
    });
  };

  return (
    <div className="app">
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
      <div className="game-info">
        <div>Ход игрока {currentPlayer?.name}</div>
        <button onClick={startGame}>Рестарт</button>
      </div>
      <div className="column">
        <div>Поле игрока {enemy.name}</div>
        <FieldComponent
          className={classNames("field", {
            "disabled-field": currentPlayer !== player,
          })}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          field={enemy.field}
          setField={setEnemyField}
          isEnemy
        />
      </div>
    </div>
  );
}

export default App;
