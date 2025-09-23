"use client";

import { RadioCircle } from "@/components/RadioCircle/RadioCircle";
import { useClock } from "@/hooks/useClock";
import React from "react";

const HomePage = () => {
  const { hours, minutes, seconds } = useClock();

  const hoursArr = hours.toString(2).padStart(5, "0").split("");
  const minutesArr = minutes.toString(2).padStart(6, "0").split("");
  const secondsArr = seconds.toString(2).padStart(6, "0").split("");
  return (
    <div>
      <div>Home Page</div>
      <hr />

      <div>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
      <div>
        <div>{hours.toString(2).padStart(5, "0")}</div>
        <div>{minutes.toString(2).padStart(6, "0")}</div>
        <div>{seconds.toString(2).padStart(6, "0")}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {hoursArr.map((n, index) => (
            <RadioCircle key={index} index={index} selected={+n} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {minutesArr.map((n, index) => (
            <RadioCircle key={index} index={index} selected={+n} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {secondsArr.map((n, index) => (
            <RadioCircle key={index} index={index} selected={+n} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
