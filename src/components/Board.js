import React, { useState } from "react";
import './Board.css';  // 导入 CSS 文件

// 检查是否有五个连续的棋子
const checkWinner = (squares, index, player, size) => {
  const directions = [
    { dx: 1, dy: 0 },  // 横向
    { dx: 0, dy: 1 },  // 纵向
    { dx: 1, dy: 1 },  // 主对角线
    { dx: 1, dy: -1 }, // 副对角线
  ];

  const row = Math.floor(index / size);  // 行号
  const col = index % size;              // 列号

  for (let { dx, dy } of directions) {
    let count = 1;

    // 检查一个方向
    for (let i = 1; i < 5; i++) {
      const r = row + i * dy;
      const c = col + i * dx;
      if (r >= 0 && r < size && c >= 0 && c < size && squares[r * size + c] === player) {
        count++;
      } else {
        break;
      }
    }

    // 检查反方向
    for (let i = 1; i < 5; i++) {
      const r = row - i * dy;
      const c = col - i * dx;
      if (r >= 0 && r < size && c >= 0 && c < size && squares[r * size + c] === player) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 5) return player;  // 如果有连续五个相同的棋子
  }

  return null;
};

const Board = ({ size = 15 }) => {
  const [squares, setSquares] = useState(Array(size * size).fill(null)); // 当前棋盘状态
  const [xIsNext, setXIsNext] = useState(true); // 判断当前回合是X还是O
  const [winner, setWinner] = useState(null); // 保存赢家
  const [history, setHistory] = useState([]); // 保存棋盘历史

  const handleClick = (index) => {
    if (squares[index] || winner) return;  // 如果该位置已经有棋子或者已经有胜者

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "black" : "white"; // 黑子和白子

    const newHistory = history.slice();
    newHistory.push(squares); // 保存当前状态到历史中

    setSquares(newSquares);
    setHistory(newHistory);

    // 检查是否有玩家胜利
    const currentWinner = checkWinner(newSquares, index, xIsNext ? "black" : "white", size);
    if (currentWinner) {
      setWinner(currentWinner); // 设置赢家
    }

    setXIsNext(!xIsNext);  // 切换回合
  };

  const undoMove = () => {
    if (history.length === 0) return;

    const lastHistory = history[history.length - 1]; // 获取最后一个历史状态
    setSquares(lastHistory);
    setHistory(history.slice(0, -1)); // 移除最后一个历史记录

    setWinner(null); // 清除赢家状态
    setXIsNext(!xIsNext);  // 恢复回合
  };

  return (
    <div className="board-container">
      {/* 在正上方显示标题 */}
      <h1 className="game-title">{winner ? (winner === "black" ? "黑子胜利!" : "白子胜利!") : (xIsNext ? "黑子的回合" : "白子的回合")}</h1>

      {/* 棋盘部分 */}
      <div className="board">
        {Array.from({ length: size }, (_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: size }, (_, col) => {
              const index = row * size + col;
              return (
                <button
                  key={index}
                  className="square"
                  onClick={() => handleClick(index)}
                  style={{
                    backgroundColor: squares[index] ? "lightgrey" : "white",
                  }}
                >
                  {squares[index] && (
                    <div className={squares[index]} />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      <div className="controls">
        <button
          className="undo-button"
          onClick={undoMove}
          disabled={history.length === 0}
        >
          悔棋
        </button>
        <button
          className="reset-button"
          onClick={() => { setSquares(Array(size * size).fill(null)); setHistory([]); setWinner(null); }}
        >
          重新开始
        </button>
      </div>
    </div>
  );
};

export default Board;
