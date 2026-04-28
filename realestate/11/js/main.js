document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = menuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(5px)';
                spans[1].style.transform = 'rotate(-45deg) translateY(-5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    });

    // Testimonial slider functionality (Mobile)
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider) {
        // Dot tracking
        if (dots.length > 0) {
            slider.addEventListener('scroll', () => {
                let index = Math.round(slider.scrollLeft / slider.offsetWidth);
                index = Math.max(0, Math.min(index, dots.length - 1));

                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            });

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    slider.scrollTo({
                        left: slider.offsetWidth * i,
                        behavior: 'smooth'
                    });
                });
            });
        }

        // Arrow Buttons tracking
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
            });
        }
    }
});
