// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navDrawer').classList.toggle('open');
}
document.addEventListener('click', e => {
  const drawer = document.getElementById('navDrawer');
  const ham = document.querySelector('.hamburger');
  if (drawer && ham && !drawer.contains(e.target) && !ham.contains(e.target)) {
    drawer.classList.remove('open');
  }
});

// Active nav link
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a, .nav-drawer a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Counter animation
function animateCount(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const dur = 1800;
  const steps = 60;
  const inc = target / steps;
  let cur = 0, i = 0;
  const t = setInterval(() => {
    i++;
    cur = Math.min(cur + inc, target);
    el.textContent = (i === steps ? target : Math.floor(cur)) + suffix;
    if (i >= steps) clearInterval(t);
  }, dur / steps);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = 1;
      animateCount(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => cntObs.observe(el));

// Particle system
function buildParticles() {
  const c = document.querySelector('.particles');
  if (!c) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 28 + 8;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*18+10}s;animation-delay:${Math.random()*12}s;opacity:${Math.random()*.25+.05};`;
    c.appendChild(p);
  }
}
buildParticles();

// Contact form
const form = document.getElementById('inquiryForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg,#1a6b2a,#2d9e40)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
}
