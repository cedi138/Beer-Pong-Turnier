// Nächsten offenen Zeitslot bestimmen
function findeNaechstenZeitslot() {
  // Alle Spiele ohne gültiges Ergebnis
  const offene = spiele.filter(s => !parseErgebnisString(s.ergebnis));

  if (offene.length === 0) return null;

  // Nach Zeit sortieren
  offene.sort((a, b) => a.zeit.localeCompare(b.zeit));

  // Nächste Uhrzeit
  return offene[0].zeit;
}

// Alle Spiele eines Zeitblocks zurückgeben (egal ob Ergebnis oder nicht)
function spieleFuerZeitslot(zeit) {
  return spiele
    .filter(s => s.zeit === zeit)
    .sort((a, b) => a.tisch - b.tisch);
}

// Anzeige bauen
function zeigeNaechsteSpiele() {
  const box = document.getElementById("naechstes-spiel");
  if (!box) return;

  const naechsteZeit = findeNaechstenZeitslot();
  if (!naechsteZeit) {
    box.innerHTML = "<p>Alle Spiele sind gespielt 🎉</p>";
    return;
  }

  const nextSpiele = spieleFuerZeitslot(naechsteZeit);

  let html = `
    <h3>Nächster Block: ${naechsteZeit}</h3>
    <div class="next-games-list">
  `;

  nextSpiele.forEach(spiel => {

    // Falls KO-Spiel: spiel.game, sonst Gruppe
    const info = spiel.gruppe !== ""
      ? `Gruppe ${spiel.gruppe}`
      : spiel.game;

    html += `
      <div class="next-game-item">
        <strong>Tisch ${spiel.tisch}</strong><br>
        ${spiel.teamA} vs. ${spiel.teamB}<br>
        <small>${info}</small>
      </div>
    `;
  });

  html += "</div>";

  box.innerHTML = html;
}

// initial aufrufen
document.addEventListener("DOMContentLoaded", zeigeNaechsteSpiele);
