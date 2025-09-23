"use client";

import React from "react";
import c from "./RadioCircle.module.css";

interface RadioCircleProps {
  index: number;
  onClick?: (n: number) => void;
  selected?: 1 | 0 | string | number;
}

export const RadioCircle = ({ onClick, index, selected }: RadioCircleProps) => {
  // Безопасное получение цвета
  const circleColor =
    typeof window !== "undefined"
      ? localStorage.getItem("circleColor") || "#1d4ed8"
      : "#1d4ed8";

  return (
    <div
      onClick={onClick ? () => onClick(index) : undefined}
      className={selected === 1 ? `${c.active} ${c.wrapper}` : c.wrapper}
    >
      <style>
        {`
        .${c.wrapper} {
          width: 20px;
          height: 20px;
          border: 2px solid ${circleColor};
          border-radius: 50%;
          --hole: 100%;
          background: radial-gradient(circle at 50% 50%, transparent 0 var(--hole), ${circleColor} 0);
          transition: --hole 0.3s ease;
        }
      `}
      </style>
    </div>
  );
};
