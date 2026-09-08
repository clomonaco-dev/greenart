"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import PrivacyGate from "./PrivacyGate";
import {
  PRIVACY_VERSION,
  privacyTranslations,
} from "@/data/privacyTranslations";

const NETLIFY_FORM_NAME = "greenart-b2b-request";

export default function OfferForm() {
  const { language, t } = useLanguage();
  const privacyCopy = privacyTranslations[language] || privacyTranslations.en;
  const [status, setStatus] = useState("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(true);
  const [privacyAcknowledgedAt, setPrivacyAcknowledgedAt] = useState("");

  function acceptPrivacy() {
    setPrivacyAccepted(true);
    setPrivacyAcknowledgedAt(new Date().toISOString());
    setPrivacyModalOpen(false);
    setStatus("idle");
  }

  async function submit(event) {
    event.preventDefault();

    if (!privacyAccepted || !privacyAcknowledgedAt) {
      setStatus("privacy-required");
      setPrivacyModalOpen(true);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Record the exact privacy notice acknowledgement with the Netlify submission.
    formData.set("privacy_acknowledged", "true");
    formData.set("privacy_version", PRIVACY_VERSION);
    formData.set("privacy_acknowledged_at", privacyAcknowledgedAt);
    formData.set("privacy_language", language);

    setStatus("sending");

    try {
      const response = await fetch("/.netlify/functions/submit-b2b", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed: ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <>
      <PrivacyGate open={privacyModalOpen} onAccept={acceptPrivacy} />

      <section className="section section--offer" id="offer">
        <Reveal className="offer-copy">
          <p className="eyebrow">{t("offer.kicker")}</p>
          <div className="offer-note">
            <strong>{t("offer.title")}</strong>
            <p>{t("offer.text")}</p>
          </div>
        </Reveal>

        <Reveal
          as="form"
          className="offer-form"
          name={NETLIFY_FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={submit}
        >
          <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
          <input
            type="hidden"
            name="privacy_acknowledged"
            value={privacyAccepted ? "true" : "false"}
          />
          <input type="hidden" name="privacy_version" value={PRIVACY_VERSION} />
          <input
            type="hidden"
            name="privacy_acknowledged_at"
            value={privacyAcknowledgedAt}
          />
          <input type="hidden" name="privacy_language" value={language} />

          <p className="netlify-honeypot" aria-hidden="true">
            <label>
              Don&apos;t fill this out if you&apos;re human:
              <input name="bot-field" tabIndex="-1" autoComplete="off" />
            </label>
          </p>

          <div className="form-field">
            <label htmlFor="company">{t("form.company")}</label>
            <input id="company" name="company" type="text" required />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">{t("form.name")}</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="form-field">
              <label htmlFor="email">{t("form.email")}</label>
              <input id="email" name="email" type="email" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="country">{t("form.country")}</label>
              <input id="country" name="country" type="text" required />
            </div>

            <div className="form-field">
              <label htmlFor="business">{t("form.business")}</label>
              <input id="business" name="business" type="text" />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="volume">{t("form.volume")}</label>
            <input id="volume" name="volume" type="text" />
          </div>

          <div className="form-field">
            <label htmlFor="message">{t("form.message")}</label>
            <textarea id="message" name="message" rows="5" />
          </div>

          <div className="form-privacy-status">
            <span className={privacyAccepted ? "is-accepted" : ""} aria-hidden="true" />
            <div>
              <p>
                {privacyAccepted
                  ? privacyCopy.formPrivacyAccepted
                  : privacyCopy.formPrivacyRequired}
              </p>
              <a href="/privacy-policy" target="_blank" rel="noreferrer">
                {privacyCopy.modalRead} ↗
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="button button--primary"
            disabled={status === "sending" || !privacyAccepted}
          >
            {status === "sending" ? t("form.sending") : t("form.submit")}
          </button>

          {status === "success" && (
            <p className="form-note" role="status">
              {t("form.success")}
            </p>
          )}

          {status === "error" && (
            <p className="form-note" role="alert">
              {t("form.error")}
            </p>
          )}

          {status === "privacy-required" && (
            <p className="form-note" role="alert">
              {privacyCopy.formPrivacyRequired}
            </p>
          )}

          {status === "idle" && <p className="form-note">{t("form.note")}</p>}
        </Reveal>
      </section>
    </>
  );
}
