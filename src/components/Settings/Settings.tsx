"use client";

import { useState } from "react";
import c from "./Settings.module.css";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const storage = typeof window !== "undefined" ? localStorage : null;
  const [circleColor, setCircleColor] = useState<string>(
    storage?.getItem("circleColor") || "#1d4ed8"
  );

  const resetColor = () => {
    const defaultColor = "#1d4ed8";
    storage?.setItem("circleColor", defaultColor);
    setCircleColor(defaultColor);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    storage?.setItem("circleColor", newColor);
    setCircleColor(newColor);
  };

  return (
    <div className={c.page}>
      <button onClick={() => setOpen(true)} className={c.openBtn}>
        Settings
      </button>

      {open && (
        <div className={c.overlay} onClick={() => setOpen(false)}>
          <div className={c.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className={c.closeBtn}>
              ✖
            </button>
            <h2 className={c.title}>Settings</h2>
            <div>
              <label>
                <input
                  type="color"
                  value={circleColor}
                  onChange={handleColorChange}
                />
                Circle Color
              </label>
              <button onClick={resetColor}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
