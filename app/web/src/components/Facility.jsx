"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Facility() {
  const { t } = useLanguage();

  const zones = [
    ["01", "facility.zone1", "facility.zone1Text"],
    ["02", "facility.zone2", "facility.zone2Text"],
    ["03", "facility.zone3", "facility.zone3Text"],
  ];

  return (
    <section className="section section--stack section--facility" id="facility">
      <Reveal className="section-heading section-heading--wide">
        <p className="eyebrow">{t("facility.kicker")}</p>
        <h2>{t("facility.title")}</h2>
        <p>{t("facility.intro")}</p>
      </Reveal>

      <div className="facility-grid">
        {zones.map(([n, title, text], index) => (
          <Reveal className={`facility-zone facility-zone--${index + 1}`} key={n}>
            <div className="facility-zone__visual" aria-hidden="true">
              <span className="facility-zone__door" />
              <span className="facility-zone__scan" />
              <span className="facility-zone__number">{n}</span>
            </div>
            <div className="facility-zone__copy">
              <span>ZONE {n}</span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
