/* ============================================
   MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const currentYearEl = document.getElementById('currentYear');
    const contactForm = document.getElementById('contactForm');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const catalogTrack = document.querySelector('.catalog-track');

    // Set current year
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (menuToggle && navMenu) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        function toggleMenu() {
            const isOpen = navMenu.classList.contains('open');

            if (isOpen) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('open');
                menuToggle.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // Catalog carousel
    if (catalogTrack && prevBtn && nextBtn) {
        let scrollPosition = 0;
        const cardWidth = catalogTrack.children[0]?.offsetWidth + 16 || 316; // width + gap
        const maxScroll = catalogTrack.scrollWidth - catalogTrack.parentElement.offsetWidth;

        function updateCarousel(direction) {
            if (direction === 'next') {
                scrollPosition = Math.min(scrollPosition + cardWidth, maxScroll);
            } else {
                scrollPosition = Math.max(scrollPosition - cardWidth, 0);
            }
            catalogTrack.style.transform = `translateX(-${scrollPosition}px)`;
        }

        prevBtn.addEventListener('click', () => updateCarousel('prev'));
        nextBtn.addEventListener('click', () => updateCarousel('next'));

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        catalogTrack.parentElement.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        catalogTrack.parentElement.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    updateCarousel('next');
                } else {
                    updateCarousel('prev');
                }
            }
        }
    }

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Sending...';

            setTimeout(() => {
                alert('Thank you! Your request has been sent. We will contact you shortly.');
                contactForm.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to major sections
    document.querySelectorAll('.feature-card, .catalog-card, .payment-card, .step-card, .team-card, .service-row').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
});