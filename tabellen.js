// ---------------------------
// Teams kommen aus ergebnisse.js
// Spiele + Ergebnisse auch
// ---------------------------

// Ergebnis-Parser (schon vorhanden im System)
function parseErgebnisString(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}


// ---------------------------
// Grund-Struktur erstellen
// ---------------------------
function erstelleLeereTabelleFürGruppe(gruppe) {
  const tab = {};

  teams[gruppe].forEach(team => {
    tab[team.name] = {
      team: team.name,
      spiele: 0,
      punkte: 0,
      tore_plus: 0,
      tore_minus: 0
    };
  });

  return tab;
}


// ---------------------------
// Ergebnisse einrechnen
// ---------------------------
function verarbeiteErgebnisse(tabelle, gruppe) {
  spiele.forEach(spiel => {

    // nur diese Gruppe berücksichtigen
    if (spiel.gruppe !== gruppe) return;

    const result = parseErgebnisString(spiel.ergebnis);
    if (!result) return; // keine Wertung ohne Ergebnis

    const A = tabelle[spiel.teamA];
    const B = tabelle[spiel.teamB];

    if (!A || !B) return;

    A.spiele++;
    B.spiele++;

    A.tore_plus += result.a;
    A.tore_minus += result.b;

    B.tore_plus += result.b;
    B.tore_minus += result.a;

    if (result.a > result.b) {
      // A gewinnt
      A.punkte += 3;
    } else if (result.b > result.a) {
      // B gewinnt
      B.punkte += 3;
    } else {
      // Remis
      A.punkte += 1;
      B.punkte += 1;
    }
  });
}


// ---------------------------
// Sortierung der Tabelle
// ---------------------------
function sortierteTeamListe(tabelle) {
  return Object.values(tabelle).sort((a, b) => {

    // 1. Punkte
    if (b.punkte !== a.punkte) return b.punkte - a.punkte;

    // 2. Tordifferenz
    const diffA = a.tore_plus - a.tore_minus;
    const diffB = b.tore_plus - b.tore_minus;
    if (diffB !== diffA) return diffB - diffA;

    // 3. Tore plus
    if (b.tore_plus !== a.tore_plus) return b.tore_plus - a.tore_plus;

    // 4. Alphabetisch
    return a.team.localeCompare(b.team);
  });
}


// ---------------------------
// HTML-Tabelle erzeugen
// ---------------------------
function erzeugeHTMLTabelle(gruppe, daten) {
  let html = `
    <h2>Gruppe ${gruppe}</h2>
    <table class="ergebnis-tabelle">
      <thead>
        <tr>
          <th>Platz</th>
          <th>Team</th>
          <th>Spiele</th>
          <th>Punkte</th>
          <th>Tore</th>
          <th>Diff</th>
        </tr>
      </thead>
      <tbody>
  `;

  daten.forEach((t, index) => {
    const diff = t.tore_plus - t.tore_minus;
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${t.team}</td>
        <td>${t.spiele}</td>
        <td>${t.punkte}</td>
        <td>${t.tore_plus} : ${t.tore_minus}</td>
        <td>${diff}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  return html;
}


// ---------------------------
// HAUPTFUNKTION
// ---------------------------
function ladeTabellen() {
  const container = document.getElementById("tabellen-container");
  container.innerHTML = "";

  ["A", "B", "C"].forEach(gruppe => {

    const tabelle = erstelleLeereTabelleFürGruppe(gruppe);
    verarbeiteErgebnisse(tabelle, gruppe);
    const sortiert = sortierteTeamListe(tabelle);
    container.innerHTML += erzeugeHTMLTabelle(gruppe, sortiert);

  });
}

window.addEventListener("DOMContentLoaded", ladeTabellen);
