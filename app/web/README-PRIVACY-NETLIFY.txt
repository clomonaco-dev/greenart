GREENART — PRIVACY + NETLIFY FORMS

Contenuto dello ZIP:
- src/ : sorgente Next.js aggiornato
- public/netlify-forms.html : blueprint statico necessario a Netlify Forms / Next.js
- netlify/functions/submit-b2b.mjs : validazione server-side della presa visione privacy e inoltro a Netlify Forms

Dati privacy configurati:
- Ragione sociale: GreenArt
- Titolare: Franco Valli
- P. IVA: X
- Email privacy: info@greenart.tech
- Privacy version: 1.0
- Lingue: EN / IT / ES / DE

URL pubblica informativa:
/privacy-policy

Flusso B2B:
1. Entrando in /request-b2b-offer compare la modale privacy.
2. CONTINUA resta disabilitato finché la checkbox non viene selezionata.
3. Il form non può essere inviato finché la presa visione non è stata registrata nel client.
4. Al submit vengono inviati anche privacy_acknowledged, privacy_version, privacy_acknowledged_at e privacy_language.
5. La Netlify Function rifiuta richieste senza metadati privacy validi e inoltra quelle valide a Netlify Forms.

Netlify:
- Assicurarsi che Form detection sia attiva.
- Fare un nuovo deploy dopo aver copiato anche public/ e netlify/ nella root del progetto Next.js.
- Il form viene rilevato come: greenart-b2b-request

Nota:
Sostituire P. IVA "X" con il valore definitivo prima della pubblicazione finale.
