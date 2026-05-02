/* ============================================
   ALICE LU EVENTS - Production JavaScript
   Mobile-First Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = '#25D366';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);

            // In production, send to backend:
            // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        });
    }

    // ============================================
    // WHATSAPP BUTTON TRACKING
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Analytics tracking (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_floating_button'
                });
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO IMAGES
    // ============================================
    const heroImages = document.querySelector('.hero-images');

    if (heroImages && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImages.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // ============================================
    // SERVICE CARD HOVER EFFECT
    // ============================================
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // NAVBAR ACTIVE STATE
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ============================================
    // PERFORMANCE: Preload critical resources
    // ============================================
    const preloadLinks = [
        { rel: 'preload', href: 'css/styles.css', as: 'style' },
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap', as: 'style' }
    ];

    preloadLinks.forEach(link => {
        const linkEl = document.createElement('link');
        Object.entries(link).forEach(([key, value]) => {
            linkEl.setAttribute(key, value);
        });
        document.head.appendChild(linkEl);
    });

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// FORM VALIDATION HELPERS
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// ============================================
// COOKIE CONSENT (GDPR Compliance)
// ============================================

function showCookieConsent() {
    if (localStorage.getItem('cookieConsent')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button class="cookie-btn" onclick="acceptCookies()">Accept</button>
        </div>
    `;
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.cookie-banner').remove();
}

// Initialize cookie consent after page load
window.addEventListener('load', showCookieConsent);
