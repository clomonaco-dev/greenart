"use client";

import { useLanguage } from "./LanguageProvider";
import { legalTranslations } from "@/data/legalTranslations";

export default function LegalDocument({ documentKey }) {
  const { language } = useLanguage();
  const copy = legalTranslations[language] || legalTranslations.en;
  const doc = copy[documentKey];

  return (
    <section className="privacy-policy legal-document" aria-labelledby={`${documentKey}-title`}>
      <div className="privacy-policy__hero">
        <p className="eyebrow">GREENART / {copy.common[documentKey === "tracking" ? "tracking" : documentKey]}</p>
        <h1 id={`${documentKey}-title`}>{doc.title}</h1>
        <p className="privacy-policy__version">{copy.common.updated}</p>
        <p className="privacy-policy__intro">{doc.intro}</p>
        <p className="legal-document__identity">{copy.common.controller}</p>
      </div>

      <div className="privacy-policy__content">
        {doc.sections.map((section) => (
          <section className="privacy-policy__section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets?.length ? (
              <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : null}
            {section.note ? <p className="privacy-policy__note">{section.note}</p> : null}
          </section>
        ))}
      </div>
    </section>
  );
}
