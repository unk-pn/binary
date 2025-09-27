import React from "react";
import c from "./LeaderboardPlace.module.css";
import { useUser } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

interface LeaderboardPlaceProps {
  place: number;
  name: string;
  imageUrl: string;
  record: number;
  userId?: string;
}

export const LeaderboardPlace = ({
  place,
  name,
  imageUrl,
  record,
  userId,
}: LeaderboardPlaceProps) => {
  const { user } = useUser();
  const { t } = useTranslation("leaderboard");

  const getPlaceIcon = (place: number) => {
    switch (place) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return place.toString();
    }
  };

  const getPlaceClass = (place: number) => {
    switch (place) {
      case 1:
        return `${c.place} ${c.first}`;
      case 2:
        return `${c.place} ${c.second}`;
      case 3:
        return `${c.place} ${c.third}`;
      default:
        return c.place;
    }
  };
    
  return (
    <div className={c.wrapper}>
      <div className={c.leftSection}>
        <div className={getPlaceClass(place)}>{getPlaceIcon(place)}</div>
        <img
          src={imageUrl}
          alt={`${name}'s avatar`}
          width={48}
          height={48}
          className={c.avatar}
        />
        <div className={c.userInfo}>
          <h3 className={c.name} style={{ color: user?.id === userId ? "var(--accent-color)" : "" }}>
            {name} {user?.id === userId && `(${t("you")})`}
          </h3>
        </div>
      </div>

      <div className={c.rightSection}>
        <div className={c.record}>{record}</div>
        <span className={c.recordUnit}>pts</span>
      </div>
    </div>
  );
};
