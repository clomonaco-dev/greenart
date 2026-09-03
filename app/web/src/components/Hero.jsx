"use client";

import logo from "@/assets/logo.jpeg";
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
        <img src={logo.src} alt="GreenArt" className="hero__logo brand-logo-on-white" />
        <h1>{t("hero.title")}</h1>
        <p className="hero__lead">{t("hero.lead")}</p>

        <div className="hero__actions">
          <a className="button button--primary" href="/about">
            {t("hero.discover")}
          </a>
          <a className="button button--ghost" href="/request-b2b-offer">
            {t("hero.request")}
          </a>
        </div>
      </Reveal>

      <a href="#site-menu" className="scroll-indicator" aria-label="Go to site menu">
        <span />
        <small>{t("hero.scroll")}</small>
      </a>
    </section>
  );
}
