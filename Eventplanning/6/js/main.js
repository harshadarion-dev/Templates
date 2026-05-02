/* ============================================
   BELLE BODAS & EVENTS - MAIN JAVASCRIPT
   Production JS - Mobile First
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---- Mobile Menu Toggle ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Active Navigation Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Animations (Fade In) ----
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

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // ---- Gallery Lightbox ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  const galleryImages = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryImages.push(img.src);
      item.addEventListener('click', () => {
        currentImageIndex = index;
        if (lightboxImg) lightboxImg.src = img.src;
        if (lightbox) lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
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
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // ---- Event Filtering ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  const eventCards = document.querySelectorAll('.event-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      eventCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ---- Package Tabs ----
  const packageTabs = document.querySelectorAll('.package-tab');
  const packageContents = document.querySelectorAll('.package-content');

  packageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      packageTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      packageContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });
    });
  });

  // ---- Form Validation ----
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll('[required]').forEach(field => {
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#e74c3c';
        }
      }

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
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Sticky CTA for Mobile ----
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta && window.innerWidth <= 768) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 300) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }

      lastScroll = currentScroll;
    });
  }

  // ---- Parallax Effect (subtle) ----
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length > 0 && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const rect = el.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${rate}px)`;
        }
      });
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ---- Lazy Loading Images ----
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

  // ---- Testimonial Slider ----
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }

    showSlide(currentSlide);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    // Auto-advance
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);
  }

  // ---- Service Detail Dynamic Content ----
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  if (serviceId && document.querySelector('[data-service-content]')) {
    const serviceData = {
      'wedding-planning': {
        title: 'Wedding Planning',
        subtitle: 'Full-Service Wedding Coordination',
        description: 'From intimate gatherings to grand celebrations, we create weddings that reflect your unique love story. Our comprehensive wedding planning services cover every detail.',
        features: ['Venue Selection & Management', 'Vendor Coordination', 'Timeline Creation', 'Budget Management', 'Design & Styling', 'Day-of Coordination']
      },
      'corporate-events': {
        title: 'Corporate Events',
        subtitle: 'Professional Event Management',
        description: 'Elevate your corporate gatherings with our professional event management services. From conferences to gala dinners, we deliver excellence.',
        features: ['Event Strategy', 'Venue Sourcing', 'AV Production', 'Catering Coordination', 'Guest Management', 'Post-Event Analysis']
      },
      'birthday-events': {
        title: 'Birthday Celebrations',
        subtitle: 'Milestone Moments',
        description: 'Celebrate life\'s special moments with unforgettable birthday events. From sweet sixteen to golden anniversaries, we make every birthday extraordinary.',
        features: ['Theme Development', 'Entertainment Booking', 'Decor Design', 'Cake & Catering', 'Photography', 'Party Favors']
      }
    };

    const data = serviceData[serviceId];
    if (data) {
      document.querySelectorAll('[data-service-title]').forEach(el => el.textContent = data.title);
      document.querySelectorAll('[data-service-subtitle]').forEach(el => el.textContent = data.subtitle);
      document.querySelectorAll('[data-service-desc]').forEach(el => el.textContent = data.description);

      const featuresList = document.querySelector('[data-service-features]');
      if (featuresList) {
        featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
      }
    }
  }

  // ---- Back to Top Button ----
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log('✨ Belle Bodas & Events - Website Initialized');
});
