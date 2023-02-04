import React, { FC } from "react";
import { Ship } from "../../model/Ship";
import styles from "./ShipsInfo.module.css";

interface ShipsProps {
  ships: Ship[];
}

const ShipsInfo: FC<ShipsProps> = ({ ships }) => {
  const aliveShips = ships.filter((ship) => ship.status === "alive");
  return (
    <div className={styles.info}>
      <span>Осталось кораблей:</span>
      {aliveShips.map((ship, index) => (
        <div key={index} className={styles.ship}>
          <ShipComponent lenght={ship.lenght} />
        </div>
      ))}
    </div>
  );
};

const ShipComponent = ({ lenght }: { lenght: number }) => {
  switch (lenght) {
    case 1: {
      return <span className={styles.shipCell}></span>;
    }
    case 2: {
      return (
        <>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
        </>
      );
    }
    case 3: {
      return (
        <>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
        </>
      );
    }
    case 4: {
      return (
        <>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
          <span className={styles.shipCell}></span>
        </>
      );
    }
  }
  return null;
};

export default ShipsInfo;
