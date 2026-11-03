const speakerGrid = document.querySelector(".speakers");
const speakerCards = [...speakerGrid.querySelectorAll(":scope > article")];
const talkButtons = [...speakerGrid.querySelectorAll(".speaker-talk-toggle")];

function placeTalkPanels() {
  const columns = getComputedStyle(speakerGrid).gridTemplateColumns.split(" ").length;

  // Inserting after the same card in reverse keeps panels in speaker order.
  for (const button of [...talkButtons].reverse()) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const speakerIndex = speakerCards.indexOf(button.closest("article"));
    const rowEnd = Math.min(Math.floor(speakerIndex / columns) * columns + columns, speakerCards.length) - 1;
    speakerCards[rowEnd].after(panel);
  }
}

function setTalkExpanded(button, expanded) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  button.setAttribute("aria-expanded", String(expanded));
  panel.inert = !expanded;
  panel.classList.toggle("is-open", expanded);
}

for (const button of talkButtons) {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") !== "true";

    for (const otherButton of talkButtons) {
      setTalkExpanded(otherButton, otherButton === button && expanded);
    }
  });
}

placeTalkPanels();
window.matchMedia("(max-width: 760px)").addEventListener("change", placeTalkPanels);

const scheduleTalks = [...document.querySelectorAll("#schedule .talk-details")];
const scheduleToggle = document.querySelector(".schedule-talks-toggle");

function updateScheduleToggle() {
  const allExpanded = scheduleTalks.every(talk => talk.open);
  scheduleToggle.textContent = allExpanded ? "Hide all talks" : "Expand all talks";
  scheduleToggle.setAttribute("aria-expanded", String(allExpanded));
}

scheduleToggle.addEventListener("click", () => {
  const expanded = !scheduleTalks.every(talk => talk.open);

  for (const talk of scheduleTalks) {
    talk.open = expanded;
  }

  updateScheduleToggle();
});

for (const talk of scheduleTalks) {
  talk.addEventListener("toggle", updateScheduleToggle);
}

document.querySelector(".schedule-controls").hidden = scheduleTalks.length === 0;
updateScheduleToggle();
