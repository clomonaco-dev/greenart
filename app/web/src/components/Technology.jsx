"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Technology() {
  const { t } = useLanguage();
  const cards = [
    ["01", "technology.card1Title", "technology.card1Text"],
    ["02", "technology.card2Title", "technology.card2Text"],
    ["03", "technology.card3Title", "technology.card3Text"],
  ];

  return (
    <section className="section section--dark" id="technology">
      <Reveal className="section-heading">
        <p className="eyebrow">{t("technology.kicker")}</p>
        <h2>{t("technology.title")}</h2>
        <p>{t("technology.intro")}</p>
      </Reveal>

      <div className="feature-grid">
        {cards.map(([number, title, text]) => (
          <Reveal as="article" className="feature" key={number}>
            <span>{number}</span>
            <h3>{t(title)}</h3>
            <p>{t(text)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
