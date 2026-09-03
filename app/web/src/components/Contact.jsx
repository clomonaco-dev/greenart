"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const EMAIL = "info@greenart.tech";

export default function Contact() {
  const { t } = useLanguage();
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("GreenArt — Commercial enquiry")}`;

  return (
    <section className="section section--split section--contact" id="contact">
      <Reveal className="section__copy contact-copy">
        <p className="eyebrow">{t("contact.kicker")}</p>
        <h2>{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>

        <div className="contact-email-panel">
          <div className="contact-email-panel__copy">
            <span className="contact-email-panel__label">{t("contact.directLabel")}</span>
            <a className="contact-email-panel__address" href={mailto}>
              {EMAIL}
            </a>
            <span className="contact-email-panel__note">{t("contact.emailNote")}</span>
          </div>

          <a className="button button--primary contact-email-panel__button" href={mailto}>
            {t("contact.writeEmail")} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="contact-list">
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
