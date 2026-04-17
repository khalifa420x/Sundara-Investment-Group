(function () {
  'use strict';

  /* ── Custom cursor ── */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ── Nav scroll behaviour ── */
  const nav = document.getElementById('nav');
  const scrollThreshold = 60;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = sy;
  }, { passive: true });

  /* ── Hamburger / mobile menu ── */
  const hamburger    = document.getElementById('hamburger');
  const navMobile    = document.getElementById('navMobile');
  let mobileOpen = false;

  window.toggleMobile = function () {
    mobileOpen = !mobileOpen;
    hamburger.classList.toggle('open', mobileOpen);
    hamburger.setAttribute('aria-expanded', mobileOpen);
    if (mobileOpen) {
      navMobile.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.closeMobile = function () {
    mobileOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Language toggle ── */
  let currentLang = 'en';
  const langENEl = document.getElementById('langEN');
  const langFREl = document.getElementById('langFR');

  window.toggleLang = function () {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    if (currentLang === 'fr') {
      document.body.classList.add('fr');
      langFREl.classList.add('active-lang');
      langFREl.style.color = 'var(--gold)';
      langENEl.classList.remove('active-lang');
      langENEl.style.color = '';
    } else {
      document.body.classList.remove('fr');
      langENEl.classList.add('active-lang');
      langENEl.style.color = 'var(--gold)';
      langFREl.classList.remove('active-lang');
      langFREl.style.color = '';
    }
  };

  /* ── Scroll reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Parallax on hero & CTA bg ── */
  const heroBg = document.getElementById('heroBg');
  const ctaBg  = document.getElementById('ctaBg');

  function parallax () {
    const sy = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = 'translateY(' + (sy * 0.32) + 'px)';
    }
    const ctaSection = document.getElementById('cta-section');
    if (ctaBg && ctaSection) {
      const rect = ctaSection.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.22;
      ctaBg.style.transform = 'translateY(' + offset + 'px)';
    }
  }

  window.addEventListener('scroll', parallax, { passive: true });
  parallax();

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();

// === SCROLL REVEAL (extended observer for new elements) ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el =>
  revealObserver.observe(el)
);

// === PROCESS STAGGER ===
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, i) => {
  step.classList.add('reveal');
  step.style.transitionDelay = (i * 0.12) + 's';
});

// === STATS COUNTER ANIMATION ===
function animateCounter(el) {
  const target = el.getAttribute('data-target');
  if (!target) return;
  el.textContent = target;
}
document.querySelectorAll('[data-target]').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) animateCounter(el);
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

// === LAZY LOAD IMAGES ===
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('loading', 'lazy');
});

// === MOBILE MENU ===
function openMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on swipe right (mobile gesture)
let touchStartX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  const menu = document.getElementById('mobile-menu');
  if (diff > 80 && menu && menu.classList.contains('open')) {
    closeMobileMenu();
  }
}, { passive: true });

// Close on escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// === CLICK OUTSIDE TO CLOSE MOBILE MENU ===
document.addEventListener('click', function(e) {
  const m = document.getElementById('mobile-menu');
  const btn = document.querySelector('.nav-hamburger, #hamburger');
  if (m && m.classList.contains('open')) {
    if (!m.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeMobileMenu();
    }
  }
});

// === LANGUAGE SETTER (mobile menu) ===
function setLang(lang) {
  localStorage.setItem('sundara-lang', lang);
  if (lang === 'fr') {
    document.body.classList.add('fr');
  } else {
    document.body.classList.remove('fr');
  }
  const langENEl = document.getElementById('langEN');
  const langFREl = document.getElementById('langFR');
  if (langFREl) { langFREl.style.color = lang === 'fr' ? 'var(--gold)' : ''; }
  if (langENEl) { langENEl.style.color = lang === 'en' ? 'var(--gold)' : ''; }
}

window.setLang = setLang;
