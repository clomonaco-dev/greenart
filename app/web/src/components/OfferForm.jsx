"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { PRIVACY_VERSION } from "@/data/privacyTranslations";
import { legalTranslations } from "@/data/legalTranslations";
import {
  OPEN_PRIVACY_CHOICES_EVENT,
  PRIVACY_CHOICE_EVENT,
  PRIVACY_CHOICE_VERSION,
  canUseB2BForm,
  readPrivacyChoice,
} from "@/lib/privacyConsent";

const NETLIFY_FORM_NAME = "greenart-b2b-request";

export default function OfferForm() {
  const { language, t } = useLanguage();
  const legal = legalTranslations[language] || legalTranslations.en;
  const copy = legal.consent;
  const [status, setStatus] = useState("idle");
  const [privacyChoice, setPrivacyChoice] = useState(null);

  useEffect(() => {
    setPrivacyChoice(readPrivacyChoice());

    function handleChoice(event) {
      setPrivacyChoice(event.detail || readPrivacyChoice());
      setStatus("idle");
    }

    window.addEventListener(PRIVACY_CHOICE_EVENT, handleChoice);
    return () => window.removeEventListener(PRIVACY_CHOICE_EVENT, handleChoice);
  }, []);

  const formAllowed = canUseB2BForm(privacyChoice);

  function openPrivacyChoices() {
    window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT));
  }

  async function submit(event) {
    event.preventDefault();

    const currentChoice = readPrivacyChoice();
    if (!canUseB2BForm(currentChoice)) {
      setPrivacyChoice(currentChoice);
      setStatus("privacy-required");
      openPrivacyChoices();
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    // The single global privacy choice also acts as the B2B privacy
    // acknowledgement. Only ALL and ESSENTIAL allow a B2B submission.
    formData.set("privacy_acknowledged", "true");
    formData.set("privacy_version", PRIVACY_VERSION);
    formData.set("privacy_acknowledged_at", currentChoice.timestamp);
    formData.set("privacy_language", language);
    formData.set("privacy_choice", currentChoice.status);
    formData.set("privacy_choice_version", PRIVACY_CHOICE_VERSION);

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
          value={formAllowed ? "true" : "false"}
        />
        <input type="hidden" name="privacy_version" value={PRIVACY_VERSION} />
        <input
          type="hidden"
          name="privacy_acknowledged_at"
          value={formAllowed ? privacyChoice?.timestamp || "" : ""}
        />
        <input type="hidden" name="privacy_language" value={language} />
        <input
          type="hidden"
          name="privacy_choice"
          value={formAllowed ? privacyChoice?.status || "" : ""}
        />
        <input
          type="hidden"
          name="privacy_choice_version"
          value={PRIVACY_CHOICE_VERSION}
        />

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
          <span className={formAllowed ? "is-accepted" : ""} aria-hidden="true" />
          <div>
            <p>
              {formAllowed
                ? copy.formEnabled
                : privacyChoice?.status === "rejected"
                  ? copy.formRejected
                  : copy.formRequired}
            </p>
            <div className="form-privacy-status__links">
              <a href="/privacy-policy" target="_blank" rel="noreferrer">
                {copy.privacy} ↗
              </a>
              <button type="button" onClick={openPrivacyChoices}>
                {copy.reopen}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="button button--primary"
          disabled={status === "sending" || !formAllowed}
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
            {copy.formRequired}
          </p>
        )}

        {status === "idle" && <p className="form-note">{t("form.note")}</p>}
      </Reveal>
    </section>
  );
}
