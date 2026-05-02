const quizData = [
  {
    question: "Who said I love you first?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What was the exact first thing they talked about on their very first conversation?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What’s the couple's dream travel destination?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What was the first movie or series they watched together?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "Where did the couple's go to on their first date?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "Who is more likely to apologize first after an argument?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What’s the couple’s favorite shared food or meal?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What’s the couple’s favorite movie or genre to watch together?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "Who takes longer to get ready when going out?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What’s their favorite place to hang out together?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "Where did they have their most memorable date?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What year did they officially start dating?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "How did the couple first meet?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What’s something they both enjoy doing on weekends?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  },
   {
    question: "What color theme best represents their relationship?",
    answers: ["Him", "Her", "Both"],
    correct: 0
  }
];

let current = 0;
let score = 0;
let selectedAnswer = null;
let playerName = "";
let playerID = Math.floor(Math.random() * 10000);

function startQuiz() {
  const input = document.getElementById("username").value;

  if (!input) {
    alert("Please enter your name");
    return;
    }

  playerName = input + "_" + playerID;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  loadQuestion();
}

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

  if (selectedAnswer === null) {
    alert("Please select an answer");
    return;
      }

  if (selectedAnswer === quizData[current].correct) {
    score++;
  }

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: playerName, score: score });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    leaderboard.sort((a, b) => b.score - a.score);

    let top = leaderboard.slice(0, 5);

    let list = top.map((p, i) => {
      let medal = "";
      let className = "";

      if (i === 0) { medal = "🥇"; className = "gold"; }
      else if (i === 1) { medal = "🥈"; className = "silver"; }
      else if (i === 2) { medal = "🥉"; className = "bronze"; }

      return `<p class="${className}">${medal} ${p.name} - ${p.score}</p>`;
    }).join("");

    document.getElementById("quiz-container").innerHTML = `
      <div class="card leaderboard">
        <h1>🏆 Leaderboard</h1>
        ${list}
      </div>
    `;
      }
}