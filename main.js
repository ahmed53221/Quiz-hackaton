const enterBtn = document.getElementById("enter-link");
const quizEl = document.getElementById("quiz");

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const ladderEl = document.getElementById("prize-ladder");

const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const finalText = document.getElementById("final-text");

const restartBtn = document.getElementById("restartBtn");
const restartPopup = document.getElementById("restartPopup");
const confirmRestart = document.getElementById("confirmRestart");
const cancelRestart = document.getElementById("cancelRestart");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

const PRIZES = [
  50,100,200,300,500,
  1000,2000,4000,8000,16000,
  32000,64000,125000,250000,500000
];

const SAFE_LEVELS = [4, 9, 14];
const MAX_QUESTIONS = 15;
const QUESTION_TIME = 30;

let questions = [];
let currentIndex = 0;
let score = 0;
let guaranteed = 0;
let timeLeft = QUESTION_TIME;
let timer = null;
let locked = false;


enterBtn.onclick = () => {
  enterBtn.style.display = "none";
  quizEl.style.display = "block";
  startGame();
};

function startGame() {
  questions = shuffle([...window.pitanja]).slice(0, MAX_QUESTIONS);
  currentIndex = 0;
  score = 0;
  guaranteed = 0;
  scoreEl.textContent = "Score: €0";
  questionScreen.style.display = "block";
  resultScreen.style.display = "none";
  showQuestion();
}



function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function renderLadder() {
  ladderEl.innerHTML = "";
  PRIZES.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "ladder-item";
    item.textContent = "€" + p.toLocaleString();

    if (i === currentIndex) item.classList.add("active");
    if (SAFE_LEVELS.includes(i)) item.classList.add("safe");

    ladderEl.appendChild(item);
  });
}



function startTimer() {
  clearInterval(timer);
  timeLeft = QUESTION_TIME;
  timerEl.textContent = "⏱ " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "⏱ " + timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}



function showQuestion() {
  locked = false;
  renderLadder();
  startTimer();

  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => handleAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}



function handleAnswer(selectedIndex, button) {
  if (locked) return;
  locked = true;

  clearInterval(timer);
  [...optionsEl.children].forEach(b => b.disabled = true);

  const correctIndex = questions[currentIndex].correct;

  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    correctSound.play();

    score = PRIZES[currentIndex];
    scoreEl.textContent = "Score: €" + score.toLocaleString();

    if (SAFE_LEVELS.includes(currentIndex)) {
      guaranteed = score;
    }

    currentIndex++;

    if (currentIndex >= MAX_QUESTIONS) {
      endGame(true);
    } else {
      setTimeout(showQuestion, 800);
    }
  } else {
    button.classList.add("wrong");
    wrongSound.play();
    endGame(false);
  }
}



function endGame(won = false) {
  clearInterval(timer);

  questionScreen.style.display = "none";
  resultScreen.style.display = "block";

  if (won) {
    finalText.textContent =
      "Čestitamo! Osvojili ste €" + score.toLocaleString();
  } else {
    finalText.textContent =
      "Igra je završena. Osvojeno: €" + guaranteed.toLocaleString();
  }
}



restartBtn.onclick = () => {
  restartPopup.classList.remove("hidden");
};

cancelRestart.onclick = () => {
  restartPopup.classList.add("hidden");
};

confirmRestart.onclick = () => {
  location.reload();
};

