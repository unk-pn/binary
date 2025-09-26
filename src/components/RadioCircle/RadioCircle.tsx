"use client";

import React from "react";
import c from "./RadioCircle.module.css";

interface RadioCircleProps {
  index: number;
  onClick?: (n: number) => void;
  selected?: 1 | 0 | string | number;
  size?: "small" | "medium" | "large";
}

export const RadioCircle = ({
  onClick,
  index,
  selected,
  size = "medium",
}: RadioCircleProps) => {
  const circleColor =
    typeof window !== "undefined"
      ? localStorage.getItem("circleColor") || "#3b82f6"
      : "#3b82f6";

  const wrapperClasses = [c.wrapper, c[size], selected === 1 ? c.active : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      onClick={onClick ? () => onClick(index) : undefined}
      className={wrapperClasses}
      style={
        {
          "--circle-color": circleColor,
        } as React.CSSProperties
      }
      aria-label={`Binary digit ${selected === 1 ? "1" : "0"}`}
      role={onClick ? "button" : "presentation"}
    />
  );
};
