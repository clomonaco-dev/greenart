"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Products() {
  const { t } = useLanguage();
  const products = [
    ["GA / 01", "products.product1", ""],
    ["GA / 02", "products.product2", "product-card__image--two"],
    ["GA / 03", "products.product3", "product-card__image--three"],
  ];

  return (
    <section className="section" id="products">
      <Reveal className="section-heading">
        <p className="eyebrow">{t("products.kicker")}</p>
        <h2>{t("products.title")}</h2>
        <p>{t("products.intro")}</p>
      </Reveal>

      <div className="product-grid">
        {products.map(([code, title, extraClass]) => (
          <Reveal as="article" className="product-card" key={code}>
            <div className={`product-card__image ${extraClass}`.trim()} />
            <p className="product-card__code">{code}</p>
            <h3>{t(title)}</h3>
            <p>{t("products.productText")}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
