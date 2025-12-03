// Sortierung der Spiele
function sortiereSpiele(spieleArray) {
  return spieleArray.slice().sort((a, b) => {
    const t = a.zeit.localeCompare(b.zeit);
    if (t !== 0) return t;
    return a.tisch - b.tisch;
  });
}

function parseErgebnisString(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}

// Spielplan erzeugen
function erstelleSpielplan() {
  const tbody = document.getElementById("spielplan-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const sortierte = sortiereSpiele(spiele);

  sortierte.forEach(spiel => {
    const er = parseErgebnisString(spiel.ergebnis);

    // Statusklasse und Anzeige-Text bestimmen
    let statusClass, text;
    if (er) {
      statusClass = "status-gespielt";
      text = `${er.a} : ${er.b}`;
    } else {
      statusClass = "status-offen";
      text = "- : -";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${spiel.zeit}</td>
      <td>${spiel.tisch}</td>
      <td class="team" data-team="${spiel.teamA}">${spiel.teamA}</td>
      <td class="team" data-team="${spiel.teamB}">${spiel.teamB}</td>
      <td class="${statusClass}">${text}</td>
    `;

    tbody.appendChild(tr);
  });
}

erstelleSpielplan();
