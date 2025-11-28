// tabellen.js
// Erwartet: globale Variablen `gruppen` und `spiele` (aus ergebnisse.js)

function parseErgebnisStringToScores(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}

function berechneUndZeigeTabellen() {
  const container = document.getElementById("tabellen-container");
  if (!container) return;

  // Für jede Gruppe
  Object.keys(gruppen).forEach(gruppe => {
    // initialisiere stats für alle teams in der Gruppe
    const teams = gruppen[gruppe].slice(); // kopie
    const stats = {};
    teams.forEach(t => {
      stats[t] = { team: t, punkte: 0, torePlus: 0, toreMinus: 0, spiele: 0 };
    });

    // durchspiele alle Spiele und addiere nur gespielte Spiele der jeweiligen Gruppe
    spiele.forEach(s => {
      if (s.gruppe !== gruppe) return;
      const parsed = parseErgebnisStringToScores(s.ergebnis);
      if (!parsed) return; // noch offen → ignorieren

      const t1 = stats[s.teamA];
      const t2 = stats[s.teamB];
      if (!t1 || !t2) return; // Sicherheit: Teams nicht gefunden

      const a = parsed.a;
      const b = parsed.b;

      t1.torePlus += a;
      t1.toreMinus += b;
      t2.torePlus += b;
      t2.toreMinus += a;

      t1.spiele++;
      t2.spiele++;

      if (a > b) t1.punkte += 3;
      else if (b > a) t2.punkte += 3;
      else {
        t1.punkte += 1;
        t2.punkte += 1;
      }
    });

    // Umwandlung in Array und Sortierung:
    const tabelle = Object.values(stats).sort((x,y) => {
      if (y.punkte !== x.punkte) return y.punkte - x.punkte; // Punkte desc
      const diffX = x.torePlus - x.toreMinus;
      const diffY = y.torePlus - y.toreMinus;
      if (diffY !== diffX) return diffY - diffX; // Differenz desc
      if (y.torePlus !== x.torePlus) return y.torePlus - x.torePlus; // Tore für desc
      return x.team.localeCompare(y.team); // Name asc
    });

    // HTML-Bau
    const block = document.createElement("div");
    block.className = "gruppe-block";
    block.innerHTML = `
      <h2>Gruppe ${gruppe}</h2>
      <table>
        <thead>
          <tr>
            <th>Platz</th>
            <th>Team</th>
            <th>Spiele</th>
            <th>Becher getroffen</th>
            <th>Becher kassiert</th>
            <th>Diff</th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          ${tabelle.map((t, idx) => {
            const diff = t.torePlus - t.toreMinus;
            return `<tr>
              <td>${idx + 1}</td>
              <td>${t.team}</td>
              <td>${t.spiele}</td>
              <td>${t.torePlus}</td>
              <td>${t.toreMinus}</td>
              <td>${diff}</td>
              <td>${t.punkte}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    `;
    container.appendChild(block);
  });
}

window.addEventListener("DOMContentLoaded", berechneUndZeigeTabellen);
