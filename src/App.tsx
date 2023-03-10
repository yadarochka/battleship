import { useEffect, useState } from "react";
import "./App.css";
import GameInfo from "./components/GameInfo/GameInfo";
import PlayerField from "./components/PlayerField";
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
    sleep(0.5).then(() => {
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
      <PlayerField
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
        setWinner={setWinner}
        player={player}
        setPlayerField={setPlayerField}
      />
      <GameInfo
        currentPlayer={currentPlayer}
        player={player}
        enemy={enemy}
        startGame={startGame}
        changeNames={changeNames}
      />
      <PlayerField
        isEnemy
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
        setWinner={setWinner}
        player={enemy}
        setPlayerField={setEnemyField}
      />
    </div>
  );
}

export default App;
