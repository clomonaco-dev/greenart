"use client";

import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "./LanguageProvider";

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
    setPhase("logo");

    if (withSound && audioRef.current) {
      audioRef.current.volume = 0.38;
      audioRef.current.play().catch(() => setSoundOn(false));
    }

    queue(() => setPhase("description"), 4750);
    queue(() => setPhase("b2b"), 9500);
    queue(() => {
      setPhase("continue");
      stopAudio();
    }, 14500);
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

      <div className="intro__sequence">
        <img
          src={logo.src}
          alt="GreenArt"
          className={[
            "intro__logo",
            phase === "logo" ? "is-visible" : "",
            ["description", "b2b", "continue"].includes(phase) ? "is-out" : "",
          ].join(" ")}
        />

        <div
          className={[
            "intro__message",
            phase === "description" ? "is-visible" : "",
            ["b2b", "continue"].includes(phase) ? "is-out" : "",
          ].join(" ")}
        >
          <p>{t("hero.short")}</p>
        </div>

        <div
          className={[
            "intro__message intro__message--b2b",
            phase === "b2b" ? "is-visible" : "",
            phase === "continue" ? "is-out" : "",
          ].join(" ")}
        >
          <strong>{t("hero.b2bTitle")}</strong>
          <p>{t("hero.b2bText")}</p>
          <p>
            {t("hero.register")} {" "}
            <a href="mailto:info@greenart.tech">info@greenart.tech</a>
          </p>
        </div>

        <button
          className={`intro__continue ${phase === "continue" ? "is-visible" : ""}`}
          type="button"
          onClick={closeIntro}
        >
          {t("intro.continue")}
        </button>
      </div>

      {phase !== "waiting" && (
        <div className="intro__tools is-visible">
          <button type="button" onClick={toggleSound}>
            {soundOn ? "SOUND ON" : "SOUND OFF"}
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
