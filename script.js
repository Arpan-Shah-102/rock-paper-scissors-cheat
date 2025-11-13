let gameButtons = document.querySelectorAll('.game-btn');
let screen = document.querySelector('.screen');
let statDisplay = document.querySelectorAll('.stat-display');

let gameOptions = document.querySelectorAll('.game-option');
let correctGuess = document.querySelector('.correct-guess');
let wrongGuess = document.querySelector('.wrong-guess');

let guessStats = {
  correct: 0,
  wrong: 0,
}
let stats = {
  wins: 0,
  ties: 0,
  losses: 0,
}

let gamesPlayed = 0;
let options = ["🪨", "📄", "✂️"]
let aiModes = ['Kind', 'Normal', 'Cheating'];
let currentAiMode = aiModes[Math.floor(Math.random() * aiModes.length)];

gameButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    let playerChoice = options[index];
    play(playerChoice);
  });
});

function play(playerChoice) {
  let aiChoice;
  if (currentAiMode === 'Cheating') {
    aiChoice = cheatMode(playerChoice);
  } else if (currentAiMode === 'Normal') {
    aiChoice = normalMode();
  } else if (currentAiMode === 'Kind') {
    aiChoice = kindMode(playerChoice);
  }
  playSound(sfx.click);
  gamesPlayed += 1;
  screen.textContent = `You ${playerChoice}  |  ${aiChoice} AI`;
  if (playerChoice === aiChoice) {
    stats.ties += 1;
    screen.innerHTML += "<br>It's a Tie!";
  } else if (
    (playerChoice === "🪨" && aiChoice === "✂️") ||
    (playerChoice === "📄" && aiChoice === "🪨") ||
    (playerChoice === "✂️" && aiChoice === "📄")) {
      stats.wins += 1;
      screen.innerHTML += "<br>You Win!";
  } else {
    stats.losses += 1;
    screen.innerHTML += "<br>You Lose!";
  }
  updateStats();
  if (gamesPlayed == 10) {
    screen.textContent = `Was the AI Kind, Normal, or Cheating?`;
    switchAIMode();
  }
}

function cheatMode(playerChoice) {
  let cheat = Math.floor(Math.random() * 100);
  if (cheat < 50) {
    if (playerChoice === "🪨") return "📄";
    else if (playerChoice === "📄") return "✂️";
    else if (playerChoice === "✂️") return "🪨";
  } else {
    return normalMode();
  }
}
function normalMode() {
  return options[Math.floor(Math.random() * options.length)];
}
function kindMode(playerChoice) {
  let kind = Math.floor(Math.random() * 100);
  if (kind < 50) {
    if (playerChoice === "🪨") return "✂️";
    else if (playerChoice === "📄") return "🪨";
    else if (playerChoice === "✂️") return "📄";
  } else {
    return normalMode();
  }
}

function updateStats() {
  statDisplay[0].textContent = `${stats.wins}`;
  statDisplay[1].textContent = `${stats.ties}`;
  statDisplay[2].textContent = `${stats.losses}`;
  correctGuess.textContent = `${guessStats.correct}`;
  wrongGuess.textContent = `${guessStats.wrong}`;
}

function switchAIMode() {
  gameButtons.forEach(button => button.disabled = true);
  gameOptions.forEach(button => {button.disabled = false;});
}

gameOptions.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (aiModes[index] == currentAiMode) {
      guessStats.correct += 1;
      screen.textContent = `Correct! The AI was ${currentAiMode}.`;
      playSound(sfx.play);
    } else {
      guessStats.wrong += 1;
      screen.textContent = `Wrong! The AI was ${currentAiMode}.`;
      playSound(sfx.wrong);
    }
    stats = {
      wins: 0,
      ties: 0,
      losses: 0,
    }
    updateStats();
    currentAiMode = aiModes[Math.floor(Math.random() * aiModes.length)];
    gamesPlayed = 0;
    gameButtons.forEach(button => button.disabled = false);
    gameOptions.forEach(button => {button.disabled = true;});
  });
});

let toggleTutorial = document.querySelector('.how-to-play');
let tutorial = document.querySelector('.tutorial');
let closeTutorial = document.querySelector('.close-tut');

toggleTutorial.addEventListener('click', () => {
  tutorial.style.display = tutorial.style.display === 'block' ? 'none' : 'block';
  playSound(sfx.click);
});
closeTutorial.addEventListener('click', () => {
  tutorial.style.display = 'none';
  playSound(sfx.click);
});

let sfx = {
  click: new Audio('assets/sfx/click.mp3'),
  play: new Audio('assets/sfx/play.mp3'),
  wrong: new Audio('assets/sfx/wrong.mp3'),
}
function playSound(audioSource) {
  if (!window.soundsMuted) {
    const sound = audioSource.cloneNode();
    sound.play();
  }
}
let soundToggle = document.querySelector('.sound-toggle');
soundToggle.addEventListener('click', () => {
  playSound(sfx.click);
  window.soundsMuted = !window.soundsMuted;
  soundToggle.textContent = window.soundsMuted ? '🔇' : '🔊';
  playSound(sfx.click);
});
