// === SPIELPLAN AUTOMATISCH AUS ERGEBNISSEN + TEAMS ERSTELLEN ===

// Alle Spiele erzeugen (jeder gegen jeden in der Gruppe)
function generiereAlleSpiele() {
    const alleSpiele = [];

    for (const gruppe in gruppen) {
        const teams = gruppen[gruppe];

        // Jeder gegen jeden
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                alleSpiele.push({
                    gruppe: gruppe,
                    team1: teams[i],
                    team2: teams[j]
                });
            }
        }
    }

    return alleSpiele;
}

const alleSpiele = generiereAlleSpiele();

// Abgleich: welche Spiele sind schon gespielt
function findeErgebnis(team1, team2) {
    return ergebnisse.find(e =>
        (e.team1 === team1 && e.team2 === team2) ||
        (e.team1 === team2 && e.team2 === team1)
    );
}

// Ausgabe in die HTML-Tabelle
function erstelleSpielplan() {
    const tbody = document.getElementById("spielplan-body");

    alleSpiele.forEach(spiel => {
        const row = document.createElement("tr");

        const ergebnis = findeErgebnis(spiel.team1, spiel.team2);

        row.innerHTML = `
            <td>${spiel.gruppe}</td>
            <td>${spiel.team1}</td>
            <td>${spiel.team2}</td>
            <td>${ergebnis ? `${ergebnis.score1} : ${ergebnis.score2}` : "-"}</td>
            <td>${ergebnis ? "Gespielt" : "Offen"}</td>
        `;

        tbody.appendChild(row);
    });
}

window.onload = erstelleSpielplan;
