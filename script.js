// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Expand Project Details on Click
function toggleProjectDetails(project) {
    let details = project.querySelector('.hidden-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        project.style.height = 'auto';
    } else {
        details.style.display = 'none';
    }
}

// Form Validation & hCaptcha
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let captchaResponse = document.querySelector('.h-captcha').getAttribute('data-hcaptcha-response');

    if (!captchaResponse) {
        alert('Please complete the CAPTCHA.');
        return;
    }

    alert('Your message has been sent successfully!');
    document.getElementById('contact-form').reset();
});
