"use client";

import { useEffect, useState } from "react";
import c from "./Settings.module.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const storage = typeof window !== "undefined" ? localStorage : null;
  const [circleColor, setCircleColor] = useState<string>(
    storage?.getItem("circleColor") || "#1d4ed8"
  );
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const response = await fetch("/api/sync-user", { method: "POST" });
        const data = await response.json();
        console.log("✅ User sync response:", data);
      } catch (error) {
        console.error("❌ Failed to sync user:", error);
      }
    };

    if (isSignedIn && user?.id) {
      syncUser();
    }
  }, [isSignedIn, user?.id]);

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
            <div className={c.header}>
              <h2 className={c.title}>Settings</h2>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>

            <div className={c.settings}>
              <div className={c.colorChange}>
                <label>
                  <input
                    type="color"
                    value={circleColor}
                    onChange={handleColorChange}
                  />{" "}
                  Circle Color
                </label>
                <button onClick={resetColor}>Reset color</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
