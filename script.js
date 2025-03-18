// Smooth Scroll Effect for Sections
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Section Fade-in Animation
const sections = document.querySelectorAll("section");

const revealSection = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 50) {
            section.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealSection);
document.addEventListener("DOMContentLoaded", revealSection);

// Form Validation & CAPTCHA
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    let captchaResponse = document.querySelector(".h-captcha").getAttribute("data-hcaptcha-response");

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!captchaResponse) {
        alert("Please complete the CAPTCHA.");
        return;
    }

    alert("Your message has been sent successfully!");
    document.getElementById('contact-form').reset();
});
