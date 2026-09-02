# Evoluzione futura: Login, Area Partner e CRM

La homepage pubblica è stata separata in componenti React e non deve essere rifatta quando verrà aggiunto il CRM.

Una possibile evoluzione dell'App Router è:

```text
app/
├── page.js                    # sito corporate pubblico
├── login/
│   └── page.js
├── partner/
│   ├── page.js                # dashboard partner
│   ├── products/
│   ├── price-lists/
│   ├── documents/
│   ├── offers/
│   └── orders/
├── admin/
│   ├── page.js
│   ├── customers/
│   ├── companies/
│   ├── leads/
│   ├── offers/
│   └── users/
└── api/
    ├── contact/
    └── b2b/
```

## Stack possibile per la fase CRM

- Next.js
- PostgreSQL
- ORM (ad esempio Prisma, Drizzle o equivalente)
- autenticazione/sessioni
- ruoli applicativi
- storage documenti
- email transazionali

## Ruoli suggeriti

- `ADMIN`
- `SALES`
- `PARTNER`

## Possibili entità

- User
- Company
- Contact
- Lead
- Offer
- Product
- PriceList
- Document
- Order

Il form `Request B2B Offer` oggi genera una email. In futuro il componente può inviare gli stessi dati a una Server Action o a una Route Handler e salvarli direttamente nel CRM.
