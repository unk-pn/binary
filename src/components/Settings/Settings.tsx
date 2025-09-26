"use client";

import { useEffect, useState } from "react";
import c from "./Settings.module.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { RadioCircle } from "../RadioCircle/RadioCircle";
import { SignInButton } from "../SignInButton/SignInButton";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const storage = typeof window !== "undefined" ? localStorage : null;
  const [theme, setTheme] = useState(storage?.getItem("theme") || "dark");
  const [circleColor, setCircleColor] = useState<string>(
    storage?.getItem("circleColor") || "#3b82f6"
  );
  const { isSignedIn, user } = useUser();
  const [previewArray, setPreviewArray] = useState<(0 | 1)[]>([1, 1, 0, 1]);

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
    const defaultColor = "#3b82f6";
    storage?.setItem("circleColor", defaultColor);
    setCircleColor(defaultColor);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    storage?.setItem("circleColor", newColor);
    setCircleColor(newColor);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value as "light" | "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    storage?.setItem("theme", newTheme);
  };

  const handlePreviewClick = (index: number) => {
    const newArray = [...previewArray];
    newArray[index] = newArray[index] === 1 ? 0 : 1;
    setPreviewArray(newArray);
  }

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
              <div className={c.userSection}>
                <SignedIn>
                  <UserButton
                    showName
                    appearance={{
                      baseTheme: theme === "dark" ? dark : undefined,
                      elements: {
                        userButtonAvatarBox: {
                          width: "40px",
                          height: "40px",
                        },
                        userButtonPopoverCard: {
                          marginTop: "8px",
                        },
                        userButtonBox: {
                          flexDirection: "row-reverse",
                        },
                        userButtonOuterBox: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        },
                        userButtonTrigger: {
                          color: theme === "dark" ? "#ffffff" : undefined,
                          "&:hover": {
                            color: theme === "dark" ? "#ffffff" : undefined,
                          },
                        },
                      },
                    }}
                  />
                </SignedIn>
                <SignedOut>
                  <SignInButton
                    theme={theme as "light" | "dark"}
                    variant="primary"
                    size="medium"
                  >
                    Sign In
                  </SignInButton>
                </SignedOut>
              </div>
            </div>

            <div className={c.settings}>
              <div className={c.settingGroup}>
                <div className={c.settingLabel}>Circle Color</div>
                <div className={c.colorChange}>
                  <div className={c.colorInputGroup}>
                    <input
                      type="color"
                      value={circleColor}
                      onChange={handleColorChange}
                      className={c.colorInput}
                    />
                    <span className={c.colorLabel}>
                      Choose your preferred circle color
                    </span>
                    <button onClick={resetColor} className={c.resetButton}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className={c.settingGroup}>
                <div className={c.settingLabel}>Theme</div>
                <div className={c.themeChange}>
                  <div className={c.themeOptions}>
                    <label className={c.themeOption}>
                      <input
                        type="radio"
                        value="light"
                        checked={theme === "light"}
                        onChange={handleThemeChange}
                      />
                      Light
                    </label>
                    <label className={c.themeOption}>
                      <input
                        type="radio"
                        value="dark"
                        checked={theme === "dark"}
                        onChange={handleThemeChange}
                      />
                      Dark
                    </label>
                  </div>
                </div>
              </div>

              <div className={c.preview}>
                <div className={c.previewTitle}>Preview</div>
                <div className={c.binary}>
                  <RadioCircle index={0} selected={previewArray[0]} size="small" onClick={() => handlePreviewClick(0)} />
                  <RadioCircle index={1} selected={previewArray[1]} size="small" onClick={() => handlePreviewClick(1)} />
                  <RadioCircle index={2} selected={previewArray[2]} size="small" onClick={() => handlePreviewClick(2)} />
                  <RadioCircle index={3} selected={previewArray[3]} size="small" onClick={() => handlePreviewClick(3)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
