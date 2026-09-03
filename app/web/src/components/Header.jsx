"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

const navItems = [
  ["/", "nav.home"],
  ["/about", "nav.about"],
  ["/technology", "nav.technology"],
  ["/cultivation", "nav.cultivation"],
  ["/facility", "nav.facility"],
  ["/products", "nav.products"],
  ["/quality-compliance", "nav.quality"],
  ["/b2b-wholesale", "nav.b2b"],
  ["/contact", "nav.contact"],
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${open ? "open" : ""}`} aria-label="Main navigation">
        {navItems.map(([href, key]) => (
          <a
            href={href}
            key={href}
            className={pathname === href ? "active" : ""}
            onClick={closeMenu}
          >
            {t(key)}
          </a>
        ))}

        <a
          href="/request-b2b-offer"
          className={`nav-cta ${pathname === "/request-b2b-offer" ? "active" : ""}`}
          onClick={closeMenu}
        >
          {t("nav.offer")}
        </a>

        <div className="language-switcher language-switcher--mobile" aria-label="Language selector">
          {["en", "es", "it", "de"].map((lang) => (
            <button
              type="button"
              key={lang}
              className={language === lang ? "active" : ""}
              onClick={() => setLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <div className="language-switcher language-switcher--desktop" aria-label="Language selector">
        {["en", "es", "it", "de"].map((lang) => (
          <button
            type="button"
            key={lang}
            className={language === lang ? "active" : ""}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
