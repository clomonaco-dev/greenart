const FORM_NAME = "greenart-b2b-request";
const PRIVACY_VERSION = "3.0";
const PRIVACY_CHOICE_VERSION = "2.0";
const ALLOWED_LANGUAGES = new Set(["en", "it", "es", "de"]);
const ALLOWED_FORM_CHOICES = new Set(["all", "essential"]);

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      { ok: false, error: "Method not allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  const requestUrl = new URL(request.url);
  const originHeader = request.headers.get("origin");

  // Browser submissions must originate from the same deployed GreenArt site.
  if (originHeader) {
    try {
      if (new URL(originHeader).origin !== requestUrl.origin) {
        return Response.json({ ok: false, error: "Invalid origin" }, { status: 403 });
      }
    } catch {
      return Response.json({ ok: false, error: "Invalid origin" }, { status: 403 });
    }
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/x-www-form-urlencoded")) {
    return Response.json(
      { ok: false, error: "Unsupported content type" },
      { status: 415 }
    );
  }

  const params = new URLSearchParams(await request.text());

  // A filled honeypot is treated as a bot submission and is not forwarded.
  if ((params.get("bot-field") || "").trim()) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const acknowledged = params.get("privacy_acknowledged") === "true";
  const privacyVersion = params.get("privacy_version");
  const privacyChoice = params.get("privacy_choice");
  const privacyChoiceVersion = params.get("privacy_choice_version");
  const privacyLanguage = params.get("privacy_language");
  const acknowledgedAt = params.get("privacy_acknowledged_at");
  const acknowledgedTime = Date.parse(acknowledgedAt || "");
  const now = Date.now();

  // Fail closed: a B2B submission is allowed only after either ALL or
  // ESSENTIAL. REJECTED/unknown choices are refused server-side too.
  const privacyMetadataValid =
    acknowledged &&
    privacyVersion === PRIVACY_VERSION &&
    privacyChoiceVersion === PRIVACY_CHOICE_VERSION &&
    ALLOWED_FORM_CHOICES.has(privacyChoice || "") &&
    ALLOWED_LANGUAGES.has(privacyLanguage || "") &&
    Number.isFinite(acknowledgedTime) &&
    acknowledgedTime <= now + 5 * 60 * 1000;

  if (!privacyMetadataValid) {
    return Response.json(
      { ok: false, error: "Valid privacy choice required" },
      { status: 400 }
    );
  }

  const requiredFields = ["company", "name", "email", "country"];
  const missingField = requiredFields.find(
    (field) => !(params.get(field) || "").trim()
  );

  if (missingField) {
    return Response.json(
      { ok: false, error: `Missing required field: ${missingField}` },
      { status: 400 }
    );
  }

  // Force the canonical form name before forwarding to Netlify Forms.
  params.set("form-name", FORM_NAME);

  try {
    const response = await fetch(`${requestUrl.origin}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, error: "Unable to store form submission" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("B2B form forwarding error", error);
    return Response.json(
      { ok: false, error: "Unable to store form submission" },
      { status: 502 }
    );
  }
};
