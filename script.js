document.addEventListener("DOMContentLoaded", function() {
    // Dark Mode Toggle
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    toggleDarkMode.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        toggleDarkMode.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Smooth Scroll Animation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
