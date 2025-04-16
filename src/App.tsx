import { useEffect, useState, useRef } from "react";

const DIRECTIONS = {
  w: [0, -1], // up
  a: [-1, 0], // left
  s: [0, 1],  // down
  d: [1, 0],  // right
} as const;

type DirectionKey = keyof typeof DIRECTIONS;
type Direction = typeof DIRECTIONS[DirectionKey];

const App = () => {
  const [snake, setSnake] = useState<[number, number]>([0, 0]);
  const [direction, setDirection] = useState<Direction>([1, 0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => [
        prev[0] + direction[0], prev[1] + direction[1],
      ]);
    }, 16);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(snake[0], snake[1], 10, 10);
  }, [snake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as DirectionKey;
      if (key in DIRECTIONS) {
        setDirection(DIRECTIONS[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

