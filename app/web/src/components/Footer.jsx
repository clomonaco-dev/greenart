"use client";

import { useLanguage } from "./LanguageProvider";
import { privacyTranslations } from "@/data/privacyTranslations";

export default function Footer() {
  const { language, t } = useLanguage();
  const privacyCopy = privacyTranslations[language] || privacyTranslations.en;

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
        <a href="/privacy-policy">{privacyCopy.navLabel}</a>
        <a href="mailto:info@greenart.tech">info@greenart.tech</a>
      </div>
    </footer>
  );
}
