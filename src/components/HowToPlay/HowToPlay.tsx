"use client";

import { useState } from "react";
import c from "./HowToPlay.module.css";
import { RadioCircle } from "../RadioCircle/RadioCircle";
import { useTranslation } from "react-i18next";

export default function HowToPlay() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("howToPlay");

  return (
    <div className={c.page}>
      <button onClick={() => setOpen(true)} className={c.openBtn}>
        {t("title")}
      </button>

      {open && (
        <div className={c.overlay} onClick={() => setOpen(false)}>
          <div className={c.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className={c.closeBtn}>
              ✖
            </button>

            <h2 className={c.title}>{t("title")}</h2>
            <p className={c.text}>{t("step1")}</p>
            <p className={c.text}>{t("step2")}</p>
            <div className={c.example}>13</div>
            <p className={c.text}>{t("step3")}</p>
            <div className={c.binary}>
              <RadioCircle index={0} selected={0} />
              <RadioCircle index={1} selected={0} />
              <RadioCircle index={2} selected={0} />
              <RadioCircle index={3} selected={0} />
            </div>
            <p className={c.text}>{t("step4")}</p>
            <div className={c.binary}>
              <RadioCircle index={0} selected={1} />
              <RadioCircle index={1} selected={1} />
              <RadioCircle index={2} selected={0} />
              <RadioCircle index={3} selected={1} />
            </div>
            <p className={c.text}>{t("step5")}</p>
            <button onClick={() => setOpen(false)} className={c.gotItBtn}>
              {t("gotIt")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
