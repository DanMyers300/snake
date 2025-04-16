import { useEffect } from "react";
import {DIRECTIONS, DirectionKey, Direction} from "../App"

const inputHandler = (
  setDirection: React.Dispatch<React.SetStateAction<Direction>>
) => {
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
};

export default inputHandler;
