const pads = {
  green: new Audio("https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-1.mp3"),
  red: new Audio("https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-2.mp3"),
  yellow: new Audio("https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-3.mp3"),
  blue: new Audio("https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-4.mp3"),
};

const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let step = 0;
let strict = false;

const startBtn = document.getElementById("start");
const strictBtn = document.getElementById("strict");
const resetBtn = document.getElementById("reset");
const stepDisplay = document.getElementById("step");
const message = document.getElementById("message");
const boardPads = document.querySelectorAll(".pad");

startBtn.addEventListener("click", startGame);
strictBtn.addEventListener("click", toggleStrict);
resetBtn.addEventListener("click", resetGame);
boardPads.forEach((p) => p.addEventListener("click", handlePadClick));

function startGame() {
  sequence = [];
  step = 0;
  nextRound();
}

function toggleStrict() {
  strict = !strict;
  message.textContent = strict ? "Strict mode ON" : "Strict mode OFF";
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  step = 0;
  stepDisplay.textContent = 0;
  message.textContent = "";
}

function nextRound() {
  playerSequence = [];
  step++;
  stepDisplay.textContent = step;
  sequence.push(colors[Math.floor(Math.random() * 4)]);
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    activatePad(sequence[i]);
    i++;
    if (i >= sequence.length) clearInterval(interval);
  }, 800);
}

function activatePad(color) {
  const pad = document.getElementById(color);
  pads[color].currentTime = 0;
  pads[color].play();
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 400);
}

function handlePadClick(e) {
  const color = e.target.id;
  playerSequence.push(color);
  activatePad(color);
  checkPlayerMove();
}

function checkPlayerMove() {
  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    message.textContent = "Wrong move!";
    if (strict) {
      startGame();
    } else {
      playerSequence = [];
      setTimeout(playSequence, 1000);
    }
    return;
  }
  if (playerSequence.length === sequence.length) {
    if (sequence.length === 20) {
      message.textContent = "You win!";
      setTimeout(startGame, 2000);
    } else {
      setTimeout(nextRound, 1000);
    }
  }
}
