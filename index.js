/* ==================================================
   Helper Functions
================================================== */

// Returns the next time slot with at least one unplayed match
function findNextTimeSlot() {
  const openGames = spiele.filter(s => !parseErgebnisString(s.ergebnis));
  if (openGames.length === 0) return null;

  openGames.sort((a, b) => a.zeit.localeCompare(b.zeit));
  return openGames[0].zeit;
}

// Returns all matches for a given time slot
function gamesForTimeSlot(time) {
  return spiele
    .filter(s => s.zeit === time)
    .sort((a, b) => a.tisch - b.tisch);
}

/* ==================================================
   Upcoming Matches (Grid)
================================================== */
function showUpcomingMatches() {
  const grid = document.querySelector(
    "#upcoming-matches .upcoming-grid"
  );
  if (!grid) return;

  // Remove old game items (keep headers)
  grid.querySelectorAll(".grid-item").forEach(el => el.remove());

  const nextTime = findNextTimeSlot();

  if (!nextTime) {
    const item = document.createElement("div");
    item.className = "grid-item";
    item.style.gridColumn = "span 4";
    item.textContent = "All matches have been played 🎉";
    grid.appendChild(item);
    return;
  }

  const games = gamesForTimeSlot(nextTime);

  // Time cell
  const timeCell = document.createElement("div");
  timeCell.className = "grid-item";
  timeCell.innerHTML = `<strong>${nextTime}</strong>`;
  grid.appendChild(timeCell);

  // Tables 1–3
  for (let i = 0; i < 3; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-item";

    if (games[i]) {
      cell.innerHTML = `<strong>${games[i].teamA} vs ${games[i].teamB}</strong>`;
    } else {
      cell.textContent = "-";
    }

    grid.appendChild(cell);
  }
}

/* ==================================================
   Latest Results
================================================== */
function showLatestResults() {
  const container = document.querySelector(
    "#latest-results .result-list"
  );
  if (!container) return;

  container.innerHTML = "";

  // All played games
  const playedGames = spiele.filter(
    s => s.ergebnis && s.ergebnis.trim() !== ""
  );

  if (playedGames.length === 0) {
    const item = document.createElement("div");
    item.className = "last-result-item";
    item.textContent = "No matches played yet.";
    container.appendChild(item);
    return;
  }

  // Determine latest time slot
  const times = playedGames
    .map(s => s.zeit)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const latestTime = times[times.length - 1];

  // Matches of the latest time slot
  const latestGames = playedGames.filter(
    s => s.zeit === latestTime
  );

latestGames.forEach(game => {
  const card = document.createElement("div");
  card.className = "last-result-item";

  const teams = document.createElement("div");
  teams.className = "teams";
  teams.textContent = `${game.teamA} vs ${game.teamB}`;

  const result = document.createElement("div");
  result.className = "ergebnis";
  result.textContent = game.ergebnis;

  card.appendChild(teams);
  card.appendChild(result);
  container.appendChild(card);
});
}

/* ==================================================
   Image Modal
================================================== */
function initImageModal() {
  const clickableImage = document.getElementById("clickable-image");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.getElementById("close-modal");

  if (!clickableImage || !modal || !modalImg || !closeModal) return;

  clickableImage.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = clickableImage.src;
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

/* ==================================================
   Initialization
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  showUpcomingMatches();
  showLatestResults();
  initImageModal();
});
