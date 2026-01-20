
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
