"use client";

import React, { useState } from "react";
import c from "./RadioCircle.module.css";

type RadioState = 1 | 0;

interface RadioCircleProps {
  index: number;
  onClick: (n: number) => void;
  selected?: 1 | 0;
}

export const RadioCircle = ({ onClick, index, selected }: RadioCircleProps) => {
  // const [selected, setSelected] = useState<RadioState>(0);

  // const handleChange = () => {
  //   setSelected((n) => (n === 1 ? 0 : 1));
  // };
  // return (
  //   <div
  //     onClick={handleChange}
  //     className={selected === 1 ? `${c.active} ${c.wrapper}` : c.wrapper}
  //   >

  //   </div>
  return (
    <div
      onClick={() => onClick(index)}
      className={selected === 1 ? `${c.active} ${c.wrapper}` : c.wrapper}
    ></div>
  );
};
