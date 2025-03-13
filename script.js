document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling
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

    // Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("https://formsubmit.co/V.Bharghav3@Gmail.Com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            alert(response.ok ? "Message sent successfully!" : "Error. Try again.");
            this.reset();
        })
        .catch(error => console.log(error));
    });
});
