// Theme switcher
const THEME_KEY = 'am-theme';

function applyTheme(t) {
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeVal === t);
  });
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.themeVal));
});

// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// Inventory filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.car-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Scroll header shrink
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.style.height = '60px';
  } else {
    header.style.height = '72px';
  }
});

// Count-up animation for stats
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCount);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) observer.observe(statsSection);
