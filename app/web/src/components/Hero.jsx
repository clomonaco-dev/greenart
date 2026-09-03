"use client";

import logo from "@/assets/logo.jpeg";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero__ambient" aria-hidden="true">
        <div className="hero__wash" />
        <div className="hero__ring hero__ring--one" />
        <div className="hero__ring hero__ring--two" />
        <div className="hero__line" />
      </div>

      <div className="hero__layout">
        <Reveal className="hero__content">
          <p className="eyebrow">{t("hero.eyebrow")}</p>

          <div className="hero__brand-frame">
            <img src={logo.src} alt="GreenArt" className="hero__logo brand-logo-on-light" />
          </div>

          <h1>{t("hero.title")}</h1>
          <p className="hero__lead">{t("hero.lead")}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="/about">
              {t("hero.discover")}
            </a>
            <a className="button button--quiet" href="/request-b2b-offer">
              {t("hero.request")}
            </a>
          </div>
        </Reveal>

        <Reveal className="hero__art" aria-hidden="true">
          <div className="hero__specimen">
            <span className="hero__specimen-code">GA / NEB / 001</span>
            <div className="hero__specimen-core">
              <span>45°48&apos;N</span>
              <strong>NEBBIUNO</strong>
              <small>PIEDMONT · ITALY</small>
            </div>
            <div className="hero__specimen-orbit hero__specimen-orbit--one" />
            <div className="hero__specimen-orbit hero__specimen-orbit--two" />
          </div>
        </Reveal>
      </div>

      <div className="hero__facts">
        <div>
          <span>{t("hero.fact1Label")}</span>
          <strong>{t("hero.fact1Value")}</strong>
        </div>
        <div>
          <span>{t("hero.fact2Label")}</span>
          <strong>{t("hero.fact2Value")}</strong>
        </div>
        <div>
          <span>{t("hero.fact3Label")}</span>
          <strong>{t("hero.fact3Value")}</strong>
        </div>
      </div>

      <a href="#site-menu" className="scroll-indicator" aria-label="Go to site menu">
        <span />
        <small>{t("hero.scroll")}</small>
      </a>
    </section>
  );
}
