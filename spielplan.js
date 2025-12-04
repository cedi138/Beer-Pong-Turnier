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
      trLeer.innerHTML = `<td colspan="5">&nbsp;</td>`; // Leerzeile über alle Spalten
      tbody.appendChild(trLeer);
    }
    letzteZeit = spiel.zeit;
    const er = parseErgebnisString(spiel.ergebnis);
      
    // Statusklasse und Anzeige-Text bestimmen
    const spielStart = zeitInMinuten(spiel.zeit);
    const spielEnde = spielStart + 15;

    let statusClass, text;
    if (er) {
      statusClass = "status-gespielt";
      text = `${er.a} : ${er.b}`;
    } else {
      text = "- : -";
    }
    if (jetztMinuten >= spielStart && jetztMinuten < spielEnde) {
      statusClass = "status-live";
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
