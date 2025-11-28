// --- Gruppen -----------------------------------------------------

const gruppen = {
  A: ["Team 1", "Team 2", "Team 3", "Team 4"],
  B: ["Team 5", "Team 6", "Team 7", "Team 8"],
  C: ["Team 9", "Team 10", "Team 11", "Team 12"]
};

// --- Spielplan ---------------------------------------------------
// Jede Gruppe: Round-Robin (jeder-gegen-jeden)
// Zeiten in 6 Spielblöcken: 09:00, 09:20, 09:40, 10:00, 10:20, 10:40
// Pro Block: 3 Spiele – Tisch 1 (A), Tisch 2 (B), Tisch 3 (C)

const spiele = [
  // Block 1 – 09:00
  { zeit: "09:00", tisch: 1, gruppe: "A", teamA: "Team 1", teamB: "Team 2", ergebnis: "" },
  { zeit: "09:00", tisch: 2, gruppe: "B", teamA: "Team 5", teamB: "Team 6", ergebnis: "" },
  { zeit: "09:00", tisch: 3, gruppe: "C", teamA: "Team 9", teamB: "Team 10", ergebnis: "" },

  // Block 2 – 09:20
  { zeit: "09:20", tisch: 1, gruppe: "A", teamA: "Team 3", teamB: "Team 4", ergebnis: "" },
  { zeit: "09:20", tisch: 2, gruppe: "B", teamA: "Team 7", teamB: "Team 8", ergebnis: "" },
  { zeit: "09:20", tisch: 3, gruppe: "C", teamA: "Team 11", teamB: "Team 12", ergebnis: "" },

  // Block 3 – 09:40
  { zeit: "09:40", tisch: 1, gruppe: "A", teamA: "Team 1", teamB: "Team 3", ergebnis: "" },
  { zeit: "09:40", tisch: 2, gruppe: "B", teamA: "Team 5", teamB: "Team 7", ergebnis: "" },
  { zeit: "09:40", tisch: 3, gruppe: "C", teamA: "Team 9", teamB: "Team 11", ergebnis: "" },

  // Block 4 – 10:00
  { zeit: "10:00", tisch: 1, gruppe: "A", teamA: "Team 2", teamB: "Team 4", ergebnis: "" },
  { zeit: "10:00", tisch: 2, gruppe: "B", teamA: "Team 6", teamB: "Team 8", ergebnis: "" },
  { zeit: "10:00", tisch: 3, gruppe: "C", teamA: "Team 10", teamB: "Team 12", ergebnis: "" },

  // Block 5 – 10:20
  { zeit: "10:20", tisch: 1, gruppe: "A", teamA: "Team 1", teamB: "Team 4", ergebnis: "" },
  { zeit: "10:20", tisch: 2, gruppe: "B", teamA: "Team 5", teamB: "Team 8", ergebnis: "" },
  { zeit: "10:20", tisch: 3, gruppe: "C", teamA: "Team 9", teamB: "Team 12", ergebnis: "" },

  // Block 6 – 10:40
  { zeit: "10:40", tisch: 1, gruppe: "A", teamA: "Team 2", teamB: "Team 3", ergebnis: "" },
  { zeit: "10:40", tisch: 2, gruppe: "B", teamA: "Team 6", teamB: "Team 7", ergebnis: "" },
  { zeit: "10:40", tisch: 3, gruppe: "C", teamA: "Team 10", teamB: "Team 11", ergebnis: "" }
];

