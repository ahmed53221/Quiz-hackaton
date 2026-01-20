
let time = 30;
let timerInterval;
const timerEl = document.getElementById("timer");

function startTimer() {
  time = 30;
  timerEl.textContent = "⏱ " + time;

  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = "⏱ " + time;

    if (time === 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}


let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
const scoreEl = document.getElementById("score");
const finalText = document.getElementById("final-text");

if (index === questions[current].correct) {
  score = score + 30 + remainingTime; 
} else {
  score = score + 0; 
}

scoreEl.textContent = "Score: " + score;

if (score > highScore) {
  localStorage.setItem("highScore", score);
  highScore = score;
}

finalText.innerHTML = "🎉 Kraj igre! Tvoj score: " + score + " 🏆 High score: " + highScore;

const restartBtn = document.getElementById("restartBtn");
const restartPopup = document.getElementById("restartPopup");
const confirmRestart = document.getElementById("confirmRestart");
const cancelRestart = document.getElementById("cancelRestart");


restartBtn.addEventListener("click", () => {
  restartPopup.classList.remove("hidden");
});


cancelRestart.addEventListener("click", () => {
  restartPopup.classList.add("hidden");
});


confirmRestart.addEventListener("click", () => {
  restartPopup.classList.add("hidden");
  resetGame();
});


function resetGame() {

  location.reload();
}
