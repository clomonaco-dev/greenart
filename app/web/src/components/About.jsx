"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="section section--split section--about" id="about">
      <Reveal className="section__copy">
        <p className="eyebrow">{t("about.kicker")}</p>
        <h2>{t("about.title")}</h2>
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>

        <div className="micro-facts">
          <div><span>{t("about.fact1")}</span><strong>Nebbiuno</strong></div>
          <div><span>{t("about.fact2")}</span><strong>Italy</strong></div>
          <div><span>{t("about.fact3")}</span><strong>B2B Export</strong></div>
        </div>
      </Reveal>

      <Reveal className="location-card">
        <span className="location-card__index">GREENART / 45°48&apos;N</span>
        <div className="location-card__map" aria-hidden="true">
          <span className="location-card__point" />
          <span className="location-card__axis location-card__axis--x" />
          <span className="location-card__axis location-card__axis--y" />
        </div>
        <div className="location-card__footer">
          <strong>NEBBIUNO</strong>
          <span>{t("about.location")}</span>
        </div>
      </Reveal>
    </section>
  );
}
