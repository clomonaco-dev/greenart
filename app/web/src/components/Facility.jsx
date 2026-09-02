"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Facility() {
  const { t } = useLanguage();

  return (
    <section className="section section--dark" id="facility">
      <Reveal className="section-heading">
        <p className="eyebrow">{t("facility.kicker")}</p>
        <h2>{t("facility.title")}</h2>
        <p>{t("facility.intro")}</p>
      </Reveal>

      <div className="facility-gallery">
        <Reveal className="gallery-item gallery-item--wide">
          <span>{t("facility.photo1")}</span>
        </Reveal>
        <Reveal className="gallery-item">
          <span>{t("facility.photo2")}</span>
        </Reveal>
        <Reveal className="gallery-item">
          <span>{t("facility.photo3")}</span>
        </Reveal>
      </div>
    </section>
  );
}
