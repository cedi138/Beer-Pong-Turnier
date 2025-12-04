// --- Spielplan ---------------------------------------------------
// Jede Gruppe: Round-Robin (jeder-gegen-jeden)
// Zeiten in 6 Spielblöcken: 19:15, 19:30, 19:45, 20:00, 20:15, 20:30
// Pro Block: 3 Spiele – Tisch 1 (A), Tisch 2 (B), Tisch 3 (C)

const time = ["19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45"]
const spiele = [
  // Block 1 – 19:15
  { zeit: time[0], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 1), ergebnis: "6:4" },    //Game 1
  { zeit: time[0], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 1), ergebnis: "5:5" },
  { zeit: time[0], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 1), ergebnis: "2:3" },

  // Block 2 – 19:30
  { zeit: time[1], tisch: 1, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 3), ergebnis: "2:2" },    //Game 4
  { zeit: time[1], tisch: 2, gruppe: "B", teamA: getTeam("B", 2), teamB: getTeam("B", 3), ergebnis: "3:5" },
  { zeit: time[1], tisch: 3, gruppe: "C", teamA: getTeam("C", 2), teamB: getTeam("C", 3), ergebnis: "1:0" },

  // Block 3 – 19:45
  { zeit: time[2], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 2), ergebnis: "3:1" },      //Game 7
  { zeit: time[2], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 2), ergebnis: "4:6" },
  { zeit: time[2], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 2), ergebnis: "6:2" },

  // Block 4 – 20:00
  { zeit: time[3], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 3), ergebnis: "5:3" },      //Game 10
  { zeit: time[3], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 3), ergebnis: "0:3" },
  { zeit: time[3], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 3), ergebnis: "6:5" },

  // Block 5 – 20:15
  { zeit: time[4], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 3), ergebnis: "4:4" },      //Game 13
  { zeit: time[4], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 3), ergebnis: "5:1" },
  { zeit: time[4], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 3), ergebnis: "1:2" },

  // Block 6 – 20:30
  { zeit: time[5], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 2), ergebnis: "4:6" },      //Game 16
  { zeit: time[5], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 2), ergebnis: "6:6" },
  { zeit: time[5], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 2), ergebnis: "3:5" },

  // Block 7 – 20:45
  { zeit: time[6], tisch: 1, gruppe: "", teamA: "Bester 1.", teamB: "Zweitbester 3.", ergebnis: "" },          //Game 19 VF1
  { zeit: time[6], tisch: 2, gruppe: "", teamA: "Zweitbester 1.", teamB: "Bester 3.", ergebnis: "" },           // VF2
  { zeit: time[6], tisch: 3, gruppe: "", teamA: "Drittbester 1.", teamB: "Drittbester 2.", ergebnis: "" },      // VF3

  // Block 8 – 21:00
  { zeit: time[7], tisch: 1, gruppe: "", teamA: "Bester 2.", teamB: "Zweitbester 2.", ergebnis: "" },          //Game 22 VF4
  { zeit: time[7], tisch: 2, gruppe: "", teamA: "Drittbester 3.", teamB: "Bester 4.", ergebnis: "" },
  { zeit: time[7], tisch: 3, gruppe: "", teamA: "Zweitbester 4.", teamB: "Drittbester 4.", ergebnis: "" },

  // Block 9 – 21:15
  { zeit: time[8], tisch: 1, gruppe: "", teamA: "Sieger VF1", teamB: "Sieger VF2", ergebnis: "" },          //Game 25 HF1
  { zeit: time[8], tisch: 2, gruppe: "", teamA: "Sieger VF3", teamB: "Sieger VF4", ergebnis: "" },        // HF2

  // Block 10 – 21:30
  { zeit: time[9], tisch: 1, gruppe: "", teamA: "Verlierer VF1", teamB: "Verlierer VF2", ergebnis: "" },    //SP5
  { zeit: time[9], tisch: 2, gruppe: "", teamA: "Verlierer VF3", teamB: "Verlierer VF4.", ergebnis: "" },   //SP7
  { zeit: time[9], tisch: 3, gruppe: "", teamA: "Verlierer HF1", teamB: "Verlierer HF2", ergebnis: "" },    // SP3

  // Block 11 – 21:45
  { zeit: time[10], tisch: 2, gruppe: "", teamA: "Sieger HF1", teamB: "Sieger HF2", ergebnis: "" }    //Final
];

//Divide ergebnis in {a: , b:} if ergebnis is existing
function parseErgebnisString(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}

// Create empty table for each group
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

//Calculate table 
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

//Sort table 
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

const allTables = {};

Object.keys(teams).forEach(key => {
  allTables[key] = erstelleLeereTabelleFürGruppe(key);
  verarbeiteErgebnisse(allTables[key], key)
  allTables[key] = sortierteTeamListe(allTables[key])              //Sortet array of teams with keys team, spiele, punkte, tore_plus, tore_minus
});

function sortTeams(liste) {
  return liste.slice().sort((a, b) => {

    // 1. Punkte
    if (b.punkte !== a.punkte) return b.punkte - a.punkte;

    // 2. Tordifferenz
    const diffA = a.tore_plus - a.tore_minus;
    const diffB = b.tore_plus - b.tore_minus;
    if (diffB !== diffA) return diffB - diffA;

    // 3. Tore plus
    if (b.tore_plus !== a.tore_plus) return b.tore_plus - a.tore_plus;

    // 4. Zufall, falls alles gleich ist
    return Math.random() - 0.5;
  });
}

function getTeamByPlacement(groupPosition, overallPosition) {
  let allTeams = [];

  Object.keys(allTables).forEach(group => {
    allTeams.push(allTables[group][groupPosition - 1]);
  });

  allTeams = sortTeams(allTeams);

  return allTeams[overallPosition - 1].team;
}

function updateGames() {
  // 1. Prüfen, ob alle Teams drei Spiele haben
  const allGamesPlayed = Object.values(allTables)
    .flat()                        // alle Team-Objekte in einem Array sammeln
    .every(team => team.spiele >= 3);  // prüfen, ob alle >= 3 Spiele haben
  if (!allGamesPlayed) return; // noch nicht alle fertig → nichts ändern
  spiele[18].teamA = getTeamByPlacement(1,1);
  spiele[18].teamB = getTeamByPlacement(3,2);
  spiele[19].teamA = getTeamByPlacement(1,2);
  spiele[19].teamB = getTeamByPlacement(3,1);
  spiele[20].teamA = getTeamByPlacement(1,3);
  spiele[20].teamB = getTeamByPlacement(2,3);
  spiele[21].teamA = getTeamByPlacement(2,1);
  spiele[21].teamB = getTeamByPlacement(2,2);
  spiele[22].teamA = getTeamByPlacement(3,3);
  spiele[22].teamB = getTeamByPlacement(4,1);
  spiele[23].teamA = getTeamByPlacement(4,2);
  spiele[23].teamB = getTeamByPlacement(4,3);
}
updateGames()
  
