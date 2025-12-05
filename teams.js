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
