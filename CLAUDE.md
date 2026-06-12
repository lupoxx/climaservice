# CLAUDE.md — ClimaService

Guida per Claude Code (e per chiunque lavori al repo) su cosa è questo progetto,
come è fatto e come modificarlo.

## Cos'è

Sito **vetrina one-page** per un tecnico installatore di climatizzatori che opera a
**Brescia e provincia**. Obiettivo: dare visibilità a un professionista qualificato
che ha appena avviato l'attività e **generare contatti** (chiamate, WhatsApp, preventivi).

Tutto è misurato sulla conversione: l'utente (quasi sempre da mobile) deve poter
**chiamare / scrivere su WhatsApp / compilare il form** in pochi tap.

## Stato dei contenuti

⚠️ **Tutti i contenuti sono segnaposto inventati**, da sostituire con quelli reali:

| Dato | Valore segnaposto attuale |
|------|---------------------------|
| Nome / attività | ClimaService — Marco Belotti |
| Payoff | "Clima perfetto, tutto l'anno" |
| Zona | Brescia e provincia |
| Telefono | 030 123 4567 |
| WhatsApp / Cell | 333 123 4567 (`393331234567` internazionale) |
| Email | info@climaservice.it |
| P.IVA | 04567890987 |
| Esperienza | 12+ anni |
| Certificazioni | Patentino F-GAS, abilitazione DM 37/08, assicurazione RC |
| Marchi | Daikin, Mitsubishi Electric, Samsung, LG, Haier, Hisense |
| Social | Facebook, Instagram, WhatsApp (link `#`, da impostare) |
| Recensioni | 3 testimonianze inventate |
| Foto lavori | 6 segnaposto grafici (gradiente + didascalia) |

## Stack e scelte tecniche

- **HTML + CSS + JavaScript nativo**, zero dipendenze, zero build. Leggero e veloce.
- **One-page** con navigazione ad ancore (`#servizi`, `#perche`, `#zona`, `#lavori`, `#contatti`).
- **Mobile-first**: barra fissa in basso (Chiama / WhatsApp) e menu hamburger sotto i 820px.
- **Form contatti senza backend**: alla submit, `script.js` compone un messaggio e apre
  WhatsApp precompilato (`wa.me`). Scelta voluta perché il sito è statico.

## Struttura dei file

```
climaservice/
├── CLAUDE.md          questo file
├── README.md          descrizione e istruzioni
└── docs/              <-- cartella servita da GitHub Pages
    ├── index.html     SOLO struttura: contenitori vuoti con id, nessun contenuto
    ├── style.css      stili (palette blu/azzurro, responsive)
    ├── script.js      legge content.json e popola la pagina + form -> WhatsApp
    └── content.json   <-- TUTTI i contenuti (il "database" del sito)
```

## ⭐ Contenuti separati: `content.json`

I testi NON stanno più nell'HTML. Tutto il contenuto (nome, recapiti, social,
hero, servizi, "perché noi", marchi, zona, lavori, recensioni) vive in
**`docs/content.json`**. `script.js` lo carica con `fetch()` e costruisce il DOM.

**Per modificare il sito si edita solo `content.json`** — non serve toccare HTML o JS.

Schema (chiavi principali): `azienda`, `contatti`, `social[]`, `hero`,
`servizi{titolo,sottotitolo,elenco[]}`, `perche{...,marchi[]}`, `zona{comuni[]}`,
`lavori{elenco[]}`, `recensioni{elenco[]}`, `contattiSezione`.

- Per le **foto reali**: in `lavori.elenco[].immagine` metti il percorso
  dell'immagine (es. `"img/lavoro1.jpg"`, file dentro `docs/`). Se vuoto, resta
  il segnaposto grafico a gradiente.
- Le voci `feature` in `perche.elenco` accettano `numero` **oppure** `icona`.

> ⚠️ `fetch()` non funziona aprendo `index.html` con doppio clic (protocollo
> `file://`). Serve un server locale o GitHub Pages (vedi sotto).

### Sezioni di `index.html`
Header → Hero → Servizi (6) → Perché noi + Marchi → Zona servita → Lavori (gallery)
→ Recensioni → Contatti + Social (form) → Footer → Barra mobile.

## Deploy — GitHub Pages

- **Branch unico: `release`** (non esiste `main`). Tutto il lavoro vive qui.
- I file del sito stanno in **`docs/`**.
- Su GitHub: *Settings → Pages → Build and deployment*
  - **Source:** Deploy from a branch
  - **Branch:** `release` · **Cartella:** `/docs`
- URL pubblico: **https://lupoxx.github.io/climaservice/**
- Dopo un push, l'aggiornamento richiede ~1-2 minuti.

> Nota: Pages "da branch" serve solo dalla root o da `/docs`. Per questo i file
> stanno in `docs/` e non in `www/`. Se in futuro servisse una cartella diversa,
> occorre passare al deploy via GitHub Actions.

## Sviluppo locale

```bash
# dalla cartella del repo
python -m http.server --directory docs
# poi apri http://localhost:8000
```

Oppure apri direttamente `docs/index.html` nel browser.

## Come modificare le cose comuni

- **Recapiti, testi, servizi, recensioni, social, marchi, zona:** tutto in
  `docs/content.json`. È l'unico file da toccare per i contenuti.
- **Foto reali:** metti le immagini in `docs/img/` e indica il percorso in
  `content.json` → `lavori.elenco[].immagine`.
- **Colori:** variabili CSS in cima a `docs/style.css` (`:root`).
- **Struttura/sezioni:** `docs/index.html` (raramente).

## TODO / prossimi passi

- [ ] Inserire dati reali (nome, telefono, email, P.IVA)
- [ ] Link social veri
- [ ] Foto reali degli impianti
- [ ] SEO locale: Open Graph, favicon, dati strutturati `LocalBusiness` (JSON-LD)
- [ ] Eventuale dominio personalizzato (file `CNAME` in `docs/`)

## Cronologia lavoro

1. Clonato repo vuoto; rinominato il branch di default in **`release`**.
2. Primo scaffold statico minimal (demo meteo) — poi sostituito.
3. Definito insieme all'utente l'obiettivo: vetrina per installatore climatizzatori a Brescia.
4. Costruita la one-page completa con contenuti segnaposto inventati.
5. Spostati i file del sito sotto **`docs/`** per il deploy GitHub Pages.
