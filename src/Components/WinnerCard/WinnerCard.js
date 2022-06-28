import React from "react";
import Modal from "../UI/Modal";
import styles from "./WinnerCard.module.css";
const WinnerCard = (props) => {
  return (
    <Modal>
      <div className={styles.winnerCard}>
        <div className={styles.winnerName}>{props.displayWinner()}</div>
        <button className={styles.btn} onClick={props.playAgain}>
          Play Again
        </button>
      </div>
    </Modal>
  );
};
export default WinnerCard;
