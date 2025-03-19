// Smooth Scrolling for Navigation
document.querySelectorAll("nav ul li a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Image Hover Effects for Photography Section
const galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach(image => {
    image.addEventListener("mouseenter", () => {
        image.style.transform = "scale(1.1)";
        image.style.transition = "transform 0.3s ease-in-out";
    });
    image.addEventListener("mouseleave", () => {
        image.style.transform = "scale(1)";
    });
});

// Form Validation and hCaptcha
document.getElementById("contact-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let captchaResponse = document.querySelector(".h-captcha")?.getAttribute("data-hcaptcha-response");

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!captchaResponse) {
        alert("Please complete the CAPTCHA.");
        return;
    }

    alert("Your message has been sent successfully!");
    document.getElementById("contact-form").reset();
});

// Project Hover Effect (for More Interactivity)
const projectCards = document.querySelectorAll(".project");
projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.transition = "transform 0.3s ease-in-out";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});
