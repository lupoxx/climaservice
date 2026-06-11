// ClimaService — JavaScript nativo, nessuna dipendenza.

// Numero WhatsApp in formato internazionale, senza "+" né spazi.
const WHATSAPP_NUMBER = "393331234567";

// ===== Menu mobile =====
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// Chiudi il menu dopo aver cliccato una voce.
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Form contatti -> WhatsApp =====
// Su un sito statico non c'è un backend: compiliamo un messaggio WhatsApp
// pre-formattato e lo apriamo. Pratico e immediato per il professionista.
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("f-nome").value.trim();
  const tel = document.getElementById("f-tel").value.trim();
  const comune = document.getElementById("f-comune").value.trim();
  const msg = document.getElementById("f-msg").value.trim();

  const testo =
    `Ciao, sono ${nome}.\n` +
    `Telefono: ${tel}\n` +
    (comune ? `Comune: ${comune}\n` : "") +
    (msg ? `Richiesta: ${msg}` : "Vorrei un preventivo.");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(testo)}`;
  window.open(url, "_blank");
});
