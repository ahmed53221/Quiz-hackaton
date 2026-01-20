document.addEventListener("DOMContentLoaded", () => {

  const enterBtn = document.getElementById("enter-link");
  const quizEl = document.getElementById("quiz");

  const questionScreen = document.getElementById("question-screen");
  const resultScreen = document.getElementById("result-screen");

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const progressEl = document.getElementById("progress");

  const timerEl = document.getElementById("timer");
  const scoreEl = document.getElementById("score");
  const finalText = document.getElementById("final-text");

  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  const restartBtn = document.getElementById("restartBtn");
  const restartPopup = document.getElementById("restartPopup");
  const confirmRestart = document.getElementById("confirmRestart");
  const cancelRestart = document.getElementById("cancelRestart");

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  if (!window.questions || window.questions.length === 0) {
    alert("pitanja.js nije učitan ili je prazan");
    return;
  }

  let questions = [...window.questions];
  shuffle(questions);
  questions = questions.slice(0, 15);

  let currentIndex = 0;
  let score = 0;
  let time = 30;
  let timerInterval;

  function startTimer() {
    clearInterval(timerInterval);
    time = 30;
    timerEl.textContent = "⏱ " + time;

    timerInterval = setInterval(() => {
      time--;
      timerEl.textContent = "⏱ " + time;

      if (time === 0) {
        clearInterval(timerInterval);
        endGame(false);
      }
    }, 1000);
  }

  function showQuestion() {
    questionScreen.style.display = "flex";
    resultScreen.style.display = "none";

    const q = questions[currentIndex];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    progressEl.textContent = `Question ${currentIndex + 1} / 15`;

    startTimer();

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => handleAnswer(option);
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selected) {
    clearInterval(timerInterval);

    if (selected === questions[currentIndex].answer) {
      if (correctSound) correctSound.play();
      score += 30 + time;
      scoreEl.textContent = "Score: " + score;
      currentIndex++;

      if (currentIndex === 15) {
        endGame(true);
      } else {
        showQuestion();
      }
    } else {
      if (wrongSound) wrongSound.play();
      endGame(false);
    }
  }

  function endGame(won) {
    clearInterval(timerInterval);
    questionScreen.style.display = "none";
    resultScreen.style.display = "flex";

    let highScore = Number(localStorage.getItem("highScore") || 0);
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScore = score;
    }

    finalText.innerHTML = won
      ? `🎉 Bravo!<br>Score: ${score}<br>🏆 High score: ${highScore}`
      : `❌ Pogrešan odgovor ili istek vremena!<br>Score: ${score}<br>🏆 High score: ${highScore}`;
  }

  enterBtn.onclick = () => {
    enterBtn.style.display = "none";
    quizEl.style.display = "block";
    score = 0;
    scoreEl.textContent = "Score: 0";
    currentIndex = 0;
    showQuestion();
  };

  restartBtn.onclick = () => restartPopup.classList.remove("hidden");
  cancelRestart.onclick = () => restartPopup.classList.add("hidden");
  confirmRestart.onclick = () => location.reload();

});



