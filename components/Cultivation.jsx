"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Cultivation() {
  const { t } = useLanguage();

  return (
    <section className="section section--split section--reverse" id="cultivation">
      <Reveal className="visual-card visual-card--cultivation">
        <span>{t("cultivation.visual")}</span>
        <small>{t("cultivation.placeholder")}</small>
      </Reveal>

      <Reveal className="section__copy">
        <p className="eyebrow">{t("cultivation.kicker")}</p>
        <h2>{t("cultivation.title")}</h2>
        <p>{t("cultivation.p1")}</p>
        <p>{t("cultivation.p2")}</p>
      </Reveal>
    </section>
  );
}
