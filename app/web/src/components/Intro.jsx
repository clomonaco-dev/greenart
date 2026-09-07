"use client";

import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "./LanguageProvider";

const PHASE_ORDER = [
  "premium",
  "precision",
  "excellence",
  "standards",
  "uncompromised",
  "signature",
];

export default function Intro() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("waiting");
  const [hidden, setHidden] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);
  const timersRef = useRef([]);

  useEffect(() => {
    document.body.classList.add("intro-open");

    return () => {
      timersRef.current.forEach(clearTimeout);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.body.classList.remove("intro-open");
    };
  }, []);

  function queue(fn, ms) {
    timersRef.current.push(window.setTimeout(fn, ms));
  }

  function startIntro(withSound) {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setSoundOn(withSound);
    setPhase("premium");

    if (withSound && audioRef.current) {
      audioRef.current.volume = 0.38;
      audioRef.current.play().catch(() => setSoundOn(false));
    }

    queue(() => setPhase("precision"), 2800);
    queue(() => setPhase("excellence"), 5700);
    queue(() => setPhase("standards"), 8900);
    queue(() => setPhase("uncompromised"), 12200);
    queue(() => {
      setPhase("signature");
      stopAudio();
    }, 15500);
  }

  function stopAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    // iOS Safari does not reliably support script-controlled volume fades.
    // Pause and reset immediately so the intro audio can never continue on the Home page.
    audio.pause();
    audio.currentTime = 0;
    setSoundOn(false);
  }

  function closeIntro() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    stopAudio();
    setHidden(true);
    document.body.classList.remove("intro-open");
  }

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !soundOn;
    setSoundOn(next);

    if (next) {
      audio.volume = 0.38;
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  }

  function messageClass(messagePhase, modifier = "") {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    const messageIndex = PHASE_ORDER.indexOf(messagePhase);
    const isVisible = phase === messagePhase;
    const isOut = currentIndex > messageIndex;

    return [
      "intro__message",
      modifier,
      isVisible ? "is-visible" : "",
      isOut ? "is-out" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div className={`intro ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="intro__glow" />

      {phase === "waiting" && (
        <>
          <button className="intro__enter" type="button" onClick={() => startIntro(true)}>
            <img src={logo.src} alt="GreenArt" className="intro__enter-logo" />
            <span>{t("intro.enter")}</span>
            <small>{t("intro.soundHint")}</small>
          </button>

          <button className="intro__mute-enter" type="button" onClick={() => startIntro(false)}>
            {t("intro.enterMuted")}
          </button>
        </>
      )}

      <div className="intro__sequence" aria-live="polite">
        <div className={messageClass("premium", "intro__message--premium")}>
          <p>{t("intro.premium")}</p>
        </div>

        <div className={messageClass("precision", "intro__message--headline")}>
          <strong>{t("intro.precision")}</strong>
        </div>

        <div className={messageClass("excellence")}>
          <p>{t("intro.excellence")}</p>
        </div>

        <div className={messageClass("standards", "intro__message--standards")}>
          <p>{t("intro.standards")}</p>
        </div>

        <div className={messageClass("uncompromised", "intro__message--manifesto")}>
          <strong>{t("intro.uncompromised")}</strong>
        </div>

        <div className={`intro__signature ${phase === "signature" ? "is-visible" : ""}`}>
          <strong>GREENART</strong>
          <span>{t("intro.tagline")}</span>
          <button className="intro__signature-button" type="button" onClick={closeIntro}>
            {t("intro.continue")}
          </button>
        </div>
      </div>

      {phase !== "waiting" && (
        <div className="intro__tools is-visible">
          <button type="button" onClick={toggleSound}>
            {soundOn ? t("intro.soundOn") : t("intro.soundOff")}
          </button>
          <button type="button" onClick={closeIntro}>
            {t("intro.skip")}
          </button>
        </div>
      )}

      <audio ref={audioRef} preload="auto" onEnded={() => setSoundOn(false)}>
        <source src="/audio/intro.wav" type="audio/wav" />
      </audio>
    </div>
  );
}
