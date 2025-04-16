import { useEffect } from 'react';
import type { Direction } from '../App';

const isOverlap = (
  a: [number, number],
  b: [number, number],
  size = 10
) => {
  return (
    a[0] < b[0] + size &&
    a[0] + size > b[0] &&
    a[1] < b[1] + size &&
    a[1] + size > b[1]
  );
};

const moveSnake = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  direction: Direction,
  setSnake: React.Dispatch<React.SetStateAction<[number, number]>>,
  fruit: [number, number],
  setFruit: React.Dispatch<React.SetStateAction<[number, number]>>,
  step: number = 5 // <-- step size in pixels
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setSnake((prev) => {
        const next: [number, number] = [
          prev[0] + direction[0] * step,
          prev[1] + direction[1] * step,
        ];

        // Wall collision
        if (
          next[0] < 0 ||
          next[0] + step > canvas.width ||
          next[1] < 0 ||
          next[1] + step > canvas.height
        ) {
          alert("Game Over");
          return prev;
        }

        // Fruit collision
        if (isOverlap(next, fruit, step)) {
          setFruit([
            Math.floor(Math.random() * (canvas.width / step)) * step,
            Math.floor(Math.random() * (canvas.height / step)) * step,
          ]);
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, fruit, setFruit, setSnake, canvasRef, step]);
};

export default moveSnake;

