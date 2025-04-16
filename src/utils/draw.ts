import { useEffect } from "react";

const draw = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  snake: [number, number],
  fruit: [number, number]
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(snake[0], snake[1], 10, 10);
    ctx.fillRect(fruit[0], fruit[1], 10, 10);
  }, [snake]);
}

export default draw;
