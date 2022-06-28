import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import WinnerCard from "../WinnerCard/WinnerCard";
const players = {
  SYSTEM: {
    SYMBOL: "O",
    NAME: "COMPUTER",
  },
  HUMAN: {
    SYMBOL: "X",
    NAME: "YOU",
  },
};
const sleep = (time) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < time);
};
const Board = () => {
  const [borad, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winner, setWinner] = useState(null);
  const [isSystemNext, setIsSystemNext] = useState(false);

  const playFn = (arrIndex, index) => {
    if (isSystemNext) {
      return;
    }
    if (winner) {
      return;
    }
    borad[arrIndex][index] = players.HUMAN.SYMBOL;
    setBoard((borad) => [...borad]);
    checkWinner();
    setIsSystemNext(true);
  };

  const checkWinner = () => {
    //same row
    for (let index = 0; index < borad.length; index++) {
      const row = borad[index];
      if (row.every((cell) => cell === players.SYSTEM.SYMBOL)) {
        setWinner(players.SYSTEM.NAME);
        return;
      } else if (row.every((cell) => cell === players.HUMAN.SYMBOL)) {
        setWinner(players.HUMAN.NAME);
        return;
      }
    }
    //same column
    for (let i = 0; i < 3; i++) {
      const column = borad.map((row) => row[i]);
      if (column.every((cell) => cell === players.SYSTEM.SYMBOL)) {
        setWinner(players.SYSTEM.NAME);
        return;
      } else if (column.every((cell) => cell === players.HUMAN.SYMBOL)) {
        setWinner(players.HUMAN.NAME);
        return;
      }
    }
    //same diagonal
    const diagonal1 = [borad[0][0], borad[1][1], borad[2][2]];
    const diagonal2 = [borad[0][2], borad[1][1], borad[2][0]];
    if (diagonal1.every((cell) => cell === players.SYSTEM.SYMBOL)) {
      setWinner(players.SYSTEM.NAME);
      return;
    } else if (diagonal1.every((cell) => cell === players.HUMAN.SYMBOL)) {
      setWinner(players.HUMAN.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players.SYSTEM.SYMBOL)) {
      setWinner(players.SYSTEM.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players.HUMAN.SYMBOL)) {
      setWinner(players.HUMAN.NAME);
      return;
    } else if (borad.flat().every((cell) => cell !== "")) {
      setWinner("draw");
      return;
    } else {
      setWinner(null);
      return;
    }
  };
  useEffect(() => {
    if (winner) {
      return;
    }
    if (isSystemNext) {
      systemPlay();
    }
  }, [isSystemNext]);

  const systemPlay = () => {
    if (winner) {
      return;
    }
    sleep(1000);
    const systemMove = getSystemTurn();
    borad[systemMove.arrIndex][systemMove.index] = players.SYSTEM.SYMBOL;
    setBoard((borad) => [...borad]);
    checkWinner();
    setIsSystemNext(false);
  };

  const getSystemTurn = () => {
    const emptyIndex = [];
    borad.forEach((row, arrIndex) => {
      row.forEach((cell, index) => {
        if (cell === "") {
          emptyIndex.push({ arrIndex, index });
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyIndex.length);
    return emptyIndex[randomIndex];
  };
  const displayWinner = () => {
    if (winner === "draw") {
      return "II IS A DRAW!!";
    } else if (winner) {
      return `${winner} WON !!`;
    }
  };
  const displayTurn = () => {
    if (isSystemNext) {
      return "Computer's turn";
    } else {
      return "Your turn";
    }
  };
  const playAgain = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner(null);
    setIsSystemNext(false);
  };
  return (
    <>
      <div className={styles.displayTurn}>{!winner && displayTurn()}</div>
      <div className={styles.container}>
        <div className={styles.column}>
          <div onClick={() => playFn(0, 0)} className={styles.cell}>
            {borad[0][0]}
          </div>
          <div onClick={() => playFn(0, 1)} className={styles.cell}>
            {borad[0][1]}
          </div>
          <div onClick={() => playFn(0, 2)} className={styles.cell}>
            {borad[0][2]}
          </div>
        </div>
        <div className={styles.column}>
          <div onClick={() => playFn(1, 0)} className={styles.cell}>
            {borad[1][0]}
          </div>
          <div onClick={() => playFn(1, 1)} className={styles.cell}>
            {borad[1][1]}
          </div>
          <div onClick={() => playFn(1, 2)} className={styles.cell}>
            {borad[1][2]}
          </div>
        </div>
        <div className={styles.column}>
          <div onClick={() => playFn(2, 0)} className={styles.cell}>
            {borad[2][0]}
          </div>
          <div onClick={() => playFn(2, 1)} className={styles.cell}>
            {borad[2][1]}
          </div>
          <div onClick={() => playFn(2, 2)} className={styles.cell}>
            {borad[2][2]}
          </div>
        </div>
      </div>
      {winner && (
        <WinnerCard displayWinner={displayWinner} playAgain={playAgain} />
      )}
    </>
  );
};
export default Board;
