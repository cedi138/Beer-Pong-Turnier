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

function getTeam(gruppe, index) {
  return teams[gruppe][index].name;
}
