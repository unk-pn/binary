"use client";

import { RadioCircle } from "@/components/RadioCircle/RadioCircle";
import React, { useEffect, useState } from "react";

const GamePage = () => {
  const [start, setStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [aim, setAim] = useState<number>(0);
  const [selectedSum, setSelectedSum] = useState<number>(0);

  const n = 4;
  const [binaryArr, setBinaryArr] = useState(Array(n).fill(0));

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

    return () => clearTimeout(id);
  }, [start]);

  const startGame = () => {
    setStart(true);
    setAim(getRandomInt(15) + 1);
    setScore(0);
    setBinaryArr(Array(n).fill(0));
    setSelectedSum(0);
  };

  const stopGame = () => {
    setStart(false);
    setTime(60);
    setScore(0);
    setBinaryArr(Array(n).fill(0));
    setSelectedSum(0);
  };

  const handleClick = (idx: number) => {
    setBinaryArr((arr) => {
      const newArr = [...arr];
      newArr[idx] = newArr[idx] === 1 ? 0 : 1;

      setSelectedSum(
        newArr.reduce((acc, bit, i) => acc + bit * (1 << (n - 1 - i)), 0)
      );

      return newArr;
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
    setAim(getRandomInt(15) + 1);
    setScore((s) => s + 1);
    setTimeout(() => setBinaryArr(Array(n).fill(0)), 300);
    setSelectedSum(0);
  };

  return (
    <div>
      <div>Game Page</div>
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
            {binaryArr.map((n, index) => (
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
          <div>Selected: {selectedSum}</div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
