import React, { FC, useEffect, useState } from "react";
import { Field } from "../../model/Field";
import CellComponent from "../CellComponent/CellComponent";

interface FieldProps {
  field: Field;
  isEnemy?: boolean;
}

const FieldComponent: FC<FieldProps> = ({ field, isEnemy = false }) => {
  return (
    <div className="field">
      {field.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell, index) => (
            <CellComponent
              isEnemy={isEnemy}
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
