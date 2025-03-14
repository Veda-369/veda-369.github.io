document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    });

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");

    // Check Local Storage for theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";
        }
    });

    // Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("https://formsubmit.co/V.Bharghav3@Gmail.Com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            alert(response.ok 
