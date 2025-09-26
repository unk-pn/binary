"use client";

import { LeaderboardPlace } from "@/components/LeaderboardPlace/LeaderboardPlace";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

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
        <h1 className={styles.title}>Leaderboard</h1>
        <p className={styles.subtitle}>
          See how you rank against other players in the binary time challenge.
          Compete for the top spot and show off your binary mastery!
        </p>
      </div>

      <div className={styles.leaderboardContainer}>
        {loading ? (
          <div className={styles.loadingState}>Loading leaderboard...</div>
        ) : leaderboard.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎯</span>
            <h2 className={styles.emptyTitle}>No scores yet!</h2>
            <p className={styles.emptyDescription}>
              Be the first to set a record in the binary game.
            </p>
            <Link href="/game" className={styles.playButton}>
              🎮 Play Now
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
