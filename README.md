# ClimaService

Sito vetrina one-page per un tecnico installatore di climatizzatori a **Brescia e provincia**.
Realizzato in **HTML/CSS/JavaScript nativo**, senza framework né dipendenze — ideale per GitHub Pages.

> ⚠️ Tutti i contenuti attuali (nome, recapiti, P.IVA, recensioni, foto) sono **segnaposto inventati**, da sostituire con quelli reali.

## Struttura

```
docs/            cartella servita da GitHub Pages
  index.html     Struttura (contenitori vuoti) — non contiene i testi
  style.css      Stili (mobile-first, palette blu/azzurro)
  script.js      Carica content.json e popola la pagina; form -> WhatsApp
  content.json   ← TUTTI i contenuti del sito (il "database" da editare)
```

## Modificare i contenuti

Edita **solo `docs/content.json`**: nome, recapiti, social, servizi, recensioni,
zona, lavori, ecc. Non serve toccare HTML o JS. Per le foto reali, metti le
immagini in `docs/img/` e indica il percorso in `content.json`
(`lavori.elenco[].immagine`).

Su GitHub Pages: *Settings → Pages → branch `release`, cartella `/docs`*.
Vedi `CLAUDE.md` per i dettagli completi del progetto.

## Sezioni

- **Hero** con pulsanti Chiama / WhatsApp
- **Servizi** (installazione, pompe di calore, manutenzione, riparazione, ricarica gas, preventivo)
- **Perché noi** (esperienza, F-GAS, DM 37/08, assicurazione, bonus fiscali) + marchi
- **Zona servita** (comuni della provincia di Brescia)
- **Lavori** (gallery segnaposto)
- **Recensioni**
- **Contatti + social** con form che genera un messaggio WhatsApp
- **Barra fissa mobile** Chiama / WhatsApp

## Da personalizzare (tutto in `docs/content.json`)

- Recapiti: `contatti` (telefono, WhatsApp, email, orari)
- Link social: `social[]` (attualmente `#`)
- Foto reali: `lavori.elenco[].immagine`
- Nome, P.IVA e dati: `azienda`

## Avvio locale

⚠️ Non aprire `index.html` con doppio clic: `content.json` viene caricato via
`fetch()`, che non funziona col protocollo `file://`. Serve un server locale:

```bash
python -m http.server --directory docs
# poi apri http://localhost:8000
```
