import { useEffect, useState } from "react";

export const useClock = () => {
  const [date, setDate] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Отмечаем, что компонент смонтирован на клиенте
    setIsClient(true);

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Во время серверного рендеринга возвращаем статичные значения
  if (!isClient) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  if (hours < 10) hours = Number(`0${hours}`);
  if (minutes < 10) minutes = Number(`0${minutes}`);
  if (seconds < 10) seconds = Number(`0${seconds}`);

  return {
    hours,
    minutes,
    seconds,
  };
};
