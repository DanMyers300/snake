import { useEffect, useState, useRef } from 'react';

const drawSnake = (
  ctx:CanvasRenderingContext2D,
  snake: number[]
) => {
  ctx.fillStyle = "black";
  ctx.fillRect(snake[0],snake[1],10,10);
}

const mainLoop = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  snake: number[],
  setSnake: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    throw new Error("failed to obtain canvas element");
  };

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("failed to obtain canvas element");
  };

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake(ctx, snake)
}

const App = () => {
  const [snake, setSnake] = useState([0, 0])
  //const direction = useRef([1, 0])
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    mainLoop(
      canvasRef,
      snake,
      setSnake
    )
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width="300" height="300"/>
    </>
  )
}

export default App
