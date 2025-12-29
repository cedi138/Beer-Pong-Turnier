// TEAMS + SPIELER
/*const teams = {
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
};*/

/** Simple seeded pseudo-random generator (Mulberry32) **/
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** Shuffle with seeded RNG */
function shuffle(array, rng) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function generateTeams({ p1, p2, p3, seed }) {
  const rng = mulberry32(seed);

  const s1 = shuffle(p1, rng);
  const s2 = shuffle(p2, rng);
  const s3 = shuffle(p3, rng);

  // 12 Grundteams
  const baseTeams = Array.from({ length: 12 }, (_, i) => ({
    name: `Team ${i + 1}`, // kannst du später ändern
    members: [s1[i], s2[i]]
  }));

  // p3 zufällig auf Teams verteilen (max. 3 Mitglieder pro Team)
  for (const person of s3) {
    const eligible = baseTeams.filter((t) => t.members.length < 3);
    if (eligible.length === 0) break;

    const team = eligible[Math.floor(rng() * eligible.length)];
    team.members.push(person);
  }

  // In A, B, C gruppieren
  return {
    A: baseTeams.slice(0, 4),
    B: baseTeams.slice(4, 8),
    C: baseTeams.slice(8, 12),
  };
}
// -----------------------
const participants1 = ["Cedric", "Windy", "Finno", "Janek", "Sascha", "Klusi",
  "Marie", "Rainer", "Lena", "Jonte", "Monni", "Ole"];

const participants2 = ["Kirsten", "Kati", "Tina", "Christoph", "Karin", "Lisa",
  "Lotta", "Maja", "Schahrsad", "Karo", "Nele", "Dewid"];

const participants3 = ["Joe", "Anton", "Hebbel", "Leonie", "Finn", "Stefan"];


const teams = generateTeams({
  p1: participants1,
  p2: participants2,
  p3: participants3,
  seed: 276, // <--- Seed beliebig ändern
});

console.log(teams);


const colorPalette = [
  "#FFCDD2", // rot
  "#F8BBD0", // rosa
  "#E1BEE7", // lila
  "#D1C4E9", // violett
  "#C5CAE9", // blau
  "#BBDEFB", // hellblau
  "#B3E5FC", // türkis
  "#B2DFDB", // mint
  "#C8E6C9", // grün
  "#DCEDC8", // hellgrün
  "#F0F4C3", // gelb
  "#FFE0B2"  // orange
];

const teamColors = {};
let colorIndex = 0;

Object.values(teams).flat().forEach(team => {
  teamColors[team.name] = colorPalette[colorIndex % colorPalette.length];
  colorIndex++;
});

function getTeam(gruppe, index) {
  return teams[gruppe][index].name;
}
