"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const navItems = [
  ["about", "nav.about"],
  ["technology", "nav.technology"],
  ["cultivation", "nav.cultivation"],
  ["facility", "nav.facility"],
  ["products", "nav.products"],
  ["quality", "nav.quality"],
  ["b2b", "nav.b2b"],
  ["contact", "nav.contact"],
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#home" aria-label="GreenArt home">
        <img src="/images/logo.svg" alt="GreenArt" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${open ? "open" : ""}`} aria-label="Main navigation">
        {navItems.map(([id, key]) => (
          <a
            href={`#${id}`}
            key={id}
            className={activeSection === id ? "active" : ""}
            onClick={closeMenu}
          >
            {t(key)}
          </a>
        ))}

        <a
          href="#offer"
          className={`nav-cta ${activeSection === "offer" ? "active" : ""}`}
          onClick={closeMenu}
        >
          {t("nav.offer")}
        </a>
      </nav>

      <div className="language-switcher" aria-label="Language selector">
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
