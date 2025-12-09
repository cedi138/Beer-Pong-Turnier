function zeigeNaechsteSpiele() {
  const grid = document.querySelector("#naechstes-spiel .next-games-grid");
  if (!grid) return;

  // alte Spiel-Items entfernen
  grid.querySelectorAll(".next-game-item").forEach(el => el.remove());

  const naechsteZeit = findeNaechstenZeitslot();
  if (!naechsteZeit) {
    const item = document.createElement("div");
    item.className = "next-game-item";
    item.textContent = "Alle Spiele sind gespielt 🎉";
    grid.appendChild(item);
    return;
  }

  const nextSpiele = spieleFuerZeitslot(naechsteZeit);

  // Spalten-Inhalte vorbereiten
  const uhrzeiten = document.createElement("div");
  const tisch1 = document.createElement("div");
  const tisch2 = document.createElement("div");
  const tisch3 = document.createElement("div");

  uhrzeiten.className = tisch1.className = tisch2.className = tisch3.className = "next-game-item";

  uhrzeiten.innerHTML = `<strong>${naechsteZeit}</strong>`;
  tisch1.innerHTML = nextSpiele[0] ? `${nextSpiele[0].teamA} vs ${nextSpiele[0].teamB}` : "-";
  tisch2.innerHTML = nextSpiele[1] ? `${nextSpiele[1].teamA} vs ${nextSpiele[1].teamB}` : "-";
  tisch3.innerHTML = nextSpiele[2] ? `${nextSpiele[2].teamA} vs ${nextSpiele[2].teamB}` : "-";

  // zum Grid hinzufügen
  grid.appendChild(uhrzeiten);
  grid.appendChild(tisch1);
  grid.appendChild(tisch2);
  grid.appendChild(tisch3);
}
