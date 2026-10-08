// Live Attenuation Calculator: E = (1 - a)^n
(function () {
  const tissue = document.getElementById('att-tissue');
  const depth = document.getElementById('att-depth');
  const result = document.getElementById('att-result');
  const bar = document.getElementById('att-bar');
  if (!tissue || !depth) return;

  function compute() {
    const a = parseFloat(tissue.value);
    const n = Math.max(0, parseFloat(depth.value) || 0);
    const e = Math.pow(1 - a, n) * 100;
    result.textContent = e.toFixed(1) + '%';
    bar.style.width = Math.min(100, Math.max(0, e)) + '%';
  }
  tissue.addEventListener('input', compute);
  depth.addEventListener('input', compute);
  compute();
})();

// Live Thermal Rise Calculator: Q = m*c*deltaT  ->  deltaT = (P*t) / (m*c)
(function () {
  const tissue = document.getElementById('th-tissue');
  const power = document.getElementById('th-power');
  const time = document.getElementById('th-time');
  const mass = document.getElementById('th-mass');
  const result = document.getElementById('th-result');
  const qOut = document.getElementById('th-q');
  if (!tissue || !power) return;

  function compute() {
    const c = parseFloat(tissue.value);
    const P = parseFloat(power.value) || 0;
    const t = parseFloat(time.value) || 0;
    const m = Math.max(0.0001, parseFloat(mass.value) || 0.0001);
    const q = P * t;
    const dT = q / (m * c);
    qOut.textContent = q.toFixed(1);
    result.textContent = dT.toFixed(1) + '°C';
  }
  [tissue, power, time, mass].forEach(el => el.addEventListener('input', compute));
  compute();
})();
