document.addEventListener("DOMContentLoaded", function() {
    // Animation on scroll
    const faders = document.querySelectorAll('.fade-in');

    faders.forEach(fader => {
        fader.classList.add("visible"); // Ensure all sections become visible
    });

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Contact form submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        fetch("https://formsubmit.co/V.Bharghav3@Gmail.Com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                this.reset();
            } else {
                alert("There was an error. Please try again.");
            }
        })
        .catch(error => console.log(error));
    });
});
