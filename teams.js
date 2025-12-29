// TEAMS + SPIELER
const teams = {
  A: [
    { name: "K&K attac", members: ["Klusi", "Karin"] },
    { name: "Team Pornobalken", members: ["Cedric", "Karo", "Finn"] },
    { name: "Manni's Boys", members: ["Ole", "Christoph", "Stefan"] },
    { name: "Die Goldbiere", members: ["Jonte", "Maja"] }
  ],

  B: [
    { name: "Lisa's Receivers", members: ["Finno", "Lisa", "Hebbel"] },
    { name: "Scharenbusch Schlampen", members: ["Windy", "Kati", "Leonie"] },
    { name: "Blondes Gift", members: ["Janek", "Nele", "Joe"] },
    { name: "Schamin", members: ["Marie", "Schahrsad"] }
  ],

  C: [
    { name: "Dewid und Goliath", members: ["Sascha", "Dewid"] },
    { name: "Kimo go!", members: ["Monni", "Kirsten"] },
    { name: "Rain da!", members: ["Rainer", "Lotta", "Anton"] },
    { name: "Hexen vom Bierberg", members: ["Lena", "Tina"] }
  ]
};

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


/*const teams = generateTeams({
  p1: participants1,
  p2: participants2,
  p3: participants3,
  seed: 276, // <--- Seed beliebig ändern
});*/

console.log(teams);


const colorPalette = [
  "#FFCDD2", // rot
  "#8B4513", // brown
  "#E1BEE7", // lila
  "#FFD700", // violett
  "#C8E6C9", // grün
  "#F8BBD0", // rosa 
  "#FAF0BE", // blond
  "#B2DFDB", // mint
  "#C5CAE9", // blau
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
