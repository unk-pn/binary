"use client";

import { useState } from "react";
import c from "./GameOver.module.css";

interface GameOverProps {
  score: number;
}

export const GameOver = ({ score }: GameOverProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <div className={c.overlay} onClick={() => setOpen(false)}>
          <div className={c.modal} onClick={(e) => e.stopPropagation()}>
            <h1>Game Over!</h1>
            <h2>Your score: {score}</h2>
          </div>
        </div>
      )}
    </>
  );
};
