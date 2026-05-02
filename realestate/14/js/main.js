
/* ============================================
   LUXURY REAL ESTATE - PRODUCTION JS
   Mobile-First | Interactions | WhatsApp
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Fade In)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * endValue);

                    target.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = endValue;
                    }
                }

                requestAnimationFrame(updateCounter);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show success message
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#25D366';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);

            console.log('Form submitted:', data);
        });
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // PARALLAX EFFECT (Desktop only)
    // ============================================
    if (window.innerWidth > 768) {
        const parallaxElements = document.querySelectorAll('.parallax');

        window.addEventListener('scroll', function() {
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(window.scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ============================================
    // WHATSAPP BUTTON - Pre-fill message
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        const phoneNumber = '919999999999';
        const message = encodeURIComponent("Hello, I'd like to know more about your services.");
        whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
    }

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // GALLERY LIGHTBOX (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.95);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;

                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 4px;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                `;

                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);

                // Animate in
                requestAnimationFrame(() => {
                    lightbox.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                });

                // Close on click
                lightbox.addEventListener('click', function() {
                    lightbox.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.9)';
                    setTimeout(() => lightbox.remove(), 300);
                });
            }
        });
    });

});
