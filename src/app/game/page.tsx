"use client";

import HowToPlay from "@/components/HowToPlay/HowToPlay";
import { RadioCircle } from "@/components/RadioCircle/RadioCircle";
import React, { useEffect, useState } from "react";

const GamePage = () => {
  const [start, setStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [aim, setAim] = useState<number>(0);
  const [selectedSum, setSelectedSum] = useState<number>(0);
  const [bits, setBits] = useState<number>(4);
  const [binaryArr, setBinaryArr] = useState(Array(bits).fill(0));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number>((1 << bits) - 1);
  const RESET_DELAY = 400;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    if (!start) return;
    setTime(60);
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          setStart(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    setBinaryArr(Array(bits).fill(0));
    setSelectedSum(0);
  }, [bits]);

  useEffect(() => {
    const sum = binaryArr.reduce(
      (acc, bit, i) => acc + bit * Math.pow(2, bits - 1 - i),
      0
    );
    setSelectedSum(sum);
  }, [binaryArr, bits]);

  const startGame = () => {
    if (start) return;
    setStart(true);
    setAim(getRandomInt(maxValue) + 1);
    setScore(0);
    setSelectedSum(0);
    setBits(4);
    setBinaryArr(Array(bits).fill(0));
    setIsAnimating(false);
    setMaxValue((1 << bits) - 1);
  };

  const stopGame = () => {
    setStart(false);
    setTime(60);
    setScore(0);
    setSelectedSum(0);
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
  }, [decimal, start, aim]);

  const handleCorrectAnswer = () => {
    setTime((t) => Math.min(t + 3, 60));

    setScore((s) => {
      const nextScore = s + 1;
      const willUpgrade = nextScore % 5 === 0;
      const nextBits = willUpgrade ? bits + 1 : bits;

      setIsAnimating(true);

      setTimeout(() => {
        if (willUpgrade) {
          setBits(nextBits);
        } else {
          setBinaryArr(Array(bits).fill(0));
        }

        const newMax = (1 << nextBits) - 1;
        setAim(getRandomInt(newMax) + 1);

        setIsAnimating(false);
      }, RESET_DELAY);

      return nextScore;
    });
  };

  return (
    <div>
      <div>Game Page</div>
      <hr />
      <HowToPlay />
      <hr />

      {!start ? (
        <div>Click Start game to begin.</div>
      ) : (
        <div>Game started! You have {time} seconds left.</div>
      )}
      <button disabled={start} onClick={() => startGame()}>
        Start game
      </button>
      {start && (
        <div>
          <button onClick={() => stopGame()}>Stop game</button>
          <div>Score: {score}</div>
          <div>Aim: {aim - selectedSum}</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {binaryArr.map((_, index) => (
              <RadioCircle
                key={index}
                index={index}
                onClick={handleClick}
                selected={binaryArr[index]}
              />
            ))}
          </div>
          <div>Binary: {binary}</div>
          <div>Decimal: {isNaN(decimal) ? 0 : decimal}</div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
