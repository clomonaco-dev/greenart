"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const items = [
  ["01", "/about", "nav.about", "homeMenu.about"],
  ["02", "/technology", "nav.technology", "homeMenu.technology"],
  ["03", "/cultivation", "nav.cultivation", "homeMenu.cultivation"],
  ["04", "/facility", "nav.facility", "homeMenu.facility"],
  ["05", "/products", "nav.products", "homeMenu.products"],
  ["06", "/quality-compliance", "nav.quality", "homeMenu.quality"],
  ["07", "/b2b-wholesale", "nav.b2b", "homeMenu.b2b"],
  ["08", "/contact", "nav.contact", "homeMenu.contact"],
  ["09", "/request-b2b-offer", "nav.offer", "homeMenu.offer"],
];

export default function HomeMenu() {
  const { t } = useLanguage();

  return (
    <section className="home-menu" id="site-menu">
      <div className="home-menu__inner">
        <Reveal className="home-menu__heading">
          <p className="eyebrow">GREENART · DIRECTORY</p>
          <h2>{t("homeMenu.title")}</h2>
          <p>{t("homeMenu.text")}</p>
        </Reveal>

        <div className="home-menu__grid">
          {items.map(([number, href, key, desc]) => (
            <Reveal as="a" href={href} className="home-menu__item" key={href}>
              <span className="home-menu__number">{number}</span>
              <div>
                <strong>{t(key)}</strong>
                <p>{t(desc)}</p>
              </div>
              <i aria-hidden="true">↗</i>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
