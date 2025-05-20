let timeLeft = 5;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");

function startTimer() {
  clearInterval(timer);
  timeLeft = 5;
  timerEl.textContent = `⏳ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      gameOver("⏱ Time's up!");
    }
  }, 1000);
}

function generateQuestion() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const correct = a * b;

  questionEl.textContent = `What is ${a} × ${b}?`;
  const answers = [correct];

  while (answers.length < 4) {
    const wrong = Math.floor(Math.random() * 100) + 1;
    if (!answers.includes(wrong)) answers.push(wrong);
  }

  answers.sort(() => 0.5 - Math.random());
  optionsEl.innerHTML = "";

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (ans === correct) {
        score++;
        updateScore();
        startGame();
      } else {
        gameOver("❌ Wrong answer!");
      }
    };
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = `🏆 High Score: ${highScore}`;
  }
}

function startGame() {
  messageEl.textContent = "";
  restartBtn.style.display = "none";
  generateQuestion();
}

function gameOver(reason) {
  clearInterval(timer);
  questionEl.textContent = "Game Over!";
  optionsEl.innerHTML = "";
  let finalMsg = `${reason} Final Score: ${score}`;
  if (score >= highScore) {
    finalMsg += " 🎉 New High Score!";
  }
  messageEl.textContent = finalMsg;
  restartBtn.style.display = "inline-block";
}

function init() {
  score = 0;
  scoreEl.textContent = `Score: ${score}`;
  highScoreEl.textContent = `🏆 High Score: ${highScore}`;
  restartBtn.style.display = "none";
  startGame();
}

restartBtn.onclick = init;
init();
