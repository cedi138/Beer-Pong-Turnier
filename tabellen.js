function berechneTabellen() {

    for (const gruppe in gruppen) {

        const teams = gruppen[gruppe];

        // Grunddaten für jedes Team
        let tabelle = teams.map(t => ({
            team: t,
            punkte: 0,
            torePlus: 0,
            toreMinus: 0,
            spiele: 0
        }));

        // Ergebnisse einarbeiten
        ergebnisse
            .filter(e => e.gruppe === gruppe)
            .forEach(e => {
                const team1 = tabelle.find(t => t.team === e.team1);
                const team2 = tabelle.find(t => t.team === e.team2);

                // Tore sammeln
                team1.torePlus += e.score1;
                team1.toreMinus += e.score2;
                team2.torePlus += e.score2;
                team2.toreMinus += e.score1;
                
                team1.spiele++;
                team2.spiele++;

                // Punkte
                if (e.score1 > e.score2) {
                    team1.punkte += 3;
                } else if (e.score2 > e.score1) {
                    team2.punkte += 3;
                } else {
                    team1.punkte += 1;
                    team2.punkte += 1;
                }
            });

        // Sortierung:
        tabelle.sort((a, b) =>
            b.punkte - a.punkte ||
            (b.torePlus - b.toreMinus) - (a.torePlus - a.toreMinus) ||
            a.team.localeCompare(b.team)
        );

        // Ausgabe
        const container = document.getElementById("tabellen-container");
        const block = document.createElement("div");

        block.innerHTML = `
            <h2>Gruppe ${gruppe}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Platz</th>
                        <th>Team</th>
                        <th>Punkte</th>
                        <th>Tore</th>
                        <th>Spiele</th>
                    </tr>
                </thead>
                <tbody>
                    ${tabelle.map((t, idx) => `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${t.team}</td>
                            <td>${t.punkte}</td>
                            <td>${t.torePlus}:${t.toreMinus}</td>
                            <td>${t.spiele}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        container.appendChild(block);
    }
}

window.onload = berechneTabellen;
