let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

async function fetchQuestions() {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.classList.add("active");
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=3&type=multiple");
    if (!response.ok) throw new Error("Failed to fetch questions");
    const data = await response.json();
    questions = data.results.map(q => ({
      question: q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
      options: [...q.incorrect_answers, q.correct_answer]
        .map(a => a.replace(/&quot;/g, '"').replace(/&#039;/g, "'"))
        .sort(() => Math.random() - 0.5),
      answer: q.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    }));
    selectedAnswers = new Array(questions.length).fill(null);
    loadingDiv.classList.remove("active");
    loadQuestion();
  } catch (error) {
    console.error(error);
    loadingDiv.innerText = "Error loading questions. Please try again.";
  }
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option;
    btn.onclick = () => selectOption(option);
    if (selectedAnswers[currentQuestion] === option) {
      btn.style.background = "#007bff";
      btn.style.color = "white";
    }
    optionsDiv.appendChild(btn);
  });
  document.getElementById("result").innerText = "";
  document.getElementById("next-btn").disabled = selectedAnswers[currentQuestion] === null;
  document.getElementById("back-btn").disabled = currentQuestion === 0;
}

function selectOption(selected) {
  const q = questions[currentQuestion];
  if (selectedAnswers[currentQuestion] === q.answer && selectedAnswers[currentQuestion] !== null) {
    score--;
  }
  selectedAnswers[currentQuestion] = selected;
  if (selected === q.answer) {
    score++;
    document.getElementById("result").innerText = "Correct!";
  } else {
    document.getElementById("result").innerText = `Wrong! The correct answer is ${q.answer}.`;
  }
  document.querySelectorAll(".option").forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === q.answer) {
      btn.style.background = "#28a745";
      btn.style.color = "white";
    } else if (btn.innerText === selected && selected !== q.answer) {
      btn.style.background = "#dc3545";
      btn.style.color = "white";
    }
  });
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("skip-btn").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("result").innerText = `Your score: ${score}/${questions.length}`;
  }
}

function skipQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    nextQuestion();
  }
}

function backQuestion() {
  if (currentQuestion > 0) {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].answer && selectedAnswers[currentQuestion] !== null) {
      score--;
    }
    currentQuestion--;
    loadQuestion();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("back-btn").addEventListener("click", backQuestion);
document.getElementById("toggle-theme-btn").addEventListener("click", toggleTheme);

// Fetch questions on page load
fetchQuestions();