"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const items = [
  ["01", "/about", "nav.about"],
  ["02", "/technology", "nav.technology"],
  ["03", "/cultivation", "nav.cultivation"],
  ["04", "/facility", "nav.facility"],
  ["05", "/products", "nav.products"],
  ["06", "/quality-compliance", "nav.quality"],
  ["07", "/b2b-wholesale", "nav.b2b"],
  ["08", "/contact", "nav.contact"],
  ["09", "/request-b2b-offer", "nav.offer"],
];

export default function HomeMenu() {
  const { t } = useLanguage();

  return (
    <section className="home-menu" id="site-menu">
      <Reveal className="home-menu__heading">
        <p className="eyebrow">GREENART</p>
        <h2>{t("homeMenu.title")}</h2>
        <p>{t("homeMenu.text")}</p>
      </Reveal>

      <div className="home-menu__grid">
        {items.map(([number, href, key]) => (
          <Reveal as="a" href={href} className="home-menu__item" key={href}>
            <span>{number}</span>
            <strong>{t(key)}</strong>
            <i aria-hidden="true">↗</i>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
