"use client";

import { useState } from "react";
import c from "./HowToPlay.module.css";
import { RadioCircle } from "../RadioCircle/RadioCircle";

export default function HowToPlay() {
  const [open, setOpen] = useState(false);

  return (
    <div className={c.page}>
      <button onClick={() => setOpen(true)} className={c.openBtn}>
        How to play
      </button>

      {open && (
        <div className={c.overlay} onClick={() => setOpen(false)}>
          <div className={c.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className={c.closeBtn}>
              ✖
            </button>

            <h2 className={c.title}>How to play</h2>
            <p className={c.text}>
              Your mission is to convert the decimal number into its binary
              representation before the time runs out.
            </p>
            <p className={c.text}>
              Each round you will be presented with a random decimal number.
            </p>
            <div className={c.example}>13</div>
            <p className={c.text}>
              The binary code field will be displayed as a series of circles,
              each representing a bit (0 or 1). At the start of each round, all
              circles will be set to 0.
            </p>
            <div className={c.binary}>
              <RadioCircle index={0} selected={0} />
              <RadioCircle index={1} selected={0} />
              <RadioCircle index={2} selected={0} />
              <RadioCircle index={3} selected={0} />
            </div>
            <p className={c.text}>
              Tap the circle to toggle its value between 0 and 1.
            </p>
            <div className={c.binary}>
              <RadioCircle index={0} selected={1} />
              <RadioCircle index={1} selected={1} />
              <RadioCircle index={2} selected={0} />
              <RadioCircle index={3} selected={1} />
            </div>
            <img
              className={c.image}
              src="https://i0.wp.com/blog.doublehelix.csiro.au/wp-content/uploads/2014/01/binary1.jpg?ssl=1"
              alt="binary"
            />
            <p className={c.text}>
              Remember, accuracy and speed are key! The faster you convert the
              number, the higher your score. Good luck!
            </p>
            <button onClick={() => setOpen(false)} className={c.openBtn}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
