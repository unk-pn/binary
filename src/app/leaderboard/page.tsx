"use client";

import { LeaderboardPlace } from "@/components/LeaderboardPlace/LeaderboardPlace";
import React, { useEffect, useState } from "react";

type LeaderboardUser = {
  name: string;
  imageUrl: string;
  record: number;
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard);
      });
  }, [leaderboard]);
  return (
    <div>
      <h1>Leaderboard</h1>
      <div>
        {leaderboard.map((user, index) => (
          <LeaderboardPlace
            key={index}
            place={index + 1}
            name={user.name}
            imageUrl={user.imageUrl}
            record={user.record}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
