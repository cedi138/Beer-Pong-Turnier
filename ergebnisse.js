// TEAMS + SPIELER
const teams = {
  A: [
    { name: "Team 1", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 2", members: ["Teilnehmer 1", "Teilnehmer 2"] },
    { name: "Team 3", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 4", members: ["Teilnehmer 1", "Teilnehmer 2"] }
  ],

  B: [
    { name: "Team 5", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 6", members: ["Teilnehmer 1", "Teilnehmer 2"] },
    { name: "Team 7", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 8", members: ["Teilnehmer 1", "Teilnehmer 2"] }
  ],

  C: [
    { name: "Team 9", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 10", members: ["Teilnehmer 1", "Teilnehmer 2"] },
    { name: "Team 11", members: ["Teilnehmer 1", "Teilnehmer 2", "Teilnehmer 3"] },
    { name: "Team 12", members: ["Teilnehmer 1", "Teilnehmer 2"] }
  ]
};

// ---------------------------------------------------
// HELFER: Team-Name per Index
// ---------------------------------------------------
function getTeam(gruppe, index) {
  return teams[gruppe][index].name;
}


// --- Spielplan ---------------------------------------------------
// Jede Gruppe: Round-Robin (jeder-gegen-jeden)
// Zeiten in 6 Spielblöcken: 19:15, 19:30, 19:45, 20:00, 20:15, 20:30
// Pro Block: 3 Spiele – Tisch 1 (A), Tisch 2 (B), Tisch 3 (C)

const time = ["19:15", "19:30", "19:45", "20:00", "20:15", "20:45"]
const spiele = [
  // Block 1 – 19:15
  { zeit: time[0], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 1), ergebnis: "6:4" },
  { zeit: time[0], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 1), ergebnis: "5:5" },
  { zeit: time[0], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 1), ergebnis: "2:3" },

  // Block 2 – 19:30
  { zeit: time[1], tisch: 1, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[1], tisch: 2, gruppe: "B", teamA: getTeam("B", 2), teamB: getTeam("B", 3), ergebnis: "" },
  { zeit: time[1], tisch: 3, gruppe: "C", teamA: getTeam("C", 2), teamB: getTeam("C", 3), ergebnis: "" },

  // Block 3 – 19:45
  { zeit: time[2], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 2), ergebnis: "" },
  { zeit: time[2], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 2), ergebnis: "" },
  { zeit: time[2], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 2), ergebnis: "" },

  // Block 4 – 20:00
  { zeit: time[3], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[3], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 3), ergebnis: "" },
  { zeit: time[3], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 3), ergebnis: "" },

  // Block 5 – 20:15
  { zeit: time[4], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[4], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 3), ergebnis: "" },
  { zeit: time[4], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 3), ergebnis: "" },

  // Block 6 – 20:30
  { zeit: time[5], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 2), ergebnis: "" },
  { zeit: time[5], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 2), ergebnis: "" },
  { zeit: time[5], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 2), ergebnis: "" }
];


