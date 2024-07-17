import React, { useState } from "react";
import './App.css';
import Board from './components/Board';

function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  }

  const calculateWinner = (squares) => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((step, move) => {
    const desc = move ?
    `Go to move #` + move :
    `Go to game start` ;
    return(
      <li key={move}>
        <button className="move-button" onClick={() => jomTo(move)}>{desc}</button>
      </li>
    )
  })
  
  const jomTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }


  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="status">{status}</div>  
          <Board 
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            />
        </div>
      </div>
      <div className="game-info">
        <ol style={{listStyle: 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
