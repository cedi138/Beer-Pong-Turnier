// spielplan.js
// Erwartet: globale Variable `spiele` (aus ergebnisse.js)

function parseErgebnisString(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}

function sortiereSpieleNachZeitUndTisch(spieleArray) {
  // Uhrzeit-Strings im Format "HH:MM" → lexi-kompatibel
  return spieleArray.slice().sort((x,y) => {
    const timeCmp = x.zeit.localeCompare(y.zeit);
    if (timeCmp !== 0) return timeCmp;
    return (x.tisch || 0) - (y.tisch || 0);
  });
}

function erstelleSpielplanTabelle() {
  const tbody = document.getElementById("spielplan-body");
  if (!tbody) return;

  // sortieren
  const sortierte = sortiereSpieleNachZeitUndTisch(spiele);

  sortierte.forEach(spiel => {
    const tr = document.createElement("tr");

    const ergebnisParsed = parseErgebnisString(spiel.ergebnis);
    const gespielt = ergebnisParsed !== null;

    const resultText = gespielt ? `${ergebnisParsed.a} : ${ergebnisParsed.b}` : "-";
    const statusText = gespielt ? "Gespielt" : "Offen";
    const klasse = gespielt ? "gespielt" : "offen";

    tr.innerHTML = `
      <td>${spiel.zeit}</td>
      <td>${spiel.gruppe}</td>
      <td>${spiel.tisch}</td>
      <td>${spiel.teamA}</td>
      <td>${spiel.teamB}</td>
      <td class="${klasse}">${resultText}</td>
      <td class="${klasse}">${statusText}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.addEventListener("DOMContentLoaded", erstelleSpielplanTabelle);
