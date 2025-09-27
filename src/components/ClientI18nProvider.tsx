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
    // Create a minimal i18n instance for initial render
    const fallbackInstance = createInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fallbackInstance as any).use(initReactI18next).init({
      resources: {
        en: {
          home: {},
          game: {},
          leaderboard: {},
          settings: {},
        },
      },
      fallbackLng: "en",
      defaultNS: "home",
      ns: ["home", "game", "leaderboard", "settings"],
    });
    return fallbackInstance;
  });

  useEffect(() => {
    const initI18n = async () => {
      // Import LanguageDetector dynamically only on client
      const LanguageDetector = (
        await import("i18next-browser-languagedetector")
      ).default;

      // Import locales
      const homeEn = (await import("../locales/en/home.json")).default;
      const gameEn = (await import("../locales/en/game.json")).default;
      const leaderboardEn = (await import("../locales/en/leaderboard.json"))
        .default;
      const settingsEn = (await import("../locales/en/settings.json")).default;

      const homeRu = (await import("../locales/ru/home.json")).default;
      const gameRu = (await import("../locales/ru/game.json")).default;
      const leaderboardRu = (await import("../locales/ru/leaderboard.json"))
        .default;
      const settingsRu = (await import("../locales/ru/settings.json")).default;

      // Create a new instance for the fully configured i18n
      const newInstance = createInstance();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (newInstance as any)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources: {
            en: {
              home: homeEn,
              game: gameEn,
              leaderboard: leaderboardEn,
              settings: settingsEn,
            },
            ru: {
              home: homeRu,
              game: gameRu,
              leaderboard: leaderboardRu,
              settings: settingsRu,
            },
          },
          fallbackLng: "en",
          defaultNS: "home",
          ns: ["home", "game", "leaderboard", "settings"],
        });

      setI18nInstance(newInstance);
    };

    initI18n();
  }, []);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
