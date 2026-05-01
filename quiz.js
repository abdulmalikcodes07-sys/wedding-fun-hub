const quizData = [
  {
    question: "Who said I love you first?",
    answers: ["Him", "Her", "Both", "No one"],
    correct: 0
  }
];

let current = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
  selectedAnswer = null;
  const q = quizData[current];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = () => {
      selectedAnswer = index;

      document.querySelectorAll("#answers button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };

    answersDiv.appendChild(btn);
  });
}

function nextQuestion() {
  if (selectedAnswer === quizData[current].correct) {
    score++;
  }

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    document.body.innerHTML = `<h1>Your Score: ${score}/${quizData.length}</h1>`;
  }
}

loadQuestion();

