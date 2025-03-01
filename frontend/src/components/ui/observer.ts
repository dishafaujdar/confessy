export function setupIntersectionObserver() {
    const fadeTexts = document.querySelectorAll('.fade-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
            } else {
                entry.target.classList.remove('opacity-100');
            }
        });
    }, { threshold: 0.5 });

    fadeTexts.forEach((text) => observer.observe(text));
}

