"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "./LanguageProvider";

const NARRATIVE_PHASES = [
  { id: "premium", key: "intro.premium" },
  { id: "precision1", key: "intro.precision.1" },
  { id: "precision2", key: "intro.precision.2" },
  { id: "excellence1", key: "intro.excellence.1" },
  { id: "excellence2", key: "intro.excellence.2" },
  { id: "standards1", key: "intro.standards.1" },
  { id: "standards2", key: "intro.standards.2" },
  { id: "standards3", key: "intro.standards.3" },
  { id: "uncompromised1", key: "intro.uncompromised.1" },
  { id: "uncompromised2", key: "intro.uncompromised.2" },
  { id: "uncompromised3", key: "intro.uncompromised.3" },
];

const TEXT_PHASES = [
  ...NARRATIVE_PHASES.map(({ id }) => id),
  "greenart",
  "tagline",
];

// The complete soundtrack/intro remains divided over 60 seconds.
const INTRO_AUDIO_DURATION_MS = 60000;
const INTRO_VOLUME = 1;

// All 13 text screens share the first 59 seconds. Each one has a clearly
// visible approach animation, time to read, a normal fade-out and then a
// short fully-black pause before the next sentence starts from a point.
const FINALE_AT_MS = INTRO_AUDIO_DURATION_MS - 1000;
const TEXT_SLOT_MS = FINALE_AT_MS / TEXT_PHASES.length;
const BLACK_GAP_MS = 520;
const TEXT_VISIBLE_MS = TEXT_SLOT_MS - BLACK_GAP_MS;

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

    setHidden(false);
    setSoundOn(withSound);
    setPhase(NARRATIVE_PHASES[0].id);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      if (withSound) {
        audio.volume = INTRO_VOLUME;
        audio.play().catch(() => setSoundOn(false));
      }
    }

    // Every text screen is isolated. It fades out first, then the overlay stays
    // completely black for a short beat before the following text appears.
    TEXT_PHASES.forEach((id, index) => {
      const startsAt = index * TEXT_SLOT_MS;

      if (index > 0) {
        queue(() => setPhase(id), startsAt);
      }

      queue(() => setPhase(`blank-${id}`), startsAt + TEXT_VISIBLE_MS);
    });

    // At 59s the existing logo + B2B button appear and remain available after
    // the 60-second soundtrack ends.
    queue(() => setPhase("finale"), FINALE_AT_MS);

    // No automatic redirect at 60 seconds: the final CTA remains on screen.
  }

  function stopAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = INTRO_VOLUME;
    setSoundOn(false);
  }

  function showFinalScreen() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    introStartRef.current = null;

    stopAudio();
    setPhase("finale");
  }

  function goToOffer() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    introStartRef.current = null;

    stopAudio();
    setHidden(true);
    document.body.classList.remove("intro-open");

    router.replace("/request-b2b-offer");
  }

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !soundOn;
    setSoundOn(next);

    if (next) {
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

      audio.volume = INTRO_VOLUME;
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  }

  function messageClass(messagePhase, modifier = "") {
    const normalizedPhase = phase.startsWith("blank-")
      ? phase.slice("blank-".length)
      : phase;
    const currentIndex = TEXT_PHASES.indexOf(normalizedPhase);
    const messageIndex = TEXT_PHASES.indexOf(messagePhase);
    const isVisible = phase === messagePhase;
    const isLeaving = phase === `blank-${messagePhase}`;
    const isPast = currentIndex > messageIndex || phase === "finale";

    return [
      "intro__message",
      modifier,
      isVisible ? "is-visible" : "",
      isLeaving || isPast ? "is-out" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div
      className={`intro ${phase === "waiting" ? "intro--waiting" : ""} ${phase.startsWith("blank-") ? "intro--black-beat" : ""} ${hidden ? "is-hidden" : ""}`}
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
        {NARRATIVE_PHASES.map(({ id, key }) => (
          <div className={messageClass(id, "intro__message--headline")} key={id}>
            <strong>{t(key)}</strong>
          </div>
        ))}

        <div className={messageClass("greenart", "intro__message--greenart")}>
          <strong>GREEN ART</strong>
        </div>

        <div className={messageClass("tagline", "intro__message--tagline")}>
          <strong>{t("intro.tagline")}</strong>
        </div>

        <div className={`intro__final ${phase === "finale" ? "is-visible" : ""}`}>
          <img src={logo.src} alt="GreenArt — Art of Technological Cultivation" className="intro__final-logo" />
          <button
            className="intro__signature-button is-visible"
            type="button"
            onClick={goToOffer}
          >
            {t("intro.finalCta")}
          </button>
        </div>
      </div>

      {phase !== "waiting" && phase !== "finale" && (
        <div className="intro__tools is-visible">
          <button type="button" onClick={toggleSound}>
            {soundOn ? t("intro.soundOn") : t("intro.soundOff")}
          </button>
          <button type="button" onClick={showFinalScreen}>
            {t("intro.skip")}
          </button>
        </div>
      )}

      <audio ref={audioRef} preload="auto" onEnded={() => setSoundOn(false)}>
        <source src="/audio/preview.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
