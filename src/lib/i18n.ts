"use client";

import homeEn from "../locales/en/home.json";
import gameEn from "../locales/en/game.json";
import leaderboardEn from "../locales/en/leaderboard.json";
import settingsEn from "../locales/en/settings.json";
import headerEn from "../locales/en/header.json";
import howToPlayEn from "../locales/en/howToPlay.json";

import homeRu from "../locales/ru/home.json";
import gameRu from "../locales/ru/game.json";
import leaderboardRu from "../locales/ru/leaderboard.json";
import settingsRu from "../locales/ru/settings.json";
import headerRu from "../locales/ru/header.json";
import howToPlayRu from "../locales/ru/howToPlay.json";

import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import i18n from "i18next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(i18n as any)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEn,
        game: gameEn,
        leaderboard: leaderboardEn,
        settings: settingsEn,
        header: headerEn,
        howToPlay: howToPlayEn,
      },
      ru: {
        home: homeRu,
        game: gameRu,
        leaderboard: leaderboardRu,
        settings: settingsRu,
        header: headerRu,
        howToPlay: howToPlayRu,
      },
    },
    fallbackLng: "en",
    defaultNS: "home",
    ns: ["home", "game", "leaderboard", "settings", "header", "howToPlay"],
  });

export default i18n;
