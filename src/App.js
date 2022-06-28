import Board from "./Components/Board/Board";
import styles from './App.module.css'
const App = () => {
  return (
    <div className={styles["tic-tac-toe"]}>
      <Board />
    </div>
  );
};
export default App;
