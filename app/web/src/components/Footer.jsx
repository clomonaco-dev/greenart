"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

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
        {/* FIRST VERSION: contact page kept in the project but hidden from navigation. */}
        {/* <a href="/contact">{t("footer.contact")}</a> */}
        <a href="mailto:info@greenart.tech">info@greenart.tech</a>
      </div>
    </footer>
  );
}
