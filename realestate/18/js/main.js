/* ============================================
   SHTUKA.AA — Core Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const accordions = document.querySelectorAll('.accordion');
  const reveals = document.querySelectorAll('.reveal');

  // ── Header scroll effect ──
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ──
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Accordion ──
  accordions.forEach(acc => {
    const trigger = acc.querySelector('.accordion__trigger');
    trigger.addEventListener('click', () => {
      const isOpen = acc.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));
});
