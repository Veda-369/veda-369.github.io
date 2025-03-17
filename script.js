document.addEventListener("DOMContentLoaded", function() {
    const toggleDarkMode = document.getElementById("toggleDarkMode");

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleDarkMode.textContent = "☀️";
    }

    // Toggle Dark Mode
    toggleDarkMode.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleDarkMode.textContent = "☀️";
            localStorage.setItem("darkMode", "enabled");
        } else {
            toggleDarkMode.textContent = "🌙";
            localStorage.setItem("darkMode", "disabled");
        }
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
