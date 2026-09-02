"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="section section--split" id="about">
      <Reveal className="section__copy">
        <p className="eyebrow">{t("about.kicker")}</p>
        <h2>{t("about.title")}</h2>
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
      </Reveal>

      <Reveal className="visual-card visual-card--about">
        <span>GREENART</span>
        <small>{t("about.placeholder")}</small>
      </Reveal>
    </section>
  );
}
