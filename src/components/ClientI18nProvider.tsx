"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

export function ClientI18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [i18nInstance, setI18nInstance] = useState(() => {
    const fallbackInstance = createInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fallbackInstance as any).use(initReactI18next).init({
      resources: {
        en: {
          home: {},
          game: {},
          leaderboard: {},
          settings: {},
          header: {},
          howToPlay: {},
        },
      },
      fallbackLng: "en",
      defaultNS: "home",
      ns: ["home", "game", "leaderboard", "settings", "header", "howToPlay"],
    });
    return fallbackInstance;
  });

  useEffect(() => {
    const initI18n = async () => {
      const LanguageDetector = (
        await import("i18next-browser-languagedetector")
      ).default;

      // Import locales
      const homeEn = (await import("../locales/en/home.json")).default;
      const gameEn = (await import("../locales/en/game.json")).default;
      const leaderboardEn = (await import("../locales/en/leaderboard.json"))
        .default;
      const settingsEn = (await import("../locales/en/settings.json")).default;
      const headerEn = (await import("../locales/en/header.json")).default;
      const howToPlayEn = (await import("../locales/en/howToPlay.json")).default;


      const homeRu = (await import("../locales/ru/home.json")).default;
      const gameRu = (await import("../locales/ru/game.json")).default;
      const leaderboardRu = (await import("../locales/ru/leaderboard.json"))
        .default;
      const settingsRu = (await import("../locales/ru/settings.json")).default;
      const headerRu = (await import("../locales/ru/header.json")).default;
      const howToPlayRu = (await import("../locales/ru/howToPlay.json")).default;

      const newInstance = createInstance();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await(newInstance as any)
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

      setI18nInstance(newInstance);
    };

    initI18n();
  }, []);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
