"use client";

import { useLanguage } from "./LanguageProvider";
import { privacyTranslations } from "@/data/privacyTranslations";

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const p = privacyTranslations[language] || privacyTranslations.en;

  return (
    <section className="privacy-policy" aria-labelledby="privacy-policy-title">
      <div className="privacy-policy__hero">
        <p className="eyebrow">GREENART / {p.navLabel}</p>
        <h1 id="privacy-policy-title">{p.title}</h1>
        <p className="privacy-policy__version">{p.versionLabel}</p>
        <p className="privacy-policy__intro">{p.intro}</p>
      </div>

      <div className="privacy-policy__content">
        <PolicySection title={p.controllerTitle}><p>{p.controllerBody}</p></PolicySection>
        <PolicySection title={p.dataTitle}>
          <p>{p.dataBody}</p>
          <p className="privacy-policy__note">{p.dataNote}</p>
        </PolicySection>
        <PolicySection title={p.purposesTitle}>
          <ul>{p.purposes.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{p.marketingNote}</p>
        </PolicySection>
        <PolicySection title={p.legalTitle}>
          <p>{p.legalBody}</p>
          <p className="privacy-policy__note">{p.acknowledgementNote}</p>
        </PolicySection>
        <PolicySection title={p.provisionTitle}><p>{p.provisionBody}</p></PolicySection>
        <PolicySection title={p.securityTitle}><p>{p.securityBody}</p></PolicySection>
        <PolicySection title={p.netlifyTitle}>
          <p>{p.netlifyBody}</p>
          <a className="text-link" href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">
            {p.netlifyLink} ↗
          </a>
        </PolicySection>
        <PolicySection title={p.transfersTitle}><p>{p.transfersBody}</p></PolicySection>
        <PolicySection title={p.recipientsTitle}>
          <ul>{p.recipients.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{p.noSale}</p>
        </PolicySection>
        <PolicySection title={p.retentionTitle}><p>{p.retentionBody}</p></PolicySection>
        <PolicySection title={p.rightsTitle}><p>{p.rightsBody}</p></PolicySection>
        <PolicySection title={p.automatedTitle}><p>{p.automatedBody}</p></PolicySection>
        <PolicySection title={p.changesTitle}><p>{p.changesBody}</p></PolicySection>
      </div>
    </section>
  );
}

function PolicySection({ title, children }) {
  return (
    <section className="privacy-policy__section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
