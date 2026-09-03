"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Quality() {
  const { t } = useLanguage();

  return (
    <section className="section section--quality" id="quality">
      <Reveal className="quality-panel">
        <div className="quality-panel__copy">
          <p className="eyebrow">{t("quality.kicker")}</p>
          <h2>{t("quality.title")}</h2>
          <p>{t("quality.text")}</p>
        </div>

        <div className="quality-protocol">
          <div><span>01</span><strong>{t("quality.step1")}</strong><i /></div>
          <div><span>02</span><strong>{t("quality.step2")}</strong><i /></div>
          <div><span>03</span><strong>{t("quality.step3")}</strong><i /></div>
          <div><span>04</span><strong>{t("quality.step4")}</strong><i /></div>
        </div>

        <div className="quality-stats">
          <div>
            <strong>ASEPTIC</strong>
            <span>{t("quality.stat1")}</span>
          </div>
          <div>
            <strong>BATCH</strong>
            <span>{t("quality.stat2")}</span>
          </div>
          <div>
            <strong>EXPORT</strong>
            <span>{t("quality.stat3")}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
