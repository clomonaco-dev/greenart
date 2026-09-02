"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div>
        <img src="/images/logo.svg" alt="GreenArt" />
        <p>© {new Date().getFullYear()} GreenArt</p>
      </div>

      <div className="site-footer__links">
        <a href="#home">{t("footer.home")}</a>
        <a href="#contact">{t("footer.contact")}</a>
        <a href="mailto:info@greenart.tech">info@greenart.tech</a>
      </div>
    </footer>
  );
}
