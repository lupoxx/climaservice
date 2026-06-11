// ClimaService — demo statica con dati simulati (nessuna API esterna).
// JavaScript nativo: niente framework, niente dipendenze.

const CONDIZIONI = [
  { desc: "soleggiato", icona: "☀️" },
  { desc: "parzialmente nuvoloso", icona: "⛅" },
  { desc: "nuvoloso", icona: "☁️" },
  { desc: "pioggia leggera", icona: "🌦️" },
  { desc: "temporale", icona: "⛈️" },
];

const form = document.getElementById("search-form");
const input = document.getElementById("city");
const result = document.getElementById("result");
const resultCity = document.getElementById("result-city");
const resultTemp = document.getElementById("result-temp");
const resultDesc = document.getElementById("result-desc");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const citta = input.value.trim();
  if (!citta) return;

  const meteo = generaMeteo();

  resultCity.textContent = citta;
  resultTemp.textContent = `${meteo.temp}°C`;
  resultDesc.textContent = `${meteo.icona} ${meteo.desc}`;
  result.hidden = false;
});

// Genera dati meteo casuali a scopo dimostrativo.
function generaMeteo() {
  const temp = Math.floor(Math.random() * 31) - 2; // da -2 a 28 °C
  const condizione = CONDIZIONI[Math.floor(Math.random() * CONDIZIONI.length)];
  return { temp, ...condizione };
}
