"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { privacyTranslations } from "@/data/privacyTranslations";

export default function PrivacyGate({ open, onAccept }) {
  const { language } = useLanguage();
  const copy = privacyTranslations[language] || privacyTranslations.en;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) setChecked(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className="privacy-gate" role="presentation">
      <div
        className="privacy-gate__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-gate-title"
        aria-describedby="privacy-gate-description"
      >
        <p className="privacy-gate__eyebrow">{copy.modalEyebrow}</p>
        <h2 id="privacy-gate-title">{copy.modalTitle}</h2>
        <p id="privacy-gate-description" className="privacy-gate__body">
          {copy.modalBody}
        </p>

        <label className="privacy-gate__check">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
          <span aria-hidden="true" className="privacy-gate__checkmark" />
          <span>{copy.modalCheck}</span>
        </label>

        <div className="privacy-gate__actions">
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="privacy-gate__policy-link"
          >
            {copy.modalRead} <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className="button button--primary privacy-gate__continue"
            disabled={!checked}
            onClick={onAccept}
          >
            {copy.modalContinue}
          </button>
        </div>
      </div>
    </div>
  );
}
