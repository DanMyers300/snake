import { useState, useRef } from "react";

import moveSnake from "./utils/moveSnake";
import draw from "./utils/draw";
import inputHandler from "./utils/inputHandler"

export const DIRECTIONS = {
  w: [0, -1], // up
  a: [-1, 0], // left
  s: [0, 1],  // down
  d: [1, 0],  // right
} as const;

export type DirectionKey = keyof typeof DIRECTIONS;
export type Direction = typeof DIRECTIONS[DirectionKey];

const App = () => {
  const [snake, setSnake] = useState<[number, number]>([20, 20]);
  const [fruit, setFruit] = useState<[number, number]>([80, 80])
  const [direction, setDirection] = useState<Direction>([1, 0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  moveSnake(
    canvasRef,
    direction,
    setSnake,
    fruit,
    setFruit
  );
  draw(canvasRef, snake, fruit);
  inputHandler(setDirection)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <canvas
        style={{
          border: "4px solid black",
        }}
        ref={canvasRef}
        width="500"
        height="500"
      />
    </div>
  );
};

export default App;

