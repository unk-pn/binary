"use client";

import { RadioCircle } from "@/components/RadioCircle/RadioCircle";
import { useClock } from "@/hooks/useClock";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { hours, minutes, seconds } = useClock();
  const { t } = useTranslation("home");

  const hoursArr = hours.toString(2).padStart(5, "0").split("");
  const minutesArr = minutes.toString(2).padStart(6, "0").split("");
  const secondsArr = seconds.toString(2).padStart(6, "0").split("");

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("description")}</p>
      </section>

      <section className={styles.clockSection}>
        <h2 className={styles.clockTitle}>{t("currentTime")}</h2>

        <div className={styles.digitalClock}>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>

        <div className={styles.binarySection}>
          <div className={styles.binaryGroup}>
            <div className={styles.binaryLabelRow}>
              <div className={styles.binaryLabel}>
                {t("hours")} ({hours})
              </div>
              <div className={styles.binaryRow}>
                {hoursArr.map((n, index) => (
                  <RadioCircle key={`h-${index}`} index={index} selected={+n} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.binaryGroup}>
            <div className={styles.binaryLabelRow}>
              <div className={styles.binaryLabel}>
                {t("minutes")} ({minutes})
              </div>
              <div className={styles.binaryRow}>
                {minutesArr.map((n, index) => (
                  <RadioCircle key={`m-${index}`} index={index} selected={+n} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.binaryGroup}>
            <div className={styles.binaryLabelRow}>
              <div className={styles.binaryLabel}>
                {t("seconds")} ({seconds})
              </div>
              <div className={styles.binaryRow}>
                {secondsArr.map((n, index) => (
                  <RadioCircle key={`s-${index}`} index={index} selected={+n} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <Link href="/game" className={styles.ctaButton}>
          {t("play")}
        </Link>
        <Link href="/leaderboard" className={styles.secondaryButton}>
          {t("viewLeaderboard")}
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
