/* =============================================================================
   1. OPENING — modelled on the reference videos
   Closed: a full-screen envelope of four white tulle flaps dressed with the
          real pearl embroidery and beaded trim from the couple's envelope,
          closed with the pearl dove seal. "Tap the seal to open".
   Open:  light blooms from the seal, a sheen sweeps the lace and the pearls
          sparkle; then, as in the reference video, the side flaps fold away,
          followed by the top flap (carrying the seal) and the bottom flap,
          revealing the card: monogram + names + date, with the front of the
          wedding car peeking in at the top.
   Drive: the car (seen from above) glides straight down the invitation at
          one steady, smooth speed — no speeding up or slowing down —
          sweeping the monogram away under it and uncovering behind it,
          from the top down:
          The Wedding of · Angel & David · Save the Date · 27.JAN.2027
   Then the opening stays as the first screen and guests scroll down.
   Reduced motion or a missing car image: the final text appears at once.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD, C = AD.content;
  var root = document.documentElement;

  var DRIVE = 9500;   // ms from the top edge to beyond the bottom edge
  // Envelope steps (ms after the tap) — they match the CSS timings.
  var STEPS = { open: 1200, done: 3450 };
  var CY = 0.47;      // where the flaps meet (fraction of the height)
  var BEAT = 450;     // pause on the revealed card before the car arrives
  var MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  var splash, env, btn, car, mono, names, cue;
  var phase = 'idle', finished = false, carOk = false;
  var geo = null, t0 = 0, raf = 0, safety = 0;

  function $(id) { return document.getElementById(id); }
  function set(sel, text) {
    var el = splash.querySelector('[data-op="' + sel + '"]');
    if (el && AD.has(text)) el.textContent = text;
  }

  function fillContent() {
    var c = C.couple || {}, date = AD.weddingDate();
    set('initial-bride', (c.bride || '').charAt(0));
    set('initial-groom', (c.groom || '').charAt(0));
    set('names-caps', c.bride + ' & ' + c.groom);
    set('bride', c.bride);
    set('groom', c.groom);
    if (AD.has(date)) {
      var p = date.split('-');
      set('date-dots', p[2] + ' · ' + p[1] + ' · ' + p[0]);
      set('date', p[2] + '.' + MON[Number(p[1]) - 1] + '.' + p[0]);
    }
    btn.setAttribute('aria-label', 'Open the wedding invitation of ' + c.bride + ' and ' + c.groom);
  }

  /* ---------- Geometry ---------- */
  function measure() {
    var sr = splash.getBoundingClientRect();
    var monoTop = mono.getBoundingClientRect().top - sr.top;
    var ch = car.offsetHeight;
    // Idle: only the front of the car shows at the top, clear of the monogram.
    var peek = Math.max(ch * 0.14, Math.min(ch * 0.26, monoTop - 14));
    geo = {
      ch: ch,
      yStart: peek - ch,
      yEnd: sr.height + 30,
      monoTop: monoTop,
      namesTop: names.getBoundingClientRect().top - sr.top
    };
  }

  function place(y) {
    car.style.transform = 'translate3d(-50%, ' + y.toFixed(2) + 'px, 0)';
    var front = y + geo.ch * 0.99;   // front bumper
    var rear = y + geo.ch * 0.01;    // rear of the car
    mono.style.setProperty('--f', (front - geo.monoTop - 12).toFixed(1) + 'px');
    names.style.setProperty('--r', (rear - geo.namesTop + 8).toFixed(1) + 'px');
  }

  /* ---------- Animation loop: one constant, smooth speed ---------- */
  function frame(now) {
    var p = Math.min((now - t0) / DRIVE, 1);
    place(geo.yStart + (geo.yEnd - geo.yStart) * p);
    if (p >= 1) { complete(); return; }
    raf = requestAnimationFrame(frame);
  }

  function open() {
    if (phase !== 'idle' || finished) return;
    phase = 'opening';
    if (AD.reducedMotion()) {
      env.classList.add('is-fading');
      safety = setTimeout(finish, 3000);
      setTimeout(function () { env.hidden = true; showFinal(); setTimeout(finish, 450); }, 380);
      return;
    }
    env.classList.add('is-lit');
    safety = setTimeout(finish, STEPS.done + BEAT + DRIVE + 3000);
    setTimeout(function () { env.classList.add('is-open'); }, STEPS.open);
    setTimeout(function () {
      env.hidden = true;
      if (!carOk || !geo) { showFinal(); setTimeout(finish, 450); return; }
      setTimeout(drive, BEAT);
    }, STEPS.done);
  }

  /* ---------- Envelope layout: motifs, pearl trims and sparkles ---------- */
  // Sparkle points as fractions of each motif image (on its pearls/flowers).
  var GLINTS = {
    left: [[.47, .56], [.22, .3], [.72, .4], [.3, .82]],
    right: [[.52, .56], [.78, .3], [.28, .4], [.7, .82]],
    top: [[.5, .45], [.2, .38], [.8, .38]],
    bottom: [[.5, .55], [.25, .62], [.75, .62]]
  };
  function layoutEnvelope() {
    var W = env.clientWidth, H = env.clientHeight;
    if (!W || !H) return;
    var C = [W / 2, H * CY];
    var sprayH = Math.min(H * 0.5, W * 1.1), sprayW = sprayH * 380 / 812;
    var motifW = Math.min(W * 0.66, C[1] * 1.12), motifH = motifW * 493 / 700;
    var place = {
      left: [W * 0.17 - sprayW / 2, H * 0.5 - sprayH / 2, sprayW],
      right: [W * 0.83 - sprayW / 2, H * 0.5 - sprayH / 2, sprayW],
      top: [C[0] - motifW / 2, C[1] * 0.4 - motifH / 2, motifW],
      bottom: [C[0] - motifW / 2, H - (H - C[1]) * 0.42 - motifH / 2, motifW]
    };
    var edges = {
      left: [[0, 0], [0, H]], right: [[W, 0], [W, H]],
      top: [[0, 0], [W, 0]], bottom: [[0, H], [W, H]]
    };
    var sparks = env.querySelectorAll('.env__sparkles i'), si = 0;
    Object.keys(edges).forEach(function (name) {
      var flap = env.querySelector('[data-flap="' + name + '"]');
      if (!flap) return;
      var m = flap.querySelector('.ef__motif'), pl = place[name];
      m.style.left = pl[0].toFixed(1) + 'px';
      m.style.top = pl[1].toFixed(1) + 'px';
      m.style.width = pl[2].toFixed(1) + 'px';
      var mh = name === 'left' || name === 'right' ? sprayH : motifH;
      // Pearl-beaded trim along both inner edges (corner -> centre -> corner).
      var trims = flap.querySelectorAll('.ef__trim');
      [[edges[name][0], C], [C, edges[name][1]]].forEach(function (e, i) {
        var dx = e[1][0] - e[0][0], dy = e[1][1] - e[0][1];
        var t = trims[i];
        t.style.left = e[0][0].toFixed(1) + 'px';
        t.style.top = e[0][1].toFixed(1) + 'px';
        t.style.width = Math.hypot(dx, dy).toFixed(1) + 'px';
        t.style.transform = 'rotate(' + (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(3) + 'deg)';
      });
      GLINTS[name].forEach(function (g, k) {
        var sp = sparks[si++];
        if (!sp) return;
        var gx = g[0], gy = name === 'top' ? 1 - g[1] : g[1];   // top motif is flipped
        sp.style.left = (pl[0] + gx * pl[2]).toFixed(1) + 'px';
        sp.style.top = (pl[1] + gy * mh).toFixed(1) + 'px';
        sp.style.setProperty('--d', (0.15 + ((si * 7) % 11) * 0.075).toFixed(2) + 's');
      });
    });
  }

  function drive() {
    if (finished) return;
    measure();
    place(geo.yStart);
    phase = 'drive';
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function complete() {
    names.classList.add('is-revealed');
    car.hidden = true;
    finish();
  }

  function showFinal() {
    mono.classList.add('is-gone');
    names.classList.add('is-revealed');
    car.classList.add('is-gone');
  }

  /* ---------- After the opening ---------- */
  function finish() {
    if (finished) return;
    finished = true;
    phase = 'done';
    clearTimeout(safety);
    cancelAnimationFrame(raf);
    showFinal();
    car.hidden = true;
    env.hidden = true;
    cue.hidden = false;

    splash.classList.add('is-hero');
    root.classList.remove('splash-active');
    ['main', 'site-header'].forEach(function (id) {
      var el = $(id);
      if (el) el.removeAttribute('inert');
    });
    watchHero();
    AD.reveal.start();

    var hash = window.location.hash.slice(1);
    var target = hash ? $(hash) : null;
    if (target) target.scrollIntoView({ behavior: 'auto' });
    else cue.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('ad:opened'));
  }

  // Hide the site header while the opening screen is in view.
  function watchHero() {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      root.classList.toggle('hero-visible', entries[0].intersectionRatio > 0.35);
    }, { threshold: [0, 0.35, 0.6, 1] }).observe(splash);
  }

  AD.splash = {
    init: function () {
      splash = $('splash');
      env = $('op-envelope');
      btn = $('splash-open');
      car = $('op-car');
      mono = $('op-monogram');
      names = $('op-names');
      cue = $('op-scroll');
      if (!splash || !env || !btn || !car || !mono || !names) { if (splash) splash.remove(); root.classList.remove('splash-active'); return; }

      fillContent();
      layoutEnvelope();
      ['main', 'site-header'].forEach(function (id) {
        var el = $(id);
        if (el) el.setAttribute('inert', '');
      });

      function ready() {
        carOk = car.naturalWidth > 0;
        if (!carOk) { car.hidden = true; return; }
        measure();
        place(geo.yStart);
      }
      if (car.complete) ready();
      else {
        car.addEventListener('load', ready, { once: true });
        car.addEventListener('error', function () { carOk = false; car.hidden = true; }, { once: true });
      }
      // Re-measure once the script fonts arrive and on resize.
      function remeasure() {
        if (finished) return;
        if (phase === 'idle') layoutEnvelope();
        if (!geo) return;
        measure();
        if (phase === 'idle' || phase === 'opening') place(geo.yStart);
      }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
      window.addEventListener('resize', remeasure);

      btn.addEventListener('click', function (e) { e.stopPropagation(); open(); });
      splash.addEventListener('click', function () { if (phase === 'idle') open(); });
      cue.addEventListener('click', function () {
        setTimeout(function () {
          var t = $('welcome-title');
          if (t) t.focus({ preventScroll: true });
        }, AD.reducedMotion() ? 0 : 700);
      });
    }
  };
})();
