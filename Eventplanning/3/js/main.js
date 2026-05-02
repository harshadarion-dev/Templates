/**
 * AUDREY — Main JavaScript
 * Mobile Menu | Header Scroll | Form Handling | Animations
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'MESSAGE SENT!';
                submitBtn.style.backgroundColor = '#25D366';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Intersection Observer for Fade-in Animations
    // ==========================================
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.package-row, .service-card, .about-container, .stat, .process-step, .service-detail-container');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ==========================================
// Freebie Download Simulation
// ==========================================
document.querySelectorAll('.freebie-download').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.dataset.title || 'Resource';
        const originalText = this.textContent;

        this.textContent = 'DOWNLOADING...';
        this.style.backgroundColor = '#25D366';

        setTimeout(() => {
            this.textContent = 'DOWNLOADED!';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                alert('Your download for "' + title + '" has started! (Demo mode — no actual file)');
            }, 1500);
        }, 1200);
    });
});

// ==========================================
// Newsletter Form
// ==========================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'SUBSCRIBING...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'SUBSCRIBED!';
            btn.style.backgroundColor = '#25D366';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                this.reset();
            }, 2000);
        }, 1200);
    });
}
