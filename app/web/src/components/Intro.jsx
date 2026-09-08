"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

const INTRO_DURATION_MS = 90000;

const PHASE_TIMINGS = {
  precision: 8000,
  excellence: 24000,
  standards: 40000,
  uncompromised: 60000,
  signature: 80000,
};

export default function Intro() {
  const router = useRouter();
  const { t } = useLanguage();
  const [phase, setPhase] = useState("waiting");
  const [hidden, setHidden] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const introStartRef = useRef(null);

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
    introStartRef.current = performance.now();

    setSoundOn(withSound);
    setPhase("premium");

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      if (withSound) {
        audio.volume = 0.38;
        audio.play().catch(() => setSoundOn(false));
      }
    }

    queue(() => setPhase("precision"), PHASE_TIMINGS.precision);
    queue(() => setPhase("excellence"), PHASE_TIMINGS.excellence);
    queue(() => setPhase("standards"), PHASE_TIMINGS.standards);
    queue(() => setPhase("uncompromised"), PHASE_TIMINGS.uncompromised);
    queue(() => setPhase("signature"), PHASE_TIMINGS.signature);
    queue(closeIntro, INTRO_DURATION_MS);
  }

  function stopAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setSoundOn(false);
  }

  function closeIntro() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    introStartRef.current = null;

    stopAudio();
    setHidden(true);
    document.body.classList.remove("intro-open");

    // FIRST VERSION: every completed/skipped intro lands directly on B2B OFFER.
    // `replace` avoids reopening the intro just by pressing the browser Back button.
    router.replace("/request-b2b-offer");
  }

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !soundOn;
    setSoundOn(next);

    if (next) {
      audio.volume = 0.38;

      if (introStartRef.current !== null) {
        const elapsedSeconds = Math.max(
          0,
          (performance.now() - introStartRef.current) / 1000
        );

        try {
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = Math.min(
              elapsedSeconds,
              Math.max(0, audio.duration - 0.05)
            );
          } else {
            audio.currentTime = elapsedSeconds;
          }
        } catch {
          // If metadata is not ready yet, playback still starts normally.
        }
      }

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

  function stagedCopy(keys, delays) {
    return (
      <strong className="intro__staged-copy">
        {keys.map((key, index) => (
          <span
            className="intro__staged-line"
            style={{ "--intro-line-delay": `${delays[index] ?? 0}ms` }}
            key={key}
          >
            {t(key)}
          </span>
        ))}
      </strong>
    );
  }

  return (
    <div
      className={`intro ${phase === "waiting" ? "intro--waiting" : ""} ${hidden ? "is-hidden" : ""}`}
      aria-hidden={hidden}
    >
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
        <div className={messageClass("premium", "intro__message--headline")}> 
          {stagedCopy(["intro.premium"], [0])}
        </div>

        <div className={messageClass("precision", "intro__message--headline")}> 
          {stagedCopy(
            ["intro.precision.1", "intro.precision.2"],
            [0, 5000]
          )}
        </div>

        <div className={messageClass("excellence", "intro__message--headline")}> 
          {stagedCopy(
            ["intro.excellence.1", "intro.excellence.2"],
            [0, 5200]
          )}
        </div>

        <div className={messageClass("standards", "intro__message--headline")}> 
          {stagedCopy(
            ["intro.standards.1", "intro.standards.2", "intro.standards.3"],
            [0, 4500, 9000]
          )}
        </div>

        <div className={messageClass("uncompromised", "intro__message--headline")}> 
          {stagedCopy(
            [
              "intro.uncompromised.1",
              "intro.uncompromised.2",
              "intro.uncompromised.3",
            ],
            [0, 4500, 9000]
          )}
        </div>

        <div className={`intro__signature ${phase === "signature" ? "is-visible" : ""}`}>
          <strong>GREENART</strong>
          <span>{t("intro.tagline")}</span>
          <button className="intro__signature-button" type="button" onClick={closeIntro}>
            {t("nav.offer")}
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
        <source src="/audio/intro.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
