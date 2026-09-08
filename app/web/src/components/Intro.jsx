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

// The audio lasts 90 seconds. The final screen starts 5 seconds before the end
// and then remains on screen until the B2B CTA is explicitly pressed.
const INTRO_AUDIO_DURATION_MS = 90000;
const INTRO_VOLUME = 0.38;
const INTRO_VOLUME_RAMP_MS = 10000;

const PHASE_TIMINGS = {
  // 1 line: short opening
  precision: 7000,

  // 2 lines: more time for the staged reveal
  excellence: 23000,
  standards: 39000,

  // 3 lines: the longest narrative phases
  uncompromised: 62000,

  // Final screen starts with 5 seconds left in the 90-second soundtrack
  signature: INTRO_AUDIO_DURATION_MS - 5000, // 85s
  signatureTagline: INTRO_AUDIO_DURATION_MS - 3000, // 87s
  signatureCta: INTRO_AUDIO_DURATION_MS - 1000, // 89s
};

export default function Intro() {
  const router = useRouter();
  const { t } = useLanguage();
  const [phase, setPhase] = useState("waiting");
  const [signatureStep, setSignatureStep] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const introStartRef = useRef(null);
  const volumeRampRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("intro-open");

    return () => {
      timersRef.current.forEach(clearTimeout);
      if (volumeRampRef.current) {
        cancelAnimationFrame(volumeRampRef.current);
        volumeRampRef.current = null;
      }
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

  function cancelVolumeRamp() {
    if (volumeRampRef.current) {
      cancelAnimationFrame(volumeRampRef.current);
      volumeRampRef.current = null;
    }
  }

  function rampVolumeFromIntroStart() {
    const audio = audioRef.current;
    if (!audio || introStartRef.current === null) return;

    cancelVolumeRamp();

    const updateVolume = () => {
      const currentAudio = audioRef.current;
      if (!currentAudio || currentAudio.paused || introStartRef.current === null) {
        volumeRampRef.current = null;
        return;
      }

      const elapsedMs = Math.max(0, performance.now() - introStartRef.current);
      const progress = Math.min(1, elapsedMs / INTRO_VOLUME_RAMP_MS);

      currentAudio.volume = INTRO_VOLUME * progress;

      if (progress < 1) {
        volumeRampRef.current = requestAnimationFrame(updateVolume);
      } else {
        currentAudio.volume = INTRO_VOLUME;
        volumeRampRef.current = null;
      }
    };

    updateVolume();
  }

  function startIntro(withSound) {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    introStartRef.current = performance.now();

    setHidden(false);
    setSoundOn(withSound);
    setSignatureStep(0);
    setPhase("premium");

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      if (withSound) {
        audio.volume = 0;
        audio
          .play()
          .then(() => rampVolumeFromIntroStart())
          .catch(() => setSoundOn(false));
      }
    }

    // Narrative timing is intentionally non-uniform:
    // 0-7s   Premium (1 line)
    // 7-23s  Precision (2 lines)
    // 23-39s Excellence (2 lines)
    // 39-62s Standards (3 lines)
    // 62-85s Uncompromised (3 lines)
    // 85s    GREENART
    // 87s    Art of Technological Cultivation
    // 89s    Request B2B Offer to get access
    // 90s+   Hold the final screen indefinitely until the CTA is pressed.
    queue(() => setPhase("precision"), PHASE_TIMINGS.precision);
    queue(() => setPhase("excellence"), PHASE_TIMINGS.excellence);
    queue(() => setPhase("standards"), PHASE_TIMINGS.standards);
    queue(() => setPhase("uncompromised"), PHASE_TIMINGS.uncompromised);

    queue(() => {
      setPhase("signature");
      setSignatureStep(1);
    }, PHASE_TIMINGS.signature);

    queue(() => setSignatureStep(2), PHASE_TIMINGS.signatureTagline);
    queue(() => setSignatureStep(3), PHASE_TIMINGS.signatureCta);

    // Deliberately NO automatic redirect at 90 seconds.
    // The final screen stays visible until the user presses the B2B CTA.
  }

  function stopAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    cancelVolumeRamp();
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    setSoundOn(false);
  }

  function showFinalScreen() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    introStartRef.current = null;

    stopAudio();
    setPhase("signature");
    setSignatureStep(3);
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

      const elapsedMs =
        introStartRef.current === null
          ? INTRO_VOLUME_RAMP_MS
          : Math.max(0, performance.now() - introStartRef.current);

      audio.volume =
        INTRO_VOLUME * Math.min(1, elapsedMs / INTRO_VOLUME_RAMP_MS);

      audio
        .play()
        .then(() => {
          if (elapsedMs < INTRO_VOLUME_RAMP_MS) {
            rampVolumeFromIntroStart();
          } else {
            audio.volume = INTRO_VOLUME;
          }
        })
        .catch(() => setSoundOn(false));
    } else {
      cancelVolumeRamp();
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
            [0, 6500]
          )}
        </div>

        <div className={messageClass("excellence", "intro__message--headline")}>
          {stagedCopy(
            ["intro.excellence.1", "intro.excellence.2"],
            [0, 6500]
          )}
        </div>

        <div className={messageClass("standards", "intro__message--headline")}>
          {stagedCopy(
            ["intro.standards.1", "intro.standards.2", "intro.standards.3"],
            [0, 6000, 12000]
          )}
        </div>

        <div className={messageClass("uncompromised", "intro__message--headline")}>
          {stagedCopy(
            [
              "intro.uncompromised.1",
              "intro.uncompromised.2",
              "intro.uncompromised.3",
            ],
            [0, 6000, 12000]
          )}
        </div>

        <div className={`intro__signature ${phase === "signature" ? "is-visible" : ""}`}>
          <strong className={signatureStep >= 1 ? "is-visible" : ""}>GREEN ART</strong>
          <span className={signatureStep >= 2 ? "is-visible" : ""}>
            {t("intro.tagline")}
          </span>
          <button
            className={`intro__signature-button ${signatureStep >= 3 ? "is-visible" : ""}`}
            type="button"
            onClick={goToOffer}
          >
            {t("intro.finalCta")}
          </button>
        </div>
      </div>

      {phase !== "waiting" && phase !== "signature" && (
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
        <source src="/audio/intro.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
