# ClimaService

Sito statico di prova, minimal, in **JavaScript nativo** (nessun framework, nessuna dipendenza).

Mostra un meteo simulato per la città inserita — pensato come demo/scaffold di partenza.

## Struttura

```
index.html   Markup della pagina
style.css    Stili
script.js    Logica (dati meteo simulati)
```

## Avvio

Apri `index.html` nel browser, oppure servi la cartella con un server statico:

```bash
npx serve .
# oppure
python -m http.server
```

> I dati meteo sono generati casualmente a scopo dimostrativo: non viene chiamata alcuna API esterna.
