const quiz = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Markup Language",
      "Home Tool Markup",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: 1,
  },
  {
    question: "Which language makes a website interactive?",
    options: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    answer: 2,
  },
  {
    question: "Bootstrap is a ______ ?",
    options: ["Programming Language", "Framework", "Browser", "Database"],
    answer: 1,
  },
  {
    question: "Which tag is used to insert an image?",
    options: ["<image>", "<img>", "<picture>", "<src>"],
    answer: 1,
  },
  {
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0,
  },
  {
    question: "Which symbol is used for CSS ID selector?",
    options: [".", "#", "*", "&"],
    answer: 1,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Apple", "Netscape", "Google"],
    answer: 2,
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "color", "text-color", "background"],
    answer: 1,
  },
  {
    question: "Which keyword declares a variable?",
    options: ["var", "let", "const", "All of these"],
    answer: 3,
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerText = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  clearInterval(timer);

  timeLeft = 15;

  startTimer();

  question.innerHTML = quiz[currentQuestion].question;

  questionNumber.innerHTML =
    "Question " + (currentQuestion + 1) + " / " + quiz.length;

  progressBar.style.width = ((currentQuestion + 1) / quiz.length) * 100 + "%";

  options.innerHTML = "";

  for (let i = 0; i < quiz[currentQuestion].options.length; i++) {
    let button = document.createElement("button");

    button.textContent = quiz[currentQuestion].options[i];

    button.className = "option";

    button.onclick = function () {
      checkAnswer(i);
    };

    options.appendChild(button);
  }
}

function startTimer() {
  timerText.innerHTML = "⏳ " + timeLeft + " s";

  timer = setInterval(function () {
    timeLeft--;

    timerText.innerHTML = "⏳ " + timeLeft + " s";

    if (timeLeft <= 0) {
      clearInterval(timer);

      let buttons = options.children;

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }

      buttons[quiz[currentQuestion].answer].classList.add("correct");

      setTimeout(function () {
        nextQuestion();
      }, 1500);
    }
  }, 1000);
}

loadQuestion();

function checkAnswer(selected) {
  clearInterval(timer);

  let buttons = options.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  if (selected === quiz[currentQuestion].answer) {
    buttons[selected].classList.add("correct");
    score++;
  } else {
    buttons[selected].classList.add("wrong");
    buttons[quiz[currentQuestion].answer].classList.add("correct");
  }
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);

  let message = "";

  if (score >= 8) {
    message = "🏆 Excellent!";
  } else if (score >= 5) {
    message = "😊 Good Job!";
  } else {
    message = "😔 Keep Practicing!";
  }

  document.querySelector(".quiz-box").innerHTML = `

        <div class="result">

            <h2>🎉 Quiz Completed</h2>

            <h1>${score}/${quiz.length}</h1>

            <p>${message}</p>

            <button class="btn btn-success btn-lg mt-3"
            onclick="restartQuiz()">

            🔄 Restart Quiz

            </button>

        </div>

    `;
}

function restartQuiz() {
  location.reload();
}
