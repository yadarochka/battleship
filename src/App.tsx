import classNames from "classnames";
import { useEffect, useState } from "react";
import "./App.css";
import FieldComponent from "./components/FieldComponent/FieldComponent";
import ShipsInfo from "./components/ShipsInfo/ShipsInfo";
import { Computer } from "./model/Computer";
import { Field } from "./model/Field";
import { Player } from "./model/Player";
import { sleep } from "./utils/sleep";

function App() {
  const [winner, setWinner] = useState<Player | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [enemy, setEnemy] = useState(new Computer());
  const [currentPlayer, setCurrentPlayer] = useState(player);

  const [playerField, setPlayerField] = useState(player.field);
  const [enemyField, setEnemyField] = useState(enemy.field);

  useEffect(() => {
    startGame();
  }, []);
  // ходы компьютера
  useEffect(() => {
    if (currentPlayer === enemy) {
      computerAttack();
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (winner) {
      alert(`Победа игрока ${winner.name}`);
    }
  }, [winner]);

  const startGame = () => {
    const newPlayer = new Player();
    newPlayer.name =
      (localStorage.getItem("playerName")
        ? localStorage.getItem("playerName")
        : prompt("Введите своё имя")) || "Игрок без имени...";
    localStorage.setItem("playerName", newPlayer.name);
    newPlayer.field = new Field(newPlayer);
    newPlayer.field.initialCells();
    newPlayer.field.setupShips();
    setPlayer(newPlayer);

    const newEnemy = new Computer();
    newEnemy.name =
      (localStorage.getItem("enemyName")
        ? localStorage.getItem("enemyName")
        : prompt("Введите имя соперника")) || "Компьютер";
    localStorage.setItem("enemyName", newEnemy.name);
    newEnemy.field = new Field(newEnemy);
    newEnemy.field.initialCells();
    newEnemy.field.setupShips();
    setEnemy(newEnemy);

    setCurrentPlayer(newPlayer);
  };

  const changeNames = () => {
    const newPlayerName = prompt("Введите имя игрока");
    const newPlayer = player.getCopy();
    newPlayer.name = newPlayerName || "Игрок без имени...";
    localStorage.setItem("playerName", newPlayer.name);
    setPlayer(newPlayer);

    const newEnemyName = prompt("Введите имя соперника");
    const newEnemy = enemy.getCopy();
    newEnemy.name = newEnemyName || "Компьютер";
    localStorage.setItem("enemyName", newEnemy.name);
    setEnemy(newEnemy);

    setCurrentPlayer(currentPlayer === player ? newPlayer : newEnemy);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer === player ? enemy : player);
  };

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
          setWinner={setWinner}
          swapPlayer={swapPlayer}
          currentPlayer={currentPlayer}
          field={player.field}
          setField={setPlayerField}
        />
      </div>
      <div className="game-info">
        <div className="moves">Ход игрока {currentPlayer?.name}</div>
        <div className="row">
          <ShipsInfo ships={player.field.ships} />
          <ShipsInfo ships={enemy.field.ships} />
        </div>
        <div className="buttons">
          <button className="button" onClick={startGame}>
            Рестарт
          </button>
          <button className="button" onClick={changeNames}>
            Сменить имена
          </button>
        </div>
      </div>
      <div className="column">
        <div>Поле игрока {enemy.name}</div>
        <FieldComponent
          className={classNames("field", {
            "disabled-field": currentPlayer !== player,
          })}
          setWinner={setWinner}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          field={enemy.field}
          setField={setEnemyField}
        />
      </div>
    </div>
  );
}

export default App;
