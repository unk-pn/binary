import React from 'react'
import c from './LeaderboardPlace.module.css'

interface LeaderboardPlaceProps {
  place: number;
  name: string;
  imageUrl: string;
  record: number;
}

export const LeaderboardPlace = ({ place, name, imageUrl, record }: LeaderboardPlaceProps) => {
  return (
    <div className={c.wrapper}>
      <div>{place === 1 ? "🥇" : place === 2 ? "🥈" : place === 3 ? "🥉" : place}</div>
      <img src={imageUrl} alt={name} width={32} height={32} />
      <div>{name}</div>
      <div>{record}</div>
    </div>
  );
};
