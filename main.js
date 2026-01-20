
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
