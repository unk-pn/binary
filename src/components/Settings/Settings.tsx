"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import c from "./Settings.module.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { RadioCircle } from "../RadioCircle/RadioCircle";
import { SignInButton } from "../SignInButton/SignInButton";
import { useTranslation } from "react-i18next";
import { RegisterButton } from "../RegisterButton/RegisterButton";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const storage = typeof window !== "undefined" ? localStorage : null;
  const [theme, setTheme] = useState(storage?.getItem("theme") || "dark");
  const [circleColor, setCircleColor] = useState<string>(
    storage?.getItem("circleColor") || "#3b82f6"
  );
  const { isSignedIn, user } = useUser();
  const [previewArray, setPreviewArray] = useState<(0 | 1)[]>([1, 1, 0, 1]);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const { t } = useTranslation("settings");

  useEffect(() => {
    const savedLanguage = storage?.getItem("language") || "en";
    if (savedLanguage !== language) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }

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
  }, [isSignedIn, user?.id, i18n, language, storage]);

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
  };

  console.log(isSignedIn);

  return (
    <div className={c.page}>
      <button onClick={() => setOpen(true)} className={c.openBtn}>
        {t("title")}
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={c.overlay} onClick={() => setOpen(false)}>
            <div className={c.modal} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className={c.closeBtn}>
                ✖
              </button>

              <div className={`${c.header} ${isSignedIn ? c.signedIn : ""}`}>
                <h2 className={c.title}>{t("title")}</h2>
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
                    <RegisterButton
                      theme={theme as "light" | "dark"}
                      variant="primary"
                      size="medium"
                    >
                      {t("signUp")}
                    </RegisterButton>
                    <SignInButton
                      theme={theme as "light" | "dark"}
                      variant="primary"
                      size="medium"
                    >
                      {t("signIn")}
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>

              <div className={c.settings}>
                <div className={c.settingGroup}>
                  <div className={c.settingLabel}>{t("theme")}</div>
                  <div className={c.languageChange}>
                    <div className={c.languageToggle}>
                      <span
                        className={`${c.languageLabel} ${
                          theme === "light" ? c.active : ""
                        }`}
                      >
                        {t("light")}
                      </span>
                      <label className={c.toggle}>
                        <input
                          type="checkbox"
                          checked={theme === "dark"}
                          onChange={(e) => {
                            const newTheme = e.target.checked
                              ? "dark"
                              : "light";
                            setTheme(newTheme);
                            document.documentElement.classList.toggle(
                              "dark",
                              newTheme === "dark"
                            );
                            storage?.setItem("theme", newTheme);
                          }}
                          className={c.toggleInput}
                        />
                        <span className={c.toggleSlider}></span>
                      </label>
                      <span
                        className={`${c.languageLabel} ${
                          theme === "dark" ? c.active : ""
                        }`}
                      >
                        {t("dark")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={c.settingGroup}>
                  <div className={c.settingLabel}>{t("language")}</div>
                  <div className={c.themeChange}>
                    <div className={c.themeOptions}>
                      <label className={c.themeOption}>
                        <input
                          type="radio"
                          value="en"
                          checked={language === "en"}
                          onChange={() => {
                            setLanguage("en");
                            i18n.changeLanguage("en");
                            storage?.setItem("language", "en");
                          }}
                        />
                        🇺🇸
                      </label>
                      <label className={c.themeOption}>
                        <input
                          type="radio"
                          value="ru"
                          checked={language === "ru"}
                          onChange={() => {
                            setLanguage("ru");
                            i18n.changeLanguage("ru");
                            storage?.setItem("language", "ru");
                          }}
                        />
                        🇷🇺
                      </label>
                    </div>
                  </div>
                </div>

                <div className={c.settingGroup}>
                  <div className={c.settingLabel}>{t("circleColor")}</div>
                  <div className={c.colorChange}>
                    <div className={c.colorInputGroup}>
                      <input
                        type="color"
                        value={circleColor}
                        onChange={handleColorChange}
                        className={c.colorInput}
                      />
                      <span className={c.colorLabel}>{t("chooseColor")}</span>
                      <button onClick={resetColor} className={c.resetButton}>
                        {t("reset")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={c.preview}>
                  <div className={c.previewTitle}>{t("preview")}</div>
                  <div className={c.binary}>
                    <RadioCircle
                      index={0}
                      selected={previewArray[0]}
                      size="small"
                      onClick={() => handlePreviewClick(0)}
                    />
                    <RadioCircle
                      index={1}
                      selected={previewArray[1]}
                      size="small"
                      onClick={() => handlePreviewClick(1)}
                    />
                    <RadioCircle
                      index={2}
                      selected={previewArray[2]}
                      size="small"
                      onClick={() => handlePreviewClick(2)}
                    />
                    <RadioCircle
                      index={3}
                      selected={previewArray[3]}
                      size="small"
                      onClick={() => handlePreviewClick(3)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
