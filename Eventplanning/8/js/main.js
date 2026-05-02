/* ============================================
   ELLA JENNIS EVENT PLANNING - MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SERVICE ACCORDION (Services Page)
    // ============================================
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-item-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all
                serviceItems.forEach(i => i.classList.remove('active'));
                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ============================================
    // GALLERY FILTER
    // ============================================
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let visibleGalleryItems = [];

    function updateVisibleItems() {
        visibleGalleryItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImage) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                currentImageIndex = visibleGalleryItems.indexOf(item);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function showImage(index) {
        if (visibleGalleryItems.length === 0) return;
        if (index < 0) index = visibleGalleryItems.length - 1;
        if (index >= visibleGalleryItems.length) index = 0;

        currentImageIndex = index;
        const img = visibleGalleryItems[index].querySelector('img');
        if (img && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => showImage(currentImageIndex + 1));
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
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
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // FORM VALIDATION
    // ============================================
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '';
                }
            });

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#e74c3c';
                }
            }

            if (!isValid) {
                e.preventDefault();
                // Show error message
                const errorMsg = form.querySelector('.form-error') || document.createElement('div');
                errorMsg.className = 'form-error';
                errorMsg.style.cssText = 'color: #e74c3c; margin-top: 1rem; font-size: 0.9rem; text-align: center;';
                errorMsg.textContent = 'Please fill in all required fields correctly.';
                if (!form.querySelector('.form-error')) {
                    form.appendChild(errorMsg);
                }
            } else {
                // Remove error message if exists
                const errorMsg = form.querySelector('.form-error');
                if (errorMsg) errorMsg.remove();
            }
        });
    });

    // ============================================
    // WHATSAPP FLOAT BUTTON
    // ============================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            // The href should already be set in HTML
            // This just adds tracking if needed
            console.log('WhatsApp clicked');
        });
    }

    // ============================================
    // PROCESS NAVIGATION
    // ============================================
    const processNavBtns = document.querySelectorAll('.process-nav-btn');
    processNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const direction = this.dataset.direction;
            const steps = document.querySelectorAll('.process-step');
            // Add rotation animation
            steps.forEach(step => {
                step.style.opacity = '0';
                step.style.transform = direction === 'prev' ? 'translateX(-20px)' : 'translateX(20px)';
            });
            setTimeout(() => {
                steps.forEach(step => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                });
            }, 300);
        });
    });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

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
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    console.log('Ella Jennis Event Planning - Website Loaded');
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
// BOOKING FORM HANDLER
// ============================================
function handleBookingSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    console.log('Booking Data:', data);

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 1.5rem;
        margin-top: 1rem;
        text-align: center;
        border: 1px solid #c3e6cb;
    `;
    successMsg.innerHTML = `
        <strong>Thank you!</strong><br>
        Your booking request has been received. We will contact you within 24 hours.
    `;

    form.appendChild(successMsg);
    form.reset();

    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// ============================================
// CONTACT FORM HANDLER
// ============================================
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 1.5rem;
        margin-top: 1rem;
        text-align: center;
        border: 1px solid #c3e6cb;
    `;
    successMsg.innerHTML = `
        <strong>Message Sent!</strong><br>
        Thank you for reaching out. We'll get back to you soon.
    `;

    form.appendChild(successMsg);
    form.reset();

    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}
