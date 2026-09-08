"use client";

import { useLanguage } from "./LanguageProvider";
import { legalTranslations } from "@/data/legalTranslations";

export default function Footer() {
  const { language, t } = useLanguage();
  const legal = legalTranslations[language] || legalTranslations.en;

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <p>© {new Date().getFullYear()} GreenArt</p>
      </div>

      <div className="site-footer__statement">
        <span>{t("footer.statement")}</span>
      </div>

      <div className="site-footer__links">
        <a href="/">{t("nav.intro")}</a>
        <a href="/privacy-policy">{legal.common.privacy}</a>
        <a href="/cookie-policy">{legal.common.tracking}</a>
        <a href="/terms-and-conditions">{legal.common.terms}</a>
        <a href="mailto:info@greenart.tech">info@greenart.tech</a>
      </div>
    </footer>
  );
}
