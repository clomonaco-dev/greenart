"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const NETLIFY_FORM_NAME = "greenart-b2b-request";

export default function OfferForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle");

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch("/", {
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
          {/*
          <div className="offer-note">
            <span>GREENART / B2B</span>
            <strong>{t("offer.noteTitle")}</strong>
            <p>{t("offer.noteText")}</p>
          </div>
          */}
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
        {/* Required on the visible JS form so Netlify maps the AJAX POST to the detected form. */}
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />

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

        <button
          type="submit"
          className="button button--primary"
          disabled={status === "sending"}
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

        {status === "idle" && <p className="form-note">{t("form.note")}</p>}
      </Reveal>
    </section>
  );
}
