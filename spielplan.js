// Sortierung der Spiele
function sortiereSpiele(spieleArray) {
  return spieleArray.slice().sort((a, b) => {
    const t = a.zeit.localeCompare(b.zeit);
    if (t !== 0) return t;
    return a.tisch - b.tisch;
  });
}

function zeitInMinuten(uhrzeit) {
  const [h, m] = uhrzeit.split(":").map(Number);
  return h * 60 + m;
}

// Spielplan erzeugen
function erstelleSpielplan() {
  const tbody = document.getElementById("spielplan-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const sortierte = sortiereSpiele(spiele);
  const jetzt = new Date();
  const jetztMinuten = jetzt.getHours() * 60 + jetzt.getMinutes();

  let letzteZeit = null;

  sortierte.forEach(spiel => {
    // Wenn die Zeit sich ändert → Leerzeile einfügen
    if (letzteZeit !== null && spiel.zeit !== letzteZeit) {
      const trLeer = document.createElement("tr");
      trLeer.innerHTML = `<td colspan="6">&nbsp;</td>`; // Leerzeile über alle Spalten
      tbody.appendChild(trLeer);
    }
    letzteZeit = spiel.zeit;
    const er = parseErgebnisString(spiel.ergebnis);
      
    // Statusklasse und Anzeige-Text bestimmen
    const spielStart = zeitInMinuten(spiel.zeit);
    const spielEnde = spielStart + 15;                      ////Time for active slot

    let statusClass, text;
    if (er) {
      statusClass = "status-played";
      text = `${er.a} : ${er.b}`;
    } else {
      text = "- : -";
    }
    if (jetztMinuten >= spielStart && jetztMinuten < spielEnde) {
      statusClass = "status-live";
    }
    // KO-Spiele: Header einfügen, falls noch nicht
    if (!spiel.gruppe || spiel.gruppe === "") {
      if (!document.getElementById("ko-header")) {
        const trHeader = document.createElement("tr");
        trHeader.id = "ko-header";
        trHeader.classList.add("gruppe-header");
        trHeader.innerHTML = `<td colspan="6">K.O.-Spiele</td>`;
        tbody.appendChild(trHeader);
      }
    }

    const tr = document.createElement("tr");
    if (spiel.gruppe !== ""){
      tr.innerHTML = `
        <td>${spiel.zeit}</td>
        <td>${"GP"}</td>
        <td>${spiel.tisch}</td>
        <td class="team" data-team="${spiel.teamA}">${spiel.teamA}</td>
        <td class="team" data-team="${spiel.teamB}">${spiel.teamB}</td>
        <td class="${statusClass}">${text}</td>
      `;
    }else {
      tr.innerHTML = `
        <td>${spiel.zeit}</td>
        <td>${spiel.game}</td>
        <td>${spiel.tisch}</td>
        <td class="team" data-team="${spiel.teamA}">${spiel.teamA}</td>
        <td class="team" data-team="${spiel.teamB}">${spiel.teamB}</td>
        <td class="${statusClass}">${text}</td>
      `;
    }


    tbody.appendChild(tr);
  });
}

erstelleSpielplan();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("team")) {
    const teamName = e.target.dataset.team;

    // Prüfen, ob die Zellen bereits eingefärbt sind (die erste Zelle reicht)
    const isColored = e.target.style.backgroundColor;

    // Alle Zellen mit dem gleichen Team auswählen
    const teamCells = document.querySelectorAll(`td.team[data-team="${teamName}"]`);

    teamCells.forEach(cell => {
      if (isColored) {
        // Farbe entfernen
        cell.style.backgroundColor = "";
        cell.style.color = "";
      } else {
        // Farbe setzen
        cell.style.backgroundColor = teamColors[teamName];
        cell.style.color = "#000"; // Textfarbe anpassen
      }
    });
  }
});
