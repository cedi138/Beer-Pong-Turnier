// Gibt die nächste Zeitslot zurück, bei dem ein Spiel noch kein Ergebnis hat
function findeNaechstenZeitslot() {
  const offene = spiele.filter(s => !parseErgebnisString(s.ergebnis));
  if (offene.length === 0) return null;
  offene.sort((a, b) => a.zeit.localeCompare(b.zeit));
  return offene[0].zeit;
}

// Gibt alle Spiele eines bestimmten Zeitblocks zurück
function spieleFuerZeitslot(zeit) {
  return spiele.filter(s => s.zeit === zeit).sort((a, b) => a.tisch - b.tisch);
}

// ---------------------------
// GRID-ANZEIGE: NÄCHSTES SPIEL
// ---------------------------

function zeigeNaechsteSpiele() {
  const grid = document.querySelector("#naechstes-spiel .next-games-grid");
  if (!grid) return;

  // alte Spiel-Items entfernen
  grid.querySelectorAll(".next-game-item").forEach(el => el.remove());

  const naechsteZeit = findeNaechstenZeitslot();
  if (!naechsteZeit) {
    const item = document.createElement("div");
    item.className = "next-game-item";
    item.style.gridColumn = "span 4";
    item.textContent = "Alle Spiele sind gespielt 🎉";
    grid.appendChild(item);
    return;
  }

  const nextSpiele = spieleFuerZeitslot(naechsteZeit);

  // Jede Zeile: Uhrzeit + drei Tische
  const uhrzeitCell = document.createElement("div");
  uhrzeitCell.className = "next-game-item";
  uhrzeitCell.innerHTML = `<strong>${naechsteZeit}</strong>`;
  grid.appendChild(uhrzeitCell);

  for (let i = 0; i < 3; i++) {
    const tischCell = document.createElement("div");
    tischCell.className = "next-game-item";
    if (nextSpiele[i]) {
      tischCell.innerHTML = `<strong>Tisch ${nextSpiele[i].tisch}</strong><br>${nextSpiele[i].teamA} vs ${nextSpiele[i].teamB}`;
    } else {
      tischCell.textContent = "-";
    }
    grid.appendChild(tischCell);
  }
}

// ---------------------------
// INITIALISIERUNG
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  zeigeNaechsteSpiele();
});
