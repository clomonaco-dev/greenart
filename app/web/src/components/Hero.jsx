"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero section" id="home">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__grid" />
      </div>

      <Reveal className="hero__content">
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <img src="/images/logo.svg" alt="GreenArt" className="hero__logo" />
        <h1>{t("hero.title")}</h1>
        <p className="hero__lead">{t("hero.lead")}</p>

        <div className="hero__actions">
          <a className="button button--primary" href="#about">
            {t("hero.discover")}
          </a>
          <a className="button button--ghost" href="#offer">
            {t("hero.request")}
          </a>
        </div>
      </Reveal>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to next section">
        <span />
        <small>{t("hero.scroll")}</small>
      </a>
    </section>
  );
}
