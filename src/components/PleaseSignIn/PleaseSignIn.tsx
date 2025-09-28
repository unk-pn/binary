import React from "react";
import styles from "./PleaseSignIn.module.css";
import { SignInButton } from "../SignInButton/SignInButton";
import { useTranslation } from "react-i18next";

export const PleaseSignIn = () => {
  const { t } = useTranslation("game");
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t("pleaseSignIn")}</h1>
      <h2 className={styles.subtitle}>
        {t("bySigning")}
      </h2>

      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureText}>
            {t("feature1")}
          </span>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureText}>
            {t("feature2")}
          </span>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureText}>
            {t("feature3")}
          </span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <SignInButton size="large">{t("signIn")}</SignInButton>
      </div>
    </div>
  );
};
