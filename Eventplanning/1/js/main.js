/* ============================================
   SAVANNAH EVENTS - MAIN JAVASCRIPT
   Mobile Menu | Smooth Scroll | Form Handling
   Service Pre-selection | Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navList.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // SERVICE PRE-SELECTION FROM URL
    // ==========================================
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        const preselectedService = getUrlParam('service');
        if (preselectedService) {
            const optionExists = Array.from(serviceSelect.options).some(opt => opt.value === preselectedService);
            if (optionExists) {
                serviceSelect.value = preselectedService;
                serviceSelect.style.borderColor = 'var(--color-charcoal-light)';
                serviceSelect.style.backgroundColor = 'var(--color-white)';
            }
        }
    }

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            const requiredFields = ['firstName', 'lastName', 'email', 'message'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (!isValid) {
                contactForm.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Simulate submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#25D366';
                submitBtn.style.borderColor = '#25D366';

                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = '<p style="color: #25D366; text-align: center; margin-top: 16px; font-size: 0.9rem;">Thank you! We will be in touch within 24 hours.</p>';
                contactForm.appendChild(successMsg);

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.opacity = '1';
                    contactForm.reset();
                    if (successMsg.parentNode) {
                        successMsg.remove();
                    }
                }, 4000);
            }, 1500);
        });
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.work-item, .service-block, .team-member, .about-stats, .contact-form-block, .blog-card, .portfolio-item, .additional-item'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ==========================================
    // WHATSAPP BUTTON CLICK TRACKING
    // ==========================================
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp CTA clicked');
        });
    }

    // ==========================================
    // SHAKE ANIMATION KEYFRAMES
    // ==========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

});
