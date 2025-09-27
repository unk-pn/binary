import homeEn from "../locales/en/home.json";
import gameEn from "../locales/en/game.json";
import leaderboardEn from "../locales/en/leaderboard.json";
import settingsEn from "../locales/en/settings.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "home";
    resources: {
      home: typeof homeEn;
      game: typeof gameEn;
      leaderboard: typeof leaderboardEn;
      settings: typeof settingsEn;
    };
  }
}
