// Theme toggle (persists per-browser via localStorage)
(function () {
  const root = document.documentElement;
  const saved = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
  if (saved) root.setAttribute('data-theme', saved);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();

// Reveal-on-scroll
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

// Project filter tabs
(function () {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!chips.length) return;
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        card.classList.toggle('filtered-out', !show);
      });
    });
  });
})();

// Gimbal simulator
(function () {
  const azSlider = document.getElementById('az-slider');
  const elSlider = document.getElementById('el-slider');
  const azVal = document.getElementById('az-val');
  const elVal = document.getElementById('el-val');
  const azGroup = document.getElementById('gimbal-az');
  const elGroup = document.getElementById('gimbal-el');
  const gearAz = document.getElementById('gimbal-gear-az');
  const sweepBtn = document.getElementById('sweep-toggle');
  if (!azSlider || !elSlider) return;

  let gearSpin = 0;
  function render() {
    const az = Number(azSlider.value);
    const el = Number(elSlider.value);
    azVal.textContent = az + '°';
    elVal.textContent = el + '°';
    azGroup.style.transform = `rotate(${az}deg)`;
    elGroup.style.transform = `rotate(${-el}deg)`;
    gearSpin = az * 4;
    gearAz.style.transform = `rotate(${gearSpin}deg)`;
  }
  azSlider.addEventListener('input', render);
  elSlider.addEventListener('input', render);
  render();

  let sweeping = false, raf = null, t = 0;
  function sweepStep() {
    t += 0.02;
    azSlider.value = Math.round(Math.sin(t) * 85);
    elSlider.value = Math.round(Math.sin(t * 1.7) * 40);
    render();
    raf = requestAnimationFrame(sweepStep);
  }
  if (sweepBtn) {
    sweepBtn.addEventListener('click', () => {
      sweeping = !sweeping;
      sweepBtn.textContent = sweeping ? '■ Stop Sweep Demo' : '▶ Run Sweep Demo';
      azSlider.disabled = sweeping;
      elSlider.disabled = sweeping;
      if (sweeping) { sweepStep(); } else { cancelAnimationFrame(raf); }
    });
  }
})();

// Lightbox for placeholder/real gallery images
(function () {
  const items = document.querySelectorAll('.gallery .ph, .gallery img');
  if (!items.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <div class="lightbox-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
      <div id="lightbox-label">Photo slot</div>
      <div style="margin-top:8px;color:var(--text-faint);font-size:.78rem;">Drop the real photo into this project's assets/images/ folder and it'll show here.</div>
    </div>`;
  document.body.appendChild(overlay);
  const label = overlay.querySelector('#lightbox-label');

  function close() { overlay.classList.remove('open'); }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  items.forEach(item => {
    item.style.cursor = 'pointer';
    const open = () => {
      label.textContent = item.textContent.trim() || 'Photo slot';
      overlay.classList.add('open');
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
})();

// Footer year
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
