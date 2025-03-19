// Ensure Animations Run on Page Load
document.addEventListener("DOMContentLoaded", function () {
    const animatedText = document.querySelectorAll(".animate-text");
    animatedText.forEach((text, index) => {
        text.style.animationDelay = `${index * 0.3}s`;
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Expand/Collapse Project Details on Click
function toggleProjectDetails(project) {
    let details = project.querySelector('.hidden-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        project.style.height = 'auto';
    } else {
        details.style.display = 'none';
    }
}

// Flip Effect for Project Cards
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Highlight Animation for Summary
document.addEventListener("DOMContentLoaded", function () {
    let highlightedTexts = document.querySelectorAll('.highlight-text span');
    highlightedTexts.forEach((word, index) => {
        setTimeout(() => {
            word.style.color = "#2575fc";
            word.style.fontWeight = "bold";
        }, index * 200);
    });
});

// Form Validation (hCaptcha Removed)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Simple form validation
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert('Your message has been sent successfully!');
    document.getElementById('contact-form').reset();
});
