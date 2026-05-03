const quizData = [
  {
    question: "Who said I love you first?",
    answers: ["Him", "Her", "Both"],
    correct: 1
  },
   {
    question: "What was the exact first thing they talked about on their very first conversation?",
    answers: ["His Studies", "Her Studies", "Both"],
    correct: 1
  },
   {
    question: "What’s the couple's dream travel destination?",
    answers: ["USA & China", "Italy & Spain", "Both"],
    correct: 0
  },
   {
    question: "What was the first movie or series they watched together?",
    answers: ["The Royal Treatment", "Bridgerton", "Pride and Prejudice"],
    correct: 0
  },
   {
    question: "Where did the couple's go to on their first date?",
    answers: ["A Restaurant", "The Beach", "His Place"],
    correct: 2
  },
   {
    question: "Who is more likely to apologize first after an argument?",
    answers: ["Him", "Her", "Both"],
    correct: 2
  },
   {
    question: "What’s the couple’s favorite shared food or meal?",
    answers: ["Toasted Bread and Tea", "Jollof Rice and Chicken", "Noodles with Egg"],
    correct: 0
  },
   {
    question: "What’s the couple’s favorite movie or genre to watch together?",
    answers: ["XO kitty", "Lucifer", "Wednesday"],
    correct: 1
  },
   {
    question: "Who takes longer to get ready when going out?",
    answers: ["Him", "Her", "Both"],
    correct: 1
  },
   {
    question: "What’s their favorite place to hang out together?",
    answers: ["At Home", "Domino's", "Cinema"],
    correct: 1
  },
   {
    question: "Where did they have their most memorable date?",
    answers: ["The Beach", "Labule Restaurant", "Concert"],
    correct: 1
  },
   {
    question: "What year did they officially start dating?",
    answers: ["2023", "2022", "2024"],
    correct: 2
  },
   {
    question: "How did the couple first meet?",
    answers: ["In an Outing", "On Campus", "On the Roadside"],
    correct: 2
  },
   {
    question: "What’s something they both enjoy doing on weekends?",
    answers: ["House Chores and Icecream", "Going Out", "Watching Movies"],
    correct: 0
  },
   {
    question: "What color theme best represents their relationship?",
    answers: ["Pink", "Blue", "Rose Red"],
    correct: 1
  }
];

let current = 0;
let score = 0;
let selectedAnswer = null;
let playerName = "";
let playerID = Math.floor(Math.random() * 10000);

function saveScore(name, score) {
  const { collection, addDoc } = window.fb;

  return addDoc(collection(window.db, "leaderboard"), {
    name: name,
    score: score,
    time: Date.now()
  });
}

function loadLeaderboard() {
  const { collection, query, orderBy, onSnapshot } = window.fb;

  const q = query(
    collection(window.db, "leaderboard"),
    orderBy("score", "desc")
  );

  onSnapshot(q, (snapshot) => {
    let data = [];

    snapshot.forEach(doc => {
      data.push(doc.data());
    });

    renderLeaderboard(data);
  });
}

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

function renderLeaderboard(data) {
  const container = document.getElementById("leaderboard");

  if (!container) return;

  container.innerHTML = "";

  data.forEach((user, i) => {
    let medal = "";

    if (i === 0) medal = "🥇";
    else if (i === 1) medal = "🥈";
    else if (i === 2) medal = "🥉";

    container.innerHTML += `
      <div>
        <h3>${medal} ${user.name}</h3>
        <p>Score: ${user.score}</p>
      </div>
    `;
  });
}

window.onload = function () {
  loadLeaderboard();
};