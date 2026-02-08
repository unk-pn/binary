"use client";

import { GameOver } from "@/components/GameOver/GameOver";
import { RadioCircle } from "@/components/RadioCircle/RadioCircle";
import { useStorage } from "@/hooks/useStorage";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";
import { PleaseSignIn } from "@/components/PleaseSignIn/PleaseSignIn";

const GamePage = () => {
  const [start, setStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [aim, setAim] = useState<number>(0);
  const [bits, setBits] = useState<number>(4);
  const [binaryArr, setBinaryArr] = useState(Array(bits).fill(0));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number>((1 << bits) - 1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [record, setRecord] = useState<number>(0);
  const storage = useStorage();
  const { user } = useUser();
  const RESET_DELAY = 400;
  const { t } = useTranslation("game");

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    const localRecord = storage?.getItem("record");
    if (localRecord) {
      setRecord(Number(localRecord));
    }

    if (user?.id) {
      fetch("/api/user-record")
        .then((res) => res.json())
        .then((data) => {
          const currentLocal = Number(storage?.getItem("record") || "0");
          if (data.record > currentLocal) {
            setRecord(data.record);
            storage?.setItem("record", data.record.toString());
          }
        });

      const currUserId = user?.id;
      const lastUserId = storage?.getItem("lastUserId");
      if (currUserId && lastUserId && currUserId !== lastUserId) {
        storage?.removeItem("record");
      }

      if (currUserId) {
        storage?.setItem("lastUserId", currUserId);
      }
    }
  }, [user?.id, storage]);

  useEffect(() => {
    if (!start) return;
    setTime(60);
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          setStart(false);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    setBinaryArr(Array(bits).fill(0));
  }, [bits]);

  const updateRecord = async (newScore: number) => {
    if (newScore > record) {
      setRecord(newScore);
      storage?.setItem("record", newScore.toString());

      try {
        await fetch("/api/update-record", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newRecord: newScore }),
        });
      } catch (error) {
        console.error("Failed to sync with server:", error);
      }
    }
  };

  const startGame = () => {
    if (start) return;
    setStart(true);
    setAim(getRandomInt(maxValue) + 1);
    setScore(0);
    setBits(4);
    setBinaryArr(Array(bits).fill(0));
    setIsAnimating(false);
    setMaxValue((1 << bits) - 1);
    setGameOver(false);
  };

  const stopGame = () => {
    setStart(false);
    setTime(60);
    updateRecord(score);
    setGameOver(true);
  };

  const handleClick = (idx: number) => {
    if (!start || isAnimating) return;
    setBinaryArr((arr) => {
      const next = [...arr];
      next[idx] = next[idx] ? 0 : 1;
      return next;
    });
  };

  const binary = binaryArr.reduce((acc, cur) => acc + cur, "");
  const decimal = parseInt(binary, 2);

  useEffect(() => {
    if (!start) return;
    if (decimal === aim) {
      handleCorrectAnswer();
    }
    if (decimal > aim) {
      stopGame();
    }
  }, [decimal, start, aim]);

  const handleCorrectAnswer = () => {
    setTime((t) => Math.min(t + 1, 60));

    setScore((s) => {
      const nextScore = s + 1;
      const willUpgrade = nextScore % 5 === 0;
      const nextBits = willUpgrade ? bits + 1 : bits;

      setIsAnimating(true);

      setTimeout(() => {
        if (willUpgrade) {
          setBits(nextBits);
          setBinaryArr(Array(nextBits).fill(0));
        } else {
          setBinaryArr(Array(bits).fill(0));
        }

        const correctBits = willUpgrade ? nextBits : bits;
        const newMax = (1 << correctBits) - 2;
        setAim(getRandomInt(newMax) + 1);

        setIsAnimating(false);
      }, RESET_DELAY);

      return nextScore;
    });
  };

  return (
    <div className={styles.container}>
      {gameOver && <GameOver score={score} />}
      <section className={styles.hero}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("description")}</p>
      </section>

      <SignedIn>
        <section className={styles.gameSection}>
          <h1 className={styles.title2}>{t("yourRecord")} {record}</h1>

          {!start && (
            <button
              disabled={start}
              onClick={() => startGame()}
              className={`${styles.startButton} ${styles.button}`}
            >
              {t("startGame")}
            </button>
          )}
          {start && (
            <section className={styles.aimSection}>
              <div className={styles.additionalInfo}>
                <div className={styles.score}>{t("score")} {score}</div>
                <div className={styles.aim}>{t("aim")} {aim - decimal}</div>
                <div className={styles.time}>{t("time")} {time}</div>
              </div>
              <div className={styles.binaryRow}>
                {binaryArr.map((_, index) => (
                  <RadioCircle
                    key={index}
                    index={index}
                    onClick={handleClick}
                    selected={binaryArr[index]}
                  />
                ))}
              </div>
              <button onClick={() => stopGame()} className={`${styles.stopButton} ${styles.button}`}>
                {t("stopGame")}
              </button>
            </section>
          )}
        </section>
      </SignedIn>
      <SignedOut>
        <PleaseSignIn />
      </SignedOut>
    </div>
  );
};

export default GamePage;
