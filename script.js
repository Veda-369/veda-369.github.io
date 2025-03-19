document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling
    document.querySelectorAll('.navbar ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Flip Card Function
    function flipCard(card) {
        card.classList.toggle('flipped');
    }
    window.flipCard = flipCard;

    // Rotating Title Animation
    const titles = ["Data Analyst", "Data Engineer", "Wildlife Photographer"];
    let index = 0;
    setInterval(() => {
        document.querySelector('.title-rotation').innerText = titles[index];
        index = (index + 1) % titles.length;
    }, 2000);
});
