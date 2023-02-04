import { useEffect, useState } from "react";
import "./App.css";
import FieldComponent from "./components/FieldComponent/FieldComponent";
import { Field } from "./model/Field";
import { Player, PlayerType } from "./model/Player";

function App() {
  const [player, setPlayer] = useState(new Player(PlayerType.PLAYER));
  const [enemy, setEnemy] = useState(new Player(PlayerType.ENEMY));

  const startGame = () => {
    const newPlayer = new Player(PlayerType.PLAYER);
    newPlayer.name = "Данил" || "";
    newPlayer.field = new Field();
    newPlayer.field.initialCells();
    newPlayer.field.setupShips();
    setPlayer(newPlayer);

    const newEnemy = new Player(PlayerType.ENEMY);
    newEnemy.name = "Компьютер";
    newEnemy.field = new Field();
    newEnemy.field.initialCells();
    newEnemy.field.setupShips();
    setEnemy(newEnemy);
  };
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="app">
      <div className="column">
        <div>Поле игрока {player.name}</div>
        <FieldComponent field={player.field} />
      </div>
      <div className="column">
        <div>Поле игрока {enemy.name}</div>
        <FieldComponent field={enemy.field} isEnemy />
      </div>
    </div>
  );
}

export default App;
