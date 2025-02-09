document.addEventListener("DOMContentLoaded", function () {
    // Retrieve and display quiz details from localStorage
    document.getElementById("summary-exam").innerText = localStorage.getItem("exam") || "Not selected";
    document.getElementById("summary-class").innerText = localStorage.getItem("class") || "Not selected";
    document.getElementById("summary-subject").innerText = localStorage.getItem("subject") || "Not selected";
    document.getElementById("summary-chapter").innerText = localStorage.getItem("chapter") || "Not selected";
    document.getElementById("summary-topic").innerText = localStorage.getItem("topic") || "Not selected";
    document.getElementById("summary-difficulty").innerText = localStorage.getItem("difficulty") || "Not selected";
    document.getElementById("summary-questions").innerText = localStorage.getItem("questions") || "25 (Fixed)";

    // Handle checkbox functionality
    const checkbox = document.getElementById("confirm");
    const startTestBtn = document.getElementById("start-test-btn");

    checkbox.addEventListener("change", function () {
        startTestBtn.style.display = checkbox.checked ? "block" : "none";
    });

    // Redirect to the quiz when "Start Test" is clicked
    startTestBtn.addEventListener("click", function () {
        window.location.href = "quiz.html"; // Change this to your actual quiz page
    });
});
