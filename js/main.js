// LunarSpark - behaviour shared by every page

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// keep sticky bars below the header, whatever its height
const header = $('.top');
function setHeaderHeight() {
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
}
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);

// ---- scroll progress bar ----
const progressBar = $('#bar');
window.addEventListener('scroll', () => {
  const scrollable = Math.max(1, document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = (window.scrollY / scrollable) * 100 + '%';
});

// ---- soft glow that follows the pointer ----
const glow = $('#glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ---- twinkling star background ----
const canvas = $('#stars');
const ctx = canvas.getContext('2d');
let stars = [];

function makeStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 170; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4,
      speed: Math.random() * 0.3 + 0.05,
      phase: Math.random() * 6
    });
  }
}

function drawStars(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  stars.forEach((star) => {
    star.y = (star.y + star.speed) % canvas.height;
    ctx.globalAlpha = 0.35 + 0.5 * Math.sin(time / 700 + star.phase);
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  requestAnimationFrame(drawStars);
}

makeStars();
window.addEventListener('resize', makeStars);
requestAnimationFrame(drawStars);

// ---- mobile menu ----
const burger = $('.burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
});

// ---- fade-in on scroll, plus number counters ----
function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / 1400);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    revealObserver.unobserve(entry.target);
    const counter = $('[data-count]', entry.target);
    if (counter) countUp(counter);
  });
}, { threshold: 0.15 });

$$('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ---- 3D tilt on cards and tiles ----
$$('.card, .tile').forEach((item) => {
  item.addEventListener('pointermove', (e) => {
    const box = item.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    item.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  });
  item.addEventListener('pointerleave', () => {
    item.style.transform = '';
  });
});

// ---- "last signal" ticker on the home page ----
const ticker = $('#tick');
if (ticker && typeof machines !== 'undefined') {
  const byYear = [...machines].sort((a, b) => a.year - b.year);
  let index = 0;
  function showNext() {
    const m = byYear[index % byYear.length];
    ticker.textContent = `${m.name}, ${m.year}. ${m.note}`;
    index++;
  }
  showNext();
  setInterval(showNext, 3200);
}
