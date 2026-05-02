/* ============================================
   ELLE EVENT PLANNING - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavbar();
  initMobileMenu();
  initTestimonialSlider();
  initLightbox();
  initFAQ();
  initTabs();
  initGalleryFilter();
  initBookingForm();
  initContactForm();
  initNewsletterForm();
  initSmoothScroll();
  initScrollAnimations();
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (!slides.length) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto-advance every 6 seconds
  setInterval(nextSlide, 6000);
}

/* ============================================
   LIGHTBOX
   ============================================ */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');

  let currentIndex = 0;
  const images = Array.from(galleryItems).map(item => item.dataset.lightbox);

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      lightboxImg.src = images[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? showNext() : showPrev();
    }
  });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all others
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ============================================
   TABS
   ============================================ */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');
  if (!tabContainers.length) return;

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ============================================
   GALLERY FILTER
   ============================================ */
function initGalleryFilter() {
  const filterNav = document.querySelector('.filter-nav');
  if (!filterNav) return;

  const filterBtns = filterNav.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================
   BOOKING FORM VALIDATION
   ============================================ */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { name: 'name', required: true },
      { name: 'email', required: true, type: 'email' },
      { name: 'phone', required: true },
      { name: 'eventType', required: true },
      { name: 'eventDate', required: true },
      { name: 'guestCount', required: true },
      { name: 'budget', required: true }
    ];

    fields.forEach(field => {
      const input = form.querySelector(`[name="${field.name}"]`);
      const errorEl = form.querySelector(`[data-error="${field.name}"]`);
      if (!input) return;

      let fieldValid = true;

      if (field.required && !input.value.trim()) {
        fieldValid = false;
      }

      if (field.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) fieldValid = false;
      }

      if (!fieldValid) {
        isValid = false;
        input.style.borderColor = '#c44';
        if (errorEl) errorEl.classList.add('visible');
      } else {
        input.style.borderColor = '';
        if (errorEl) errorEl.classList.remove('visible');
      }
    });

    if (isValid) {
      // Show success message
      const successMsg = form.querySelector('.form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }
  });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#c44';
      } else {
        field.style.borderColor = '';
      }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#c44';
      }
    }

    if (isValid) {
      const successMsg = form.querySelector('.form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }
  });
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email.value)) {
        alert('Thank you for subscribing!');
        form.reset();
      }
    }
  });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function
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

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// WhatsApp link generator
function getWhatsAppLink(phone, message) {
  const encodedMessage = encodeURIComponent(message || 'Hello, I would like to inquire about your event planning services.');
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
