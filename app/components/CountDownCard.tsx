import React from "react";
import styles from "./countDown.module.css";

interface CountDownSquareProps {
  label: string;
  number: number;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const CountDownSquare: React.FC<CountDownSquareProps> = ({
  label,
  number,
  cardRef,
}) => {
  return (
    <div className={styles.countdownCard}>
      <div className={styles.countdownCardBg} ref={cardRef}>
        <div className={styles.countdownCardNumber} id={label}>
          {number}
        </div>
      </div>
      <div className={styles.countdownCardLabel}>{label}</div>
    </div>
  );
};

export default CountDownSquare;
