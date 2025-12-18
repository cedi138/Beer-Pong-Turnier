// ---------------------------
// HTML-Tabelle erzeugen
// ---------------------------
function erzeugeHTMLTabelle(gruppe, daten) {
  let html = `
    <h2>Gruppe ${gruppe}</h2>
    <table>
      <thead>
        <tr>
          <th>Platz</th>
          <th>Team</th>
          <th>Spiele</th>
          <th>Punkte</th>
          <th>Becher</th>
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
  Object.keys(allTables).forEach(key => {
    container.innerHTML += erzeugeHTMLTabelle(key, allTables[key]);
  });
  
}

window.addEventListener("DOMContentLoaded", ladeTabellen);
