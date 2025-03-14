document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scrolling
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

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    });

    // Contact Form
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        fetch("https://formsubmit.co/V.Bharghav3@Gmail.Com", { method: "POST", body: new FormData(this) })
        .then(response => alert(response.ok ? "✅ Message sent successfully!" : "❌ Error. Try again."))
        .catch(error => console.log(error));
    });
});
