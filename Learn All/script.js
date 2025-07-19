document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = card.getAttribute('href');
    });
});