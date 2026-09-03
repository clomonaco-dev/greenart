"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function B2B() {
  const { t } = useLanguage();

  return (
    <section className="section section--b2b" id="b2b">
      <Reveal className="b2b-box">
        <div className="b2b-box__index">GREENART / INTERNATIONAL</div>
        <p className="eyebrow">{t("b2b.kicker")}</p>
        <h2>{t("b2b.title")}</h2>
        <p>{t("b2b.text")}</p>

        <div className="b2b-markets" aria-label={t("b2b.marketsLabel")}>
          <span>EUROPE</span>
          <i />
          <span>SELECTED MARKETS</span>
          <i />
          <span>PROFESSIONAL PARTNERS</span>
        </div>

        <div className="b2b-box__actions">
          <a href="/request-b2b-offer" className="button button--primary">
            {t("b2b.request")}
          </a>
          <a href="mailto:info@greenart.tech" className="text-link">
            info@greenart.tech
          </a>
        </div>
      </Reveal>
    </section>
  );
}
