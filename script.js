document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ScrollReveal Animations
    ScrollReveal().reveal('.service-item', { 
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        interval: 200
    });

    ScrollReveal().reveal('.portfolio-item', { 
        delay: 200,
        distance: '50px',
        origin: 'left',
        interval: 200
    });

    ScrollReveal().reveal('.about-content', { 
        delay: 200,
        distance: '50px',
        origin: 'right'
    });

    ScrollReveal().reveal('.testimonial-item', { 
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        interval: 200
    });

    // Form Submission (replace with actual form handling)
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        form.reset();
    });

});