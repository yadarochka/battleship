import React, { FC, useEffect, useState } from "react";
import { Field } from "../../model/Field";
import CellComponent from "../CellComponent/CellComponent";

interface FieldProps {
  field: Field;
  setField: (board: Field) => void;
}

const FieldComponent: FC<FieldProps> = ({ field, setField }) => {
  return (
    <div className="field">
      {field.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell, index) => (
            <CellComponent
              cell={cell}
              key={index}
              onClick={() => field.isCellFree(cell.y, cell.x)}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FieldComponent;
