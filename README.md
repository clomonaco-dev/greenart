# GreenArt — Next.js one-page / 4 lingue

Versione Next.js della demo GreenArt, mantenendo lo stesso concept grafico della versione HTML/CSS/JS.

## Stack

- Next.js 16.3.3
- React 19.2
- App Router
- CSS globale
- JavaScript / React
- nessuna libreria di animazione esterna

## Avvio locale

Richiede Node.js compatibile con Next.js 16.

```bash
npm install
npm run dev
```

Poi apri:

```text
http://localhost:3000
```

Build produzione:

```bash
npm run build
npm start
```

## Struttura

```text
greenart-nextjs/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── robots.js
│   └── sitemap.js
├── components/
│   ├── About.jsx
│   ├── B2B.jsx
│   ├── Contact.jsx
│   ├── Cultivation.jsx
│   ├── Facility.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Intro.jsx
│   ├── LanguageProvider.jsx
│   ├── OfferForm.jsx
│   ├── Products.jsx
│   ├── Quality.jsx
│   ├── Reveal.jsx
│   └── Technology.jsx
├── data/
│   └── translations.js
├── public/
│   ├── audio/intro.wav
│   └── images/logo.svg
├── docs/FUTURE_CRM.md
├── .env.example
├── jsconfig.json
├── next.config.mjs
└── package.json
```

## Effetto grafico mantenuto

L'intro conserva:

1. schermata nera iniziale;
2. `ENTER GREENART`;
3. possibilità di ingresso senza audio;
4. logo che passa da piccolo a grande;
5. fade del logo;
6. descrizione GreenArt;
7. messaggio `B2B ONLY`;
8. `SOUND ON / OFF`;
9. `SKIP INTRO`;
10. pulsante `DISCOVER GREENART`.

Anche le animazioni di entrata delle sezioni durante lo scroll sono state convertite in React tramite `IntersectionObserver`.

## Lingue

Sono presenti:

- inglese;
- spagnolo;
- italiano;
- tedesco.

Le traduzioni sono centralizzate in:

```text
data/translations.js
```

La lingua selezionata viene memorizzata tramite `localStorage`.

Per la prima fase richiesta dal cliente si mantiene una sola pagina con cambio lingua immediato.

Per una SEO internazionale più avanzata si potrà successivamente trasformare la struttura in route dedicate `/en`, `/es`, `/it`, `/de`, riutilizzando gli stessi componenti.

## Audio

L'audio demo si trova in:

```text
public/audio/intro.wav
```

Può essere sostituito mantenendo lo stesso nome.

I browser moderni richiedono normalmente un'interazione dell'utente prima di riprodurre audio: per questo l'audio parte dal click su `ENTER GREENART`.

## Logo

Il file:

```text
public/images/logo.svg
```

è un placeholder grafico. Sostituiscilo con il logo ufficiale del cliente.

## Immagini future

Le aree About, Cultivation, Facility e Products usano per ora superfici astratte/placeholders.

Le fotografie reali possono essere aggiunte dentro:

```text
public/images/
```

senza modificare l'architettura dei componenti.

## Form B2B

Attualmente il form prepara una email a:

```text
info@greenart.tech
```

Non salva dati sul server.

Questo comportamento è intenzionale per la fase sito vetrina. Quando verrà creato il CRM sarà possibile sostituire il `mailto:` con una Server Action/API che registri automaticamente lead e richieste commerciali.

## Futuro CRM

Vedi:

```text
docs/FUTURE_CRM.md
```

Il progetto NON usa un export statico forzato: questa scelta permette in futuro di aggiungere login, sessioni, API, database e pagine protette senza dover ricostruire il sito pubblico.

## Dominio / sitemap

Copia `.env.example` in `.env.local` e imposta il dominio definitivo:

```text
NEXT_PUBLIC_SITE_URL=https://www.dominio-del-cliente.it
```

Questo valore viene usato per `robots.txt` e `sitemap.xml`.
