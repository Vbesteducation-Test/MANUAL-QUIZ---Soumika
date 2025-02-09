if (performance.navigation.type === 1) { // Detect full page reload
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("currentQuestionIndex");
}

document.addEventListener("DOMContentLoaded", function () {
    let currentQuestionIndex = 0;
    let questions = [];
    let selectedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {};

    // Retrieve difficulty from localStorage and set timer
    let difficulty = localStorage.getItem("difficulty");
    let timeLeft = difficulty === "easy" ? 20 * 60 : difficulty === "medium" ? 25 * 60 : 30 * 60; 
    let timerDisplay = document.getElementById("timer");

    function startTimer() {
        let timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time is up! Submitting the quiz.");
                submitQuiz();
            } else {
                let minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
                let seconds = String(timeLeft % 60).padStart(2, "0");
                timerDisplay.innerText = `${minutes}:${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }
    startTimer();

    // Sample 25 Questions
    questions = Array.from({ length: 25 }, (_, i) => ({
        question: `Question ${i + 1}: What is ${i + 1} + ${i + 1}?`,
        options: [`${i}`, `${i + 1}`, `${(i + 1) * 2}`, `${(i + 1) * 3}`],
        correct: `${(i + 1) * 2}`,
    }));

    function createQuestionNav() {
        let navContainer = document.getElementById("question-nav");
        navContainer.innerHTML = "";

        questions.forEach((_, i) => {
            let btn = document.createElement("button");
            btn.innerText = i + 1;
            btn.classList.add("question-number");
            btn.onclick = () => goToQuestion(i);
            navContainer.appendChild(btn);
        });

        updateNavigationPane(); 
    }
    createQuestionNav();

    function displayQuestion() {
        let questionData = questions[currentQuestionIndex];
        document.getElementById("question-text").innerText = questionData.question;
    
        let optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = "";
    
        questionData.options.forEach(option => {
            let button = document.createElement("button");
            button.classList.add("option-btn");
            button.innerText = option;
    
            // Check if already selected
            if (selectedAnswers[currentQuestionIndex] === option) {
                button.classList.add("selected");
            }
    
            button.addEventListener("click", () => {
                // Update selected answer
                selectedAnswers[currentQuestionIndex] = option;
                localStorage.setItem("quizAnswers", JSON.stringify(selectedAnswers));
    
                // Remove 'selected' class from other buttons
                document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
    
                updateNavigationPane(); // Update navbar color
            });
    
            optionsContainer.appendChild(button);
        });
    
        updateButtons();
        updateNavigationPane();
    }
    

    function updateNavigationPane() {
        let navButtons = document.querySelectorAll(".question-number");
    
        navButtons.forEach((btn, index) => {
            btn.classList.toggle("active", index === currentQuestionIndex);
            
            // If an answer is selected for this question, mark it as answered
            if (selectedAnswers[index]) {
                btn.classList.add("answered");
            } else {
                btn.classList.remove("answered");
            }
        });
    
        // Scroll the active question into view smoothly
        let activeBtn = document.querySelector(".question-number.active");
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function goToQuestion(index) {
        currentQuestionIndex = index;
        displayQuestion();
    }

    function updateButtons() {
        let prevBtn = document.getElementById("prev-btn");
        let nextBtn = document.getElementById("next-btn");
        let submitBtn = document.getElementById("submit-btn");

        prevBtn.style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
        nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
        submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";

        prevBtn.disabled = currentQuestionIndex === 0;
    }

    function submitQuiz() {
        let unanswered = questions.length - Object.keys(selectedAnswers).length;
        
        if (unanswered > 0) {
            alert(`You have ${unanswered} unanswered questions! Please answer them before submitting.`);
            return;
        }

        let confirmSubmit = confirm("Are you sure you want to submit the quiz?");
        if (confirmSubmit) {
            alert("Quiz Submitted!");
            window.location.href = "result.html";
        }
    }

    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    document.getElementById("prev-btn").addEventListener("click", prevQuestion);
    document.getElementById("submit-btn").addEventListener("click", submitQuiz);

    displayQuestion(); 
});
