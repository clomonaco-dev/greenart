"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Products() {
  const { t } = useLanguage();
  const products = [
    ["GA / 01", "products.product1", "products.product1Text", "flower"],
    ["GA / 02", "products.product2", "products.product2Text", "bulk"],
    ["GA / 03", "products.product3", "products.product3Text", "partner"],
  ];

  return (
    <section className="section section--stack section--products" id="products">
      <Reveal className="section-heading">
        <p className="eyebrow">{t("products.kicker")}</p>
        <h2>{t("products.title")}</h2>
        <p>{t("products.intro")}</p>
      </Reveal>

      <div className="product-grid">
        {products.map(([code, title, text, kind], index) => (
          <Reveal as="article" className="product-card" key={code}>
            <div className={`product-card__visual product-card__visual--${kind}`} aria-hidden="true">
              <div className="product-card__disc" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>GREENART</small>
            </div>
            <div className="product-card__meta">
              <p className="product-card__code">{code}</p>
              <span>{t("products.export")}</span>
            </div>
            <h3>{t(title)}</h3>
            <p>{t(text)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
