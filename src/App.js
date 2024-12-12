import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  const [gameKey, setGameKey] = useState(0); // 用来重新渲染游戏

  const resetGame = () => {
    setGameKey(gameKey + 1);  // 每次点击重新开始游戏
  };

  return (
    <div className="App">
      <h1>五子棋游戏</h1>
      <Board key={gameKey} size={15} /> {/* 传递棋盘尺寸 */}
    </div>
  );
}

export default App;
