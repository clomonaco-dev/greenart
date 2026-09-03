"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Cultivation() {
  const { t } = useLanguage();

  return (
    <section className="section section--split section--cultivation" id="cultivation">
      <Reveal className="cultivation-visual" aria-hidden="true">
        <div className="cultivation-visual__mesh" />
        <div className="cultivation-visual__leaf cultivation-visual__leaf--one" />
        <div className="cultivation-visual__leaf cultivation-visual__leaf--two" />
        <div className="cultivation-visual__leaf cultivation-visual__leaf--three" />
        <div className="cultivation-visual__label">
          <span>LIGHT CANNABIS</span>
          <strong>CONTROLLED<br />CULTIVATION</strong>
          <small>PREMIUM · INTERNATIONAL B2B</small>
        </div>
      </Reveal>

      <Reveal className="section__copy">
        <p className="eyebrow">{t("cultivation.kicker")}</p>
        <h2>{t("cultivation.title")}</h2>
        <p>{t("cultivation.p1")}</p>
        <p>{t("cultivation.p2")}</p>

        <div className="process-list">
          <div><span>01</span><strong>{t("cultivation.process1")}</strong></div>
          <div><span>02</span><strong>{t("cultivation.process2")}</strong></div>
          <div><span>03</span><strong>{t("cultivation.process3")}</strong></div>
        </div>
      </Reveal>
    </section>
  );
}
