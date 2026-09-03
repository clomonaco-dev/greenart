"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="section section--split section--contact" id="contact">
      <Reveal className="section__copy">
        <p className="eyebrow">{t("contact.kicker")}</p>
        <h2>{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>

        <div className="contact-list">
          <a href="mailto:info@greenart.tech">info@greenart.tech</a>
          <span>International B2B</span>
          <span>{t("contact.scope")}</span>
        </div>
      </Reveal>

      <Reveal className="contact-card">
        <span className="contact-card__label">GREENART / B2B</span>
        <div className="contact-card__coordinate">
          <strong>EXPORT</strong>
          <i />
          <strong>PREMIUM</strong>
        </div>
        <div className="contact-card__footer">
          <span>{t("contact.visual")}</span>
          <a href="/request-b2b-offer">{t("nav.offer")} ↗</a>
        </div>
      </Reveal>
    </section>
  );
}
