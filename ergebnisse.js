// --- Spielplan ---------------------------------------------------
// Jede Gruppe: Round-Robin (jeder-gegen-jeden)
// Zeiten in 6 Spielblöcken: 19:15, 19:30, 19:45, 20:00, 20:15, 20:30
// Pro Block: 3 Spiele – Tisch 1 (A), Tisch 2 (B), Tisch 3 (C)

const time = ["19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30"]
const spiele = [
  // Block 1 – 19:15
  { game: 1, zeit: time[0], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 1), ergebnis: "6:4" },
  { game: 2, zeit: time[0], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 1), ergebnis: "5:5" },
  { game: 3, zeit: time[0], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 1), ergebnis: "2:3" },

  // Block 2 – 19:30
  { game: 4, zeit: time[1], tisch: 1, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 3), ergebnis: "2:2" },
  { game: 5, zeit: time[1], tisch: 2, gruppe: "B", teamA: getTeam("B", 2), teamB: getTeam("B", 3), ergebnis: "3:5" },
  { game: 6, zeit: time[1], tisch: 3, gruppe: "C", teamA: getTeam("C", 2), teamB: getTeam("C", 3), ergebnis: "1:0" },

  // Block 3 – 19:45
  { game: 7, zeit: time[2], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 2), ergebnis: "" },
  { game: 8, zeit: time[2], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 2), ergebnis: "" },
  { game: 9, zeit: time[2], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 2), ergebnis: "" },

  // Block 4 – 20:00
  { game: 10, zeit: time[3], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 3), ergebnis: "" },
  { game: 11, zeit: time[3], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 3), ergebnis: "" },
  { game: 12, zeit: time[3], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 3), ergebnis: "" },

  // Block 5 – 20:15
  { game: 13, zeit: time[4], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 3), ergebnis: "" },
  { game: 14, zeit: time[4], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 3), ergebnis: "" },
  { game: 15, zeit: time[4], tisch: 3, gruppe: "C", teamA: getTeam("C", 0), teamB: getTeam("C", 3), ergebnis: "" },

  // Block 6 – 20:30
  { game: 16, zeit: time[5], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 2), ergebnis: "" },
  { game: 17, zeit: time[5], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 2), ergebnis: "" },
  { game: 18, zeit: time[5], tisch: 3, gruppe: "C", teamA: getTeam("C", 1), teamB: getTeam("C", 2), ergebnis: "" },

  // Block 7 – 20:45
  { game: 19, zeit: time[6], tisch: 1, gruppe: "", teamA: "Bester 1.", teamB: "Zweitbester 3.", ergebnis: "" },
  { game: 20, zeit: time[6], tisch: 2, gruppe: "", teamA: "Zweitbester 1.", teamB: "Bester 3.", ergebnis: "" },
  { game: 21, zeit: time[6], tisch: 3, gruppe: "", teamA: "Drittbester 1.", teamB: "Drittbester 2.", ergebnis: "" },

  // Block 8 – 21:00
  { game: 22, zeit: time[7], tisch: 1, gruppe: "", teamA: "Bester 2.", teamB: "Zweitbester 2.", ergebnis: "" },
  { game: 23, zeit: time[7], tisch: 2, gruppe: "", teamA: "Drittbester 3.", teamB: "Bester 4.", ergebnis: "" },
  { game: 24, zeit: time[7], tisch: 3, gruppe: "", teamA: "Zweitbester 4.", teamB: "Drittbester 4."), ergebnis: "" },
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

