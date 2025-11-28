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

  // Vorherige Einträge löschen
  tbody.innerHTML = "";

  // Spiele sortieren
  const sortierte = sortiereSpieleNachZeitUndTisch(spiele);

  sortierte.forEach(spiel => {
    const tr = document.createElement("tr");

    // Ergebnis parsen
    const ergebnisParsed = parseErgebnisString(spiel.ergebnis);

    // Wenn gespielt → zeige Ergebnis, sonst "- : -"
    const ergebnisText = ergebnisParsed
      ? `${ergebnisParsed.a} : ${ergebnisParsed.b}`
      : "- : -";

    tr.innerHTML = `
      <td>${spiel.zeit}</td>
      <td>${spiel.tisch}</td>
      <td>${spiel.teamA}</td>
      <td>${spiel.teamB}</td>
      <td>${ergebnisText}</td>
    `;

    tbody.appendChild(tr);
  });
}

window.addEventListener("DOMContentLoaded", erstelleSpielplanTabelle);
