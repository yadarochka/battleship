import { useEffect, useState } from "react";
import "./App.css";
import FieldComponent from "./components/FieldComponent/FieldComponent";
import { Field } from "./model/Field";

function App() {
  const [field, setField] = useState(new Field());

  const startGame = () => {
    const newField = new Field();
    newField.initialCells();
    newField.setupShips();
    setField(newField);
  };
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="app">
      <FieldComponent field={field} setField={setField} />
    </div>
  );
}

export default App;
