"use client";

import { LeaderboardPlace } from "@/components/LeaderboardPlace/LeaderboardPlace";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

type LeaderboardUser = {
  id: string;
  name: string;
  imageUrl: string;
  record: number;
  clerkId: string;
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("leaderboard");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>
          {t("description")}
        </p>
      </div>

      <div className={styles.leaderboardContainer}>
        {loading ? (
          <div className={styles.loadingState}>{t("loading")}</div>
        ) : leaderboard.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>{t("noScores")}</h2>
            <p className={styles.emptyDescription}>
              {t("beFirst")}
            </p>
            <Link href="/game" className={styles.playButton}>
              {t("playNow")}
            </Link>
          </div>
        ) : (
          <div className={styles.leaderboardList}>
            {leaderboard.map((user, index) => (
              <LeaderboardPlace
                key={user.id}
                place={index + 1}
                name={user.name}
                imageUrl={user.imageUrl}
                record={user.record}
                userId={user.clerkId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
