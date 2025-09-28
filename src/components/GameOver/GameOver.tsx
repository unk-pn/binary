"use client";

import { useState } from "react";
import c from "./GameOver.module.css";
import { useTranslation } from "react-i18next";

interface GameOverProps {
  score: number;
}

export const GameOver = ({ score }: GameOverProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation("game");

  return (
    <>
      {open && (
        <div className={c.overlay} onClick={() => setOpen(false)}>
          <div className={c.modal} onClick={(e) => e.stopPropagation()}>
            <h1 className={c.title}>{t("gameOver")}</h1>
            <h2 className={c.subtitle}>{t("finalScore")} {score}</h2>
            <button className={c.closeBtn} onClick={() => setOpen(false)}>×</button>
          </div>
        </div>
      )}
    </>
  );
};
