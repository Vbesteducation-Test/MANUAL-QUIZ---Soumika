document.getElementById('education').addEventListener('change', function() {
    let schoolGroup = document.getElementById('school-group');
    let collegeGroup = document.getElementById('college-group');
    let collegeIdGroup = document.getElementById('college-id-group');

    // Hide both fields initially
    schoolGroup.classList.add('hidden');
    collegeGroup.classList.add('hidden');
    collegeIdGroup.classList.add('hidden');

    // Show relevant fields based on selection
    if (this.value === 'school') {
        schoolGroup.classList.remove('hidden');
    } else if (this.value === 'college') {
        collegeGroup.classList.remove('hidden');
        collegeIdGroup.classList.remove('hidden');
    }
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show alert (optional)
    alert('Registration Successful! Redirecting to Quiz Page...');
    
    // Redirect to quizdetails.html
    window.location.href = "quizdetails.html";
});