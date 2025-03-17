document.addEventListener("DOMContentLoaded", function() {
    // Disable Right-Click for Images
    document.addEventListener("contextmenu", function(event) {
        if (event.target.tagName === "IMG") {
            event.preventDefault();
            alert("Image downloading is disabled.");
        }
    });

    // Scroll animations
    const faders = document.querySelectorAll('.fade-in');

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
});
