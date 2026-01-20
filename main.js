function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let questionsCopy = [...window.questions];
shuffle(questionsCopy);
const quizQuestions = questionsCopy.slice(0, 15);

let current = 0;
let score = 0;
let guaranteedScore = 0;
let time = 30;
let timerInterval;
let gameOver = false;
let locked = false;

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalText = document.getElementById("final-text");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const ladderEl = document.getElementById("prize-ladder");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

const prizes = [
  50, 100, 200, 300, 500,
  1000, 2000, 4000, 8000, 16000,
  32000, 64000, 125000, 250000, 500000
];

const safeLevels = [4, 9, 14];

function renderLadder() {
  ladderEl.innerHTML = "";
  prizes.forEach((p, i) => {
    const div = document.createElement("div");
    div.textContent = "€" + p.toLocaleString();
    div.className = "ladder-item";
    if (i === current) div.classList.add("active");
    if (safeLevels.includes(i)) div.classList.add("safe");
    ladderEl.appendChild(div);
  });
}

function startTimer() {
  time = 30;
  timerEl.textContent = "⏱ " + time;

  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = "⏱ " + time;
    if (time === 0) endGame();
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}

function showQuestion() {
  if (gameOver || current >= 15) return endGame();

  locked = false;
  renderLadder();
  resetTimer();

  const q = quizQuestions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.style.touchAction = "manipulation";
    btn.onclick = () => checkAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}

function lockButtons() {
  [...optionsEl.children].forEach(b => b.disabled = true);
}

function checkAnswer(index, btn) {
  if (locked || gameOver) return;
  locked = true;
  lockButtons();
  clearInterval(timerInterval);

  if (index === quizQuestions[current].correct) {
    correctSound.play();
    score = prizes[current];
    scoreEl.textContent = "Score: €" + score.toLocaleString();

    if (safeLevels.includes(current)) {
      guaranteedScore = score;
    }

    btn.classList.add("correct");
    current++;

    setTimeout(showQuestion, 800);
  } else {
    wrongSound.play();
    btn.classList.add("wrong");
    endGame();
  }
}

function endGame() {
  gameOver = true;
  clearInterval(timerInterval);

  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let finalScore = guaranteedScore;
  let highScore = localStorage.getItem("highScore") || 0;

  if (finalScore > highScore) {
    localStorage.setItem("highScore", finalScore);
    highScore = finalScore;
  }

  finalText.innerHTML = `
    🎮 Game Over<br>
    Osvojeno: €${finalScore.toLocaleString()}<br>
    🏆 High score: €${highScore.toLocaleString()}
  `;
}

showQuestion();

const restartBtn = document.getElementById("restartBtn");
const restartPopup = document.getElementById("restartPopup");
const confirmRestart = document.getElementById("confirmRestart");
const cancelRestart = document.getElementById("cancelRestart");

restartBtn.onclick = () => restartPopup.classList.remove("hidden");
cancelRestart.onclick = () => restartPopup.classList.add("hidden");
confirmRestart.onclick = () => location.reload();

