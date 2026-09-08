"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const mailLabels = {
  en: { subject: "GreenArt B2B offer request", company: "Company", name: "Contact", email: "Email", country: "Destination market", business: "Business type", volume: "Indicative volume", message: "Requirements" },
  es: { subject: "Solicitud de oferta B2B GreenArt", company: "Empresa", name: "Contacto", email: "Email", country: "Mercado de destino", business: "Tipo de negocio", volume: "Volumen indicativo", message: "Necesidades" },
  it: { subject: "Richiesta offerta B2B GreenArt", company: "Azienda", name: "Referente", email: "Email", country: "Mercato di destinazione", business: "Tipo attività", volume: "Volume indicativo", message: "Esigenze" },
  de: { subject: "GreenArt B2B-Angebotsanfrage", company: "Unternehmen", name: "Ansprechpartner", email: "E-Mail", country: "Zielmarkt", business: "Geschäftsart", volume: "Ungefähres Volumen", message: "Anforderungen" },
};

export default function OfferForm() {
  const { language, t } = useLanguage();

  function submit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const labels = mailLabels[language] ?? mailLabels.en;

    const body = [
      `${labels.company}: ${data.get("company") || ""}`,
      `${labels.name}: ${data.get("name") || ""}`,
      `${labels.email}: ${data.get("email") || ""}`,
      `${labels.country}: ${data.get("country") || ""}`,
      `${labels.business}: ${data.get("business") || ""}`,
      `${labels.volume}: ${data.get("volume") || ""}`,
      "",
      `${labels.message}:`,
      data.get("message") || "",
    ].join("\n");

    window.location.href =
      `mailto:info@greenart.tech?subject=${encodeURIComponent(labels.subject)}` +
      `&body=${encodeURIComponent(body)}`;
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

      <Reveal as="form" className="offer-form" onSubmit={submit}>
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

        <button type="submit" className="button button--primary">
          {t("form.submit")}
        </button>

        <p className="form-note">{t("form.note")}</p>
      </Reveal>
    </section>
  );
}
