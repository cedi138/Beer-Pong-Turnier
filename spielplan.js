// Sortierung der Spiele
function sortiereSpiele(spieleArray) {
  return spieleArray.slice().sort((a, b) => {
    const t = a.zeit.localeCompare(b.zeit);
    if (t !== 0) return t;
    return a.tisch - b.tisch;
  });
}

function parseErgebnisString(ergebnis) {
  if (!ergebnis || ergebnis === "") return null;
  const parts = ergebnis.split(":");
  return {
    a: parseInt(parts[0], 10),
    b: parseInt(parts[1], 10)
  };
}

// Spielplan erzeugen
function erstelleSpielplan() {
  const tbody = document.getElementById("spielplan-body");
  tbody.innerHTML = "";

  const sortierte = sortiereSpiele(spiele);

  sortierte.forEach(spiel => {
    const er = parseErgebnisString(spiel.ergebnis);
    const text = er ? `${er.a} : ${er.b}` : "- : -";

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${spiel.zeit}</td>
      <td>${spiel.tisch}</td>

      <!-- TEAM-Namen anklickbar machen -->
      <td class="team" data-team="${spiel.teamA}">${spiel.teamA}</td>
      <td class="team" data-team="${spiel.teamB}">${spiel.teamB}</td>

      <td>${text}</td>
    `;

    tbody.appendChild(tr);
  });

  aktiviereTeamKlicks();
}

/* -------------------------------------------------------
   NEUE FUNKTION: Team anklicken → alle Spiele hervorheben
--------------------------------------------------------- */
function aktiviereTeamKlicks() {
  const teamZellen = document.querySelectorAll(".team");

  teamZellen.forEach(zelle => {
    zelle.addEventListener("click", () => {
      const team = zelle.getAttribute("data-team");
      highlightTeam(team);
    });
  });
}

let aktuellMarkiertesTeam = null;

function highlightTeam(team) {
  const alleZeilen = document.querySelectorAll("#spielplan-body tr");

  // Wenn Nutzer erneut auf dasselbe Team klickt → Markierung löschen
  if (aktuellMarkiertesTeam === team) {
    alleZeilen.forEach(z => z.classList.remove("highlight"));
    aktuellMarkiertesTeam = null;
    return;
  }

  aktuellMarkiertesTeam = team;

  alleZeilen.forEach(zeile => {
    const tA = zeile.querySelector('[data-team]');

    // Wenn die Zeile Team A oder B enthält → markieren
    if (zeile.innerText.includes(team)) {
      zeile.classList.add("highlight");
    } else {
      zeile.classList.remove("highlight");
    }
  });
}

erstelleSpielplan();
