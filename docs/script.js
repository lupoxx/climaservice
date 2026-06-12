// ClimaService — JavaScript nativo, nessuna dipendenza.
// I contenuti vengono letti da content.json e inseriti nella pagina.
// Per modificare testi/recapiti/servizi basta editare content.json.

// ---- Helper di utilità ----
const $ = (id) => document.getElementById(id);

// Imposta il testo di un elemento (se esiste).
function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

// Crea un elemento con classe e testo opzionali.
function make(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

// ---- Avvio: carica i dati e costruisci la pagina ----
fetch("content.json")
  .then((r) => {
    if (!r.ok) throw new Error("content.json non trovato (HTTP " + r.status + ")");
    return r.json();
  })
  .then(render)
  .catch((err) => {
    console.error("Errore nel caricamento dei contenuti:", err);
  });

function render(data) {
  const tel = data.contatti.telefonoLink;
  const wa = data.contatti.whatsappNumero;
  const waLink = "https://wa.me/" + wa;

  // ===== Header / logo =====
  setText("logo", "❄ " + data.azienda.nome);

  // ===== Hero =====
  setText("hero-eyebrow", data.hero.eyebrow);
  setText("hero-title", data.hero.titolo);
  setText("hero-lead", data.hero.testo);
  $("hero-call").href = "tel:" + tel;
  $("hero-wa").href = waLink;

  const heroBadges = $("hero-badges");
  data.hero.badges.forEach((b) => heroBadges.appendChild(make("li", null, "✔ " + b)));

  // ===== Servizi =====
  setText("servizi-title", data.servizi.titolo);
  setText("servizi-sub", data.servizi.sottotitolo);
  const servGrid = $("servizi-grid");
  data.servizi.elenco.forEach((s) => {
    const card = make("article", "card service");
    card.appendChild(make("div", "service-icon", s.icona));
    card.appendChild(make("h3", null, s.titolo));
    card.appendChild(make("p", null, s.testo));
    servGrid.appendChild(card);
  });

  // ===== Perché noi =====
  setText("perche-title", data.perche.titolo);
  setText("perche-sub", data.perche.sottotitolo);
  const perGrid = $("perche-grid");
  data.perche.elenco.forEach((f) => {
    const item = make("div", "feature");
    if (f.numero) item.appendChild(make("span", "feature-num", f.numero));
    else item.appendChild(make("span", "feature-ico", f.icona));
    item.appendChild(make("p", null, f.testo));
    perGrid.appendChild(item);
  });

  // ===== Marchi =====
  setText("brands-title", data.perche.marchiTitolo);
  const brands = $("brands");
  data.perche.marchi.forEach((m) => brands.appendChild(make("li", null, m)));

  // ===== Zona servita =====
  setText("zona-title", data.zona.titolo);
  setText("zona-sub", data.zona.sottotitolo);
  const zoneList = $("zona-list");
  data.zona.comuni.forEach((c) => zoneList.appendChild(make("li", null, c)));
  setText("zona-nota", data.zona.nota);

  // ===== Lavori / Gallery =====
  setText("lavori-title", data.lavori.titolo);
  setText("lavori-sub", data.lavori.sottotitolo);
  setText("lavori-nota", data.lavori.nota);
  const gallery = $("gallery");
  data.lavori.elenco.forEach((lavoro, i) => {
    // Cicla le 6 classi gradiente per lo sfondo segnaposto.
    const fig = make("figure", "shot shot-" + ((i % 6) + 1));
    // Se è indicata un'immagine reale, usala come sfondo.
    if (lavoro.immagine) {
      fig.style.backgroundImage = "url('" + lavoro.immagine + "')";
      fig.style.backgroundSize = "cover";
      fig.style.backgroundPosition = "center";
    }
    fig.appendChild(make("figcaption", null, lavoro.titolo));
    gallery.appendChild(fig);
  });

  // ===== Recensioni =====
  setText("recensioni-title", data.recensioni.titolo);
  const revGrid = $("recensioni-grid");
  data.recensioni.elenco.forEach((rec) => {
    const bq = make("blockquote", "card review");
    bq.appendChild(make("p", null, '"' + rec.testo + '"'));
    const stelle = "★".repeat(rec.stelle || 5);
    bq.appendChild(make("footer", null, stelle + " — " + rec.autore));
    revGrid.appendChild(bq);
  });

  // ===== Contatti =====
  setText("contatti-title", data.contattiSezione.titolo);
  setText("contatti-sub", data.contattiSezione.sottotitolo);
  setText("form-titolo", data.contattiSezione.formTitolo);

  const contactList = $("contact-list");
  const righe = [
    { ico: "📞", testo: data.contatti.telefono, href: "tel:" + tel },
    { ico: "💬", testo: "WhatsApp " + data.contatti.whatsapp, href: waLink },
    { ico: "✉️", testo: data.contatti.email, href: "mailto:" + data.contatti.email },
    { ico: "📍", testo: data.azienda.zona },
    { ico: "🕒", testo: data.contatti.orari },
  ];
  righe.forEach((r) => {
    const li = make("li");
    li.append(r.ico + " ");
    if (r.href) {
      const a = make("a", null, r.testo);
      a.href = r.href;
      li.appendChild(a);
    } else {
      li.append(r.testo);
    }
    contactList.appendChild(li);
  });

  // ===== Social =====
  const socials = $("socials");
  data.social.forEach((s) => {
    const a = make("a", "social", s.nome);
    a.href = s.url;
    a.setAttribute("aria-label", s.nome);
    socials.appendChild(a);
  });

  // ===== Footer =====
  setText("footer-azienda", data.azienda.nome + " di " + data.azienda.titolare +
    " — Climatizzazione a " + data.azienda.zona);
  setText("footer-piva", "P.IVA " + data.azienda.piva + " · " + data.azienda.certificazioni);
  setText("footer-copy", data.azienda.copyright);

  // ===== Barra mobile =====
  $("bar-call").href = "tel:" + tel;
  $("bar-wa").href = waLink;

  // ===== Form contatti -> WhatsApp =====
  // Su un sito statico non c'è un backend: compiliamo un messaggio WhatsApp
  // pre-formattato e lo apriamo.
  $("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("f-nome").value.trim();
    const telInput = $("f-tel").value.trim();
    const comune = $("f-comune").value.trim();
    const msg = $("f-msg").value.trim();

    const testo =
      `Ciao, sono ${nome}.\n` +
      `Telefono: ${telInput}\n` +
      (comune ? `Comune: ${comune}\n` : "") +
      (msg ? `Richiesta: ${msg}` : "Vorrei un preventivo.");

    window.open(waLink + "?text=" + encodeURIComponent(testo), "_blank");
  });
}

// ===== Menu mobile (indipendente dai dati) =====
const navToggle = $("nav-toggle");
const nav = $("nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
