"use client";

import React from "react";
import c from "./RadioCircle.module.css";

interface RadioCircleProps {
  index: number;
  onClick?: (n: number) => void;
  selected?: 1 | 0 | string | number;
}

export const RadioCircle = ({ onClick, index, selected }: RadioCircleProps) => {
  return (
    <div
      onClick={onClick ? () => onClick(index) : undefined}
      className={selected === 1 ? `${c.active} ${c.wrapper}` : c.wrapper}
    ></div>
  );
};
