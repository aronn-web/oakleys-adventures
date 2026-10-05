const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const reviewCards = [...document.querySelectorAll('.review-card')];
const prev = document.querySelector('.review-arrow.prev');
const next = document.querySelector('.review-arrow.next');
let reviewIndex = 0;

function showReview(index) {
  reviewCards.forEach((card, i) => card.classList.toggle('active', i === index));
}

prev?.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
  showReview(reviewIndex);
});

next?.addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviewCards.length;
  showReview(reviewIndex);
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

window.addEventListener('scroll', () => {
  let current = 'top';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', target === current || (current === 'top' && target === 'top'));
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
