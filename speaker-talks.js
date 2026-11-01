const speakerGrid = document.querySelector(".speakers");
const speakerCards = [...speakerGrid.querySelectorAll(":scope > article")];
const talkButtons = [...speakerGrid.querySelectorAll(".speaker-talk-toggle")];

function placeTalkPanels() {
  const columns = getComputedStyle(speakerGrid).gridTemplateColumns.split(" ").length;

  for (const button of talkButtons) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const speakerIndex = speakerCards.indexOf(button.closest("article"));
    const rowEnd = Math.min(Math.floor(speakerIndex / columns) * columns + columns, speakerCards.length) - 1;
    speakerCards[rowEnd].after(panel);
  }
}

for (const button of talkButtons) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(expanded));
    panel.inert = !expanded;
    panel.classList.toggle("is-open", expanded);
  });
}

placeTalkPanels();
window.matchMedia("(max-width: 760px)").addEventListener("change", placeTalkPanels);
