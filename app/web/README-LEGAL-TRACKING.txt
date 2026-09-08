GREENART — LEGAL / PRIVACY / TRACKING PACKAGE
Updated: 8 September 2026

INCLUDED
- /privacy-policy — general GDPR-oriented privacy notice in EN/IT/ES/DE.
- /cookie-policy — cookie/local-storage/tracking policy in EN/IT/ES/DE.
- /terms-and-conditions — website Terms of Use in EN/IT/ES/DE.
- Global opt-in tracking consent manager.
- Reject keeps optional tracking off and does not block website/B2B form.
- Privacy Choices button lets the visitor change/withdraw the tracking choice later.
- B2B privacy acknowledgement remains separate and mandatory for B2B submission.
- Netlify Forms blueprint for B2B submissions and a minimal tracking-consent receipt.
- /.netlify/functions/track — fail-closed proxy for GreenArt's own analytics backend.

TRACKING INTEGRATION
The browser NEVER sends analytics events while tracking consent is unknown or denied.
After consent, page_view events are sent to /.netlify/functions/track.
The function forwards them only if GREENART_TRACKING_ENDPOINT is configured in Netlify.
Optional bearer token: GREENART_TRACKING_TOKEN.

Custom site code can record an event with:
  window.greenArtTrack?.("event_name", { key: "value" });
The helper checks the current consent again before sending.

IMPORTANT PRODUCTION CHECKS
1. Replace VAT no. X with the real VAT number before publication.
2. Add the real registered/business address and any company/REA/share-capital data required
   for GreenArt's actual legal form. Those details were not provided and were not invented.
3. Review the real GREENART_TRACKING_ENDPOINT implementation before enabling it. If it sends
   additional identifiers, cookies, fingerprinting data, advertising data or third-party data,
   update Privacy/Cookie policies and increment the consent version BEFORE deployment.
4. Keep tracking data retention aligned with the published policy (intended default <= 13 months
   for identifiable/pseudonymous event-level analytics).
5. Keep B2B retention aligned with the published policy (normally <= 12 months after last
   meaningful contact when no commercial relationship follows).
6. Complete/accept Netlify's applicable Data Processing Agreement for the production account.
7. Legal texts are implementation-oriented compliance drafts and should be reviewed by a qualified
   privacy/legal professional against GreenArt's actual legal form, licences and real data flows.

NETLIFY FORMS
Enable Netlify Form Detection and redeploy after publishing this package.
Expected forms:
- greenart-b2b-request
- greenart-tracking-consent
