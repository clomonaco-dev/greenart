"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import {
  legalTranslations,
  TRACKING_CONSENT_VERSION,
} from "@/data/legalTranslations";
import {
  OPEN_PRIVACY_CHOICES_EVENT,
  PRIVACY_CHOICE_EVENT,
  PRIVACY_CHOICE_STORAGE_KEY,
  PRIVACY_CHOICE_VERSION,
  PRIVACY_CHOICES,
  canTrack,
  readPrivacyChoice,
} from "@/lib/privacyConsent";

const ANALYTICS_SCRIPT_ID = "greenart-clm-analytics";

const ANALYTICS_SCRIPT_URL =
  "https://analytics.clmautomation.it/script.js";

const ANALYTICS_WEBSITE_ID =
  "0c27b197-c5f1-495e-a783-0bb6c729b3a9";

function makeConsentId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `ga-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function ConsentManager() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const legal =
    legalTranslations[language] || legalTranslations.en;

  const copy = legal.consent;

  const [choice, setChoice] = useState(null);
  const [open, setOpen] = useState(false);

  const mounted = useRef(false);

  const isIntro = pathname === "/";

  const isLegalPage = [
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",
  ].includes(pathname);

  const gateExempt = isIntro || isLegalPage;

  const trackingEnabled = useMemo(
    () => canTrack(choice),
    [choice]
  );

  /*
   * ---------------------------------------------------------
   * INITIAL CONSENT STATE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    mounted.current = true;

    const stored = readPrivacyChoice();

    setChoice(stored);

    /*
     * Intro:
     * - nessuna modale
     * - nessun analytics
     *
     * Pagine legali:
     * - consultabili anche senza aver effettuato una scelta.
     */
    setOpen(!gateExempt && !stored);
  }, [gateExempt]);

  /*
   * ---------------------------------------------------------
   * ROUTE CHANGE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (gateExempt) {
      setOpen(false);
      return;
    }

    const current = readPrivacyChoice();

    setChoice(current);

    if (!current) {
      setOpen(true);
    }
  }, [pathname, gateExempt]);

  /*
   * ---------------------------------------------------------
   * MODAL SCROLL LOCK
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /*
   * ---------------------------------------------------------
   * EXTERNAL "OPEN PRIVACY CHOICES" EVENT
   * ---------------------------------------------------------
   */

  useEffect(() => {
    function handleOpenPreferences() {
      /*
       * Sull'intro non mostriamo mai la modale.
       */
      if (window.location.pathname === "/") {
        return;
      }

      setChoice(readPrivacyChoice());
      setOpen(true);
    }

    window.addEventListener(
      OPEN_PRIVACY_CHOICES_EVENT,
      handleOpenPreferences
    );

    return () => {
      window.removeEventListener(
        OPEN_PRIVACY_CHOICES_EVENT,
        handleOpenPreferences
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * CLM AUTOMATION ANALYTICS
   * ---------------------------------------------------------
   *
   * Lo script:
   *
   * https://analytics.clmautomation.it/script.js
   *
   * viene aggiunto al DOM SOLO se:
   *
   * 1. non siamo sull'intro "/"
   * 2. l'utente ha scelto "ACCETTA TUTTI"
   *
   * Con ESSENTIAL o REJECTED non viene caricato.
   */

  useEffect(() => {
    /*
     * INTRO:
     * analytics sempre vietato.
     */
    if (isIntro) {
      const existingScript =
        document.getElementById(
          ANALYTICS_SCRIPT_ID
        );

      /*
       * Se lo script era stato precedentemente caricato
       * durante la navigazione SPA, rimuoverlo dal DOM
       * non garantisce che il JS già eseguito venga
       * completamente disattivato.
       *
       * Per questo, se torniamo all'intro dopo che
       * Analytics era stato caricato, facciamo un reload.
       *
       * Dopo il reload siamo su "/" e questo componente
       * non caricherà Analytics.
       */
      if (existingScript) {
        existingScript.remove();
        window.location.reload();
      }

      return undefined;
    }

    /*
     * Tracking non consentito.
     */
    if (!trackingEnabled) {
      return undefined;
    }

    /*
     * Evita duplicazioni.
     */
    if (
      document.getElementById(
        ANALYTICS_SCRIPT_ID
      )
    ) {
      return undefined;
    }

    /*
     * Corrisponde a:
     *
     * <script
     *   defer
     *   src="https://analytics.clmautomation.it/script.js"
     *   data-website-id="..."
     * ></script>
     */

    const script =
      document.createElement("script");

    script.id = ANALYTICS_SCRIPT_ID;

    script.src =
      ANALYTICS_SCRIPT_URL;

    script.defer = true;

    script.dataset.websiteId =
      ANALYTICS_WEBSITE_ID;

    document.head.appendChild(script);

    return undefined;
  }, [isIntro, trackingEnabled]);

  /*
   * ---------------------------------------------------------
   * STORE PRIVACY CHOICE
   * ---------------------------------------------------------
   */

  const storeChoice = useCallback(
    async (status) => {
      const previous =
        readPrivacyChoice();

      const trackingWasEnabled =
        previous?.status ===
        PRIVACY_CHOICES.ALL;

      const trackingWillBeEnabled =
        status === PRIVACY_CHOICES.ALL;

      const next = {
        status,
        version: PRIVACY_CHOICE_VERSION,
        timestamp: new Date().toISOString(),

        consentId:
          status === PRIVACY_CHOICES.ALL
            ? previous?.consentId ||
              makeConsentId()
            : null,
      };

      /*
       * Salviamo la scelta localmente.
       */
      window.localStorage.setItem(
        PRIVACY_CHOICE_STORAGE_KEY,
        JSON.stringify(next)
      );

      setChoice(next);
      setOpen(false);

      /*
       * Notifica eventuali altri componenti.
       */
      window.dispatchEvent(
        new CustomEvent(
          PRIVACY_CHOICE_EVENT,
          {
            detail: next,
          }
        )
      );

      /*
       * -----------------------------------------------------
       * RECORD REMOTE CONSENT
       * -----------------------------------------------------
       *
       * Registriamo su Netlify solo il consenso
       * AFFIRMATIVE al tracking opzionale.
       *
       * Essential e Reject rimangono locali.
       */

      if (
        status === PRIVACY_CHOICES.ALL
      ) {
        try {
          const body =
            new URLSearchParams({
              "form-name":
                "greenart-tracking-consent",

              consent_status:
                "granted",

              consent_version:
                TRACKING_CONSENT_VERSION,

              consent_at:
                next.timestamp,

              consent_language:
                language,

              consent_id:
                next.consentId,
            });

          await fetch("/", {
            method: "POST",

            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },

            body: body.toString(),

            keepalive: true,
          });
        } catch (error) {
          console.warn(
            "Unable to record tracking consent receipt",
            error
          );
        }
      }

      /*
       * -----------------------------------------------------
       * TRACKING REVOCATION
       * -----------------------------------------------------
       *
       * Se Analytics era già stato caricato e
       * l'utente passa da:
       *
       * ALL
       *
       * a:
       *
       * ESSENTIAL
       * oppure
       * REJECTED
       *
       * facciamo un reload.
       *
       * È importante perché eliminare semplicemente il
       * tag <script> non annulla necessariamente codice,
       * listener, timer o stato già inizializzati dallo
       * script analytics.
       */

      if (
        trackingWasEnabled &&
        !trackingWillBeEnabled
      ) {
        window.location.reload();
      }
    },
    [language]
  );

  /*
   * ---------------------------------------------------------
   * OPEN PREFERENCES
   * ---------------------------------------------------------
   */

  function openPreferences() {
    if (isIntro) return;

    setChoice(readPrivacyChoice());
    setOpen(true);
  }

  /*
   * Nessuna UI privacy durante l'intro.
   */

  if (!mounted.current || isIntro) {
    return null;
  }

  return (
    <>
      {open ? (
        <div
          className="consent-layer"
          role="presentation"
        >
          <section
            className="consent-panel consent-panel--three-choice"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-consent-title"
            aria-describedby="privacy-consent-description"
          >
            <p className="consent-panel__eyebrow">
              {copy.eyebrow}
            </p>

            <h2 id="privacy-consent-title">
              {copy.title}
            </h2>

            <p
              id="privacy-consent-description"
              className="consent-panel__body"
            >
              {copy.body}
            </p>

            <div className="consent-panel__summary">
              <div>
                <strong>
                  {copy.essentialTitle}
                </strong>

                <p>
                  {copy.essentialDesc}
                </p>
              </div>

              <div>
                <strong>
                  {copy.trackingTitle}
                </strong>

                <p>
                  {copy.trackingDesc}
                </p>
              </div>
            </div>

            <div className="consent-panel__links">
              <a href="/privacy-policy">
                {copy.privacy}
              </a>

              <a href="/cookie-policy">
                {copy.policy}
              </a>

              <a href="/terms-and-conditions">
                {legal.common.terms}
              </a>
            </div>

            <div className="consent-panel__actions consent-panel__actions--three">
              <button
                type="button"
                className="button consent-button consent-button--secondary"
                onClick={() =>
                  storeChoice(
                    PRIVACY_CHOICES.REJECTED
                  )
                }
              >
                {copy.reject}
              </button>

              <button
                type="button"
                className="button consent-button consent-button--ghost"
                onClick={() =>
                  storeChoice(
                    PRIVACY_CHOICES.ESSENTIAL
                  )
                }
              >
                {copy.essential}
              </button>

              <button
                type="button"
                className="button button--primary consent-button"
                onClick={() =>
                  storeChoice(
                    PRIVACY_CHOICES.ALL
                  )
                }
              >
                {copy.acceptAll}
              </button>
            </div>

            <p className="consent-panel__footnote">
              {copy.rejectNote}
            </p>
          </section>
        </div>
      ) : null}

      {choice ? (
        <button
          type="button"
          className="privacy-choices-button"
          onClick={openPreferences}
          aria-label={copy.reopen}
        >
          {copy.reopen}
        </button>
      ) : null}
    </>
  );
}