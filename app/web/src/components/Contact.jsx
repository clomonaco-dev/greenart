"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="section section--split" id="contact">
      <Reveal className="section__copy">
        <p className="eyebrow">{t("contact.kicker")}</p>
        <h2>{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>

        <div className="contact-list">
          <a href="mailto:info@greenart.tech">info@greenart.tech</a>
          <span>{t("contact.address")}</span>
          <span>{t("contact.phone")}</span>
        </div>
      </Reveal>

      <Reveal className="visual-card visual-card--contact">
        <span>GREENART</span>
        <small>{t("contact.visual")}</small>
      </Reveal>
    </section>
  );
}
