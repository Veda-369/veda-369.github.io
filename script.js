document.addEventListener("DOMContentLoaded", function () {
    // Fading Sentence Animation
    const sentences = [
        "I specialize in transforming raw data into insights.",
        "Building scalable pipelines for real-time processing.",
        "Bringing AI and cloud technologies together for impact."
    ];
    let sentenceIndex = 0;
    const summaryText = document.querySelector(".fading-summary");

    function cycleSentences() {
        summaryText.style.opacity = 0;
        setTimeout(() => {
            summaryText.innerText = sentences[sentenceIndex];
            summaryText.style.opacity = 1;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
        }, 500);
    }
    setInterval(cycleSentences, 4000);

    // Full-Sentence Highlight Animation
    let summaryHighlight = document.querySelector('.animated-summary');
    setTimeout(() => {
        summaryHighlight.style.opacity = "1";
    }, 500);
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

// Form Validation
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
