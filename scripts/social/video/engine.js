/* Deterministic scene engine for the ad videos. render(t) sets the whole picture for time t (seconds). */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const EZ = { out: (t) => 1 - Math.pow(1 - t, 3), io: (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), soft: (t) => 1 - Math.pow(1 - t, 4), back: (t) => { const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }, lin: (t) => t };
  const anims = [], toggles = [], texts = [], typers = [], paths = [];
  const A = (sel, t0, d, p, ez = 'out') => anims.push({ els: $$(sel), t0, d, p, ez });
  const K = (sel, t0, cls, t1 = Infinity) => toggles.push({ els: $$(sel), t0, cls, t1 });
  const X = (sel, list) => texts.push({ els: $$(sel), list });
  const T = (sel, t0, cps, text) => typers.push({ el: $(sel), t0, cps, text });
  const P = (sel, pts) => paths.push({ el: $(sel), pts });
  const IN = (sel, t0, from = {}, d = .6, ez = 'out') => A(sel, t0, d, { o: [0, 1], y: [from.y ?? 30, 0], x: [from.x ?? 0, 0], s: [from.s ?? 1, 1] }, ez);
  window.E = { A, K, X, T, P, IN, $, $$ };
  const FIT = () => {
    const W = window.__W, H = window.__H, u = Math.min(W, H) / 100; document.documentElement.style.setProperty('--u', u + 'px');
    $$('.vz').forEach((z) => { const r = z.getBoundingClientRect(); const bw = +z.dataset.bw || 1000, bh = +z.dataset.bh || 900; z.style.setProperty('--vs', Math.min(r.width / bw, r.height / bh)); });
  };
  window.initVideo = function ({ W, H, total }) {
    window.__W = W; window.__H = H; window.TOTAL = total;
    document.body.dataset.ar = W === H ? 'square' : W > H ? 'landscape' : 'portrait';
    FIT(); anims.sort((a, b) => a.t0 - b.t0);
    const vises = $$('[data-s],[data-e]'); const words = $$('.w[data-t]'); const caps = window.CAPS || []; const capEl = $('#cap');
    window.render = function (t) {
      for (const el of vises) { const s = parseFloat(el.dataset.s), e = parseFloat(el.dataset.e), f = parseFloat(el.dataset.f || '.3'); let o = 1; if (!isNaN(s)) o = Math.min(o, clamp((t - s + f) / f)); if (!isNaN(e)) o = Math.min(o, 1 - clamp((t - e) / f)); el.style.opacity = o; el.style.visibility = o > 0.001 ? 'visible' : 'hidden'; }
      for (const w of words) { const p = EZ.soft(clamp((t - parseFloat(w.dataset.t)) / .55)); w.style.opacity = p; w.style.transform = `translateY(${(1 - p) * 55}%)`; }
      const st = new Map();
      for (const a of anims) {
        const p = EZ[a.ez](t < a.t0 ? 0 : clamp((t - a.t0) / a.d));
        for (const el of a.els) { let s = st.get(el); if (!s) { s = {}; st.set(el, s); } for (const [ch, [f, to]] of Object.entries(a.p)) { if (t < a.t0) { if (s[ch] === undefined) s[ch] = f; } else s[ch] = f + (to - f) * p; } }
      }
      for (const [el, s] of st) { if (s.o !== undefined) el.style.opacity = s.o; const tr = []; if (s.x !== undefined || s.y !== undefined) tr.push(`translate(${s.x ?? 0}px,${s.y ?? 0}px)`); if (s.s !== undefined) tr.push(`scale(${s.s})`); if (s.r !== undefined) tr.push(`rotate(${s.r}deg)`); if (tr.length) el.style.transform = tr.join(' '); }
      for (const k of toggles) for (const el of k.els) el.classList.toggle(k.cls, t >= k.t0 && t < k.t1);
      for (const x of texts) for (const el of x.els) { el.dataset.orig ??= el.textContent; let v = null; for (const [t0, s] of x.list) if (t >= t0) v = s; el.textContent = v ?? el.dataset.orig; }
      for (const y of typers) { const n = clamp(Math.floor((t - y.t0) * y.cps), 0, y.text.length); y.el.textContent = y.text.slice(0, n); y.el.classList.toggle('typing', t >= y.t0 && n < y.text.length); }
      for (const c of paths) { const pts = c.pts, f = pts[0], l = pts[pts.length - 1]; let x, y; if (t <= f[0]) { x = f[1]; y = f[2]; } else if (t >= l[0]) { x = l[1]; y = l[2]; } else for (let i = 0; i < pts.length - 1; i++) if (t >= pts[i][0] && t <= pts[i + 1][0]) { const p = EZ.io((t - pts[i][0]) / (pts[i + 1][0] - pts[i][0])); x = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * p; y = pts[i][2] + (pts[i + 1][2] - pts[i][2]) * p; } c.el.style.left = x + 'px'; c.el.style.top = y + 'px'; c.el.style.opacity = clamp((t - f[0] + .25) / .25) * (1 - clamp((t - l[0] - .5) / .25)); }
      $$('.typ i').forEach((d, i) => { d.style.opacity = .35 + .65 * (.5 + .5 * Math.sin(t * 10 - i * 1.3)); });
      $$('.drift').forEach((el, i) => { el.style.transform = `translate(${Math.sin(t * .6 + i) * 14}px,${Math.cos(t * .5 + i) * 14}px) scale(${1 + Math.sin(t * .3) * .02})`; });
      if (capEl) { let cur = null; for (const c of caps) if (t >= c[0] - .05 && t < c[1] + .25) cur = c; capEl.textContent = cur ? cur[2] : ''; capEl.style.opacity = cur ? 1 : 0; capEl.dataset.dark = ''; const dk = $$('.scn').find((s) => s.classList.contains('dk') && parseFloat(s.style.opacity) > .5); capEl.classList.toggle('on-dark', !!dk); }
    };
    window.render(0);
  };
})();
