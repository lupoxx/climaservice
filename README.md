# ClimaService

Sito vetrina one-page per un tecnico installatore di climatizzatori a **Brescia e provincia**.
Realizzato in **HTML/CSS/JavaScript nativo**, senza framework né dipendenze — ideale per GitHub Pages.

> ⚠️ Tutti i contenuti attuali (nome, recapiti, P.IVA, recensioni, foto) sono **segnaposto inventati**, da sostituire con quelli reali.

## Struttura

```
index.html   Markup: hero, servizi, perché noi, zona, lavori, recensioni, contatti, footer
style.css    Stili (mobile-first, palette blu/azzurro)
script.js    Menu mobile + form contatti che apre WhatsApp precompilato
```

## Sezioni

- **Hero** con pulsanti Chiama / WhatsApp
- **Servizi** (installazione, pompe di calore, manutenzione, riparazione, ricarica gas, preventivo)
- **Perché noi** (esperienza, F-GAS, DM 37/08, assicurazione, bonus fiscali) + marchi
- **Zona servita** (comuni della provincia di Brescia)
- **Lavori** (gallery segnaposto)
- **Recensioni**
- **Contatti + social** con form che genera un messaggio WhatsApp
- **Barra fissa mobile** Chiama / WhatsApp

## Da personalizzare

- Recapiti in `index.html` (`tel:`, link `wa.me`, email) e il numero in `script.js` (`WHATSAPP_NUMBER`)
- Link social (attualmente `#`)
- Foto reali al posto dei segnaposto nella gallery
- Nome, P.IVA e dati nel footer

## Avvio locale

Apri `index.html`, oppure servi la cartella:

```bash
python -m http.server
```
