export const PRIVACY_CHOICE_STORAGE_KEY = "greenart-privacy-choice-v2";
export const PRIVACY_CHOICE_VERSION = "2.0";
export const PRIVACY_CHOICE_EVENT = "greenart:privacy-choice";
export const OPEN_PRIVACY_CHOICES_EVENT = "greenart:open-privacy-choices";

export const PRIVACY_CHOICES = {
  ALL: "all",
  ESSENTIAL: "essential",
  REJECTED: "rejected",
};

export function readPrivacyChoice() {
  if (typeof window === "undefined") return null;

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(PRIVACY_CHOICE_STORAGE_KEY) || "null"
    );

    if (!parsed || parsed.version !== PRIVACY_CHOICE_VERSION) return null;
    if (!Object.values(PRIVACY_CHOICES).includes(parsed.status)) return null;
    if (!parsed.timestamp || !Number.isFinite(Date.parse(parsed.timestamp))) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function canUseB2BForm(choice) {
  return [PRIVACY_CHOICES.ALL, PRIVACY_CHOICES.ESSENTIAL].includes(
    choice?.status
  );
}

export function canTrack(choice) {
  return choice?.status === PRIVACY_CHOICES.ALL;
}
