document.addEventListener("DOMContentLoaded", function () {
    resetDropdowns(); // Ensure all dropdowns start with "Select" options
});

// Subject Data Based on Class
const subjectsData = {
    "11": ["Mathematics", "Physics", "Chemistry"],
    "12": ["Mathematics", "Physics", "Chemistry", "Biology"]
};

// Chapters Data Based on Subject
const chaptersData = {
    "Mathematics": ["Algebra", "Calculus", "Geometry"],
    "Physics": ["Kinematics", "Thermodynamics", "Electromagnetism"],
    "Chemistry": ["Organic Chemistry", "Physical Chemistry", "Inorganic Chemistry"],
    "Biology": ["Genetics", "Human Physiology", "Ecology"]
};

// Topics Data Based on Chapter
const topicsData = {
    "Algebra": ["Quadratic Equations", "Probability", "Polynomials"],
    "Calculus": ["Differentiation", "Integration", "Limits"],
    "Geometry": ["Circles", "Triangles", "Coordinate Geometry"],
    "Kinematics": ["Motion in 1D", "Projectile Motion"],
    "Thermodynamics": ["Laws of Thermodynamics", "Heat Transfer"],
    "Electromagnetism": ["Electric Fields", "Magnetism"],
    "Organic Chemistry": ["Hydrocarbons", "Alcohols"],
    "Physical Chemistry": ["Equilibrium", "Kinetics"],
    "Inorganic Chemistry": ["Periodic Table", "Chemical Bonding"],
    "Genetics": ["DNA Structure", "Mendel’s Laws"],
    "Human Physiology": ["Nervous System", "Digestive System"],
    "Ecology": ["Ecosystems", "Biodiversity"]
};

// Reset dropdowns to default state
function resetDropdowns() {
    document.getElementById("subject").innerHTML = `<option value="" selected disabled>Select Subject</option>`;
    document.getElementById("chapter").innerHTML = `<option value="" selected disabled>Select Chapter</option>`;
    document.getElementById("topic").innerHTML = `<option value="" selected disabled>Select Topic</option>`;
    document.getElementById("difficulty").value = "";
    document.getElementById("quiz-time").style.display = "none";
}

// Update Subjects Based on Selected Class
function updateSubjects() {
    const classSelected = document.getElementById("class").value;
    const subjectDropdown = document.getElementById("subject");
    
    if (classSelected) {
        subjectDropdown.innerHTML = `<option value="" selected disabled>Select Subject</option>` + 
            subjectsData[classSelected].map(subject => `<option value="${subject}">${subject}</option>`).join("");
    } else {
        resetDropdowns();
    }

    updateChapters(); // Reset chapters & topics when class changes
}

// Update Chapters Based on Selected Subject
function updateChapters() {
    const subjectSelected = document.getElementById("subject").value;
    const chapterDropdown = document.getElementById("chapter");

    if (subjectSelected) {
        chapterDropdown.innerHTML = `<option value="" selected disabled>Select Chapter</option>` + 
            chaptersData[subjectSelected].map(chapter => `<option value="${chapter}">${chapter}</option>`).join("");
    } else {
        document.getElementById("chapter").innerHTML = `<option value="" selected disabled>Select Chapter</option>`;
        document.getElementById("topic").innerHTML = `<option value="" selected disabled>Select Topic</option>`;
    }

    updateTopics(); // Reset topics when subject changes
}

// Update Topics Based on Selected Chapter
function updateTopics() {
    const chapterSelected = document.getElementById("chapter").value;
    const topicDropdown = document.getElementById("topic");

    if (chapterSelected) {
        topicDropdown.innerHTML = `<option value="" selected disabled>Select Topic</option>` + 
            topicsData[chapterSelected].map(topic => `<option value="${topic}">${topic}</option>`).join("");
    } else {
        document.getElementById("topic").innerHTML = `<option value="" selected disabled>Select Topic</option>`;
    }
}

// Calculate and Display Quiz Time Based on Difficulty
function calculateTime() {
    const difficulty = document.getElementById("difficulty").value;
    const timeElement = document.getElementById("quiz-time");

    if (difficulty) {
        let time = 25; // Default time
        if (difficulty === "easy") time = 20;
        else if (difficulty === "medium") time = 25;
        else if (difficulty === "hard") time = 30;

        timeElement.innerText = time + " minutes";
        timeElement.style.display = "block"; // Show time only after difficulty is selected
    } else {
        timeElement.style.display = "none"; // Hide time if no difficulty is selected
    }
}


document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get selected values
    const exam = document.getElementById("exam").value;
    const classSelected = document.getElementById("class").value;
    const subject = document.getElementById("subject").value;
    const chapter = document.getElementById("chapter").value;
    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;
    const questions = 25; // Fixed number of questions

    // Store values in localStorage to pass to next page
    localStorage.setItem("exam", exam);
    localStorage.setItem("class", classSelected);
    localStorage.setItem("subject", subject);
    localStorage.setItem("chapter", chapter);
    localStorage.setItem("topic", topic);
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("questions", questions);

    // Redirect to summary page
    window.location.href = "summary.html";
});
