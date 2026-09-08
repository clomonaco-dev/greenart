const CONSENT_VERSION = "2.0";
const MAX_BODY_BYTES = 16_384;

function cleanText(value, max = 160) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== requestUrl.origin) return new Response(null, { status: 403 });
    } catch {
      return new Response(null, { status: 403 });
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 });

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }

  // Server-side fail-closed guard: the proxy never forwards an event unless
  // the browser explicitly marks the current consent version as granted.
  if (input?.tracking_consent !== "granted" || input?.consent_version !== CONSENT_VERSION) {
    return new Response(null, { status: 403 });
  }

  // The root path is the cinematic intro and must never be tracked.
  if (input?.path === "/") {
    return new Response(null, { status: 403 });
  }

  const configuredEndpoint = Netlify.env.get("GREENART_TRACKING_ENDPOINT");
  if (!configuredEndpoint) {
    // Safe production default: if no GreenArt analytics backend is configured,
    // consent does not cause data to be sent anywhere beyond this no-op call.
    return new Response(null, { status: 204 });
  }

  const event = {
    event: cleanText(input.event, 80),
    path: cleanText(input.path, 300),
    timestamp: cleanText(input.timestamp, 40),
    language: cleanText(input.language, 8),
    referrer: cleanText(input.referrer, 300),
    viewport: cleanText(input.viewport, 32),
    consent_id: cleanText(input.consent_id, 80),
    consent_version: CONSENT_VERSION,
    properties:
      input.properties && typeof input.properties === "object" && !Array.isArray(input.properties)
        ? input.properties
        : {},
  };

  // Do not forward empty or malformed event names.
  if (!event.event) return new Response(null, { status: 400 });

  try {
    const upstream = await fetch(configuredEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(Netlify.env.get("GREENART_TRACKING_TOKEN")
          ? { Authorization: `Bearer ${Netlify.env.get("GREENART_TRACKING_TOKEN")}` }
          : {}),
      },
      body: JSON.stringify(event),
    });

    if (!upstream.ok) return new Response(null, { status: 502 });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("GreenArt tracking proxy error", error);
    return new Response(null, { status: 502 });
  }
};
