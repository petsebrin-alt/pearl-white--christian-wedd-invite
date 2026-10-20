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

  /* ---------- Pearl-flower columns (as in the couple's reference image) ----------
     Fine champagne stems run down each side; many small pearl flowers, buds,
     pearl sprigs and tiny pearls grow along them, leaving a clear path in the
     middle for the car. Units are column widths (--col); x is measured from
     the screen edge. The layout is generated from a fixed seed, so it is the
     same on every visit; the left column is a mirrored, different arrangement. */
  var STEMS = [0.24, 0.6, 0.94];   // where the three stems run (distance from the edge)
  var built = 0;                   // rows (in column widths) already filled

  function seeded(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function column(rows, seed) {
    var rnd = seeded(seed), W = 130;   // the SVG is 1.3 columns wide (100 units = 1 column)
    var stems = STEMS.map(function (base, k) {
      return { base: base, amp: 0.07 + rnd() * 0.06, len: 2.4 + rnd() * 1.2, ph: rnd() * 6.28, k: k };
    });
    function sx(st, y) { return st.base + st.amp * Math.sin(y / st.len * 6.283 + st.ph); }
    function X(x) { return (W - x * 100).toFixed(1); }

    var paths = '', dots = '', imgs = [];
    stems.forEach(function (st) {
      var d = '';
      for (var y = -0.6; y <= rows + 0.6; y += 0.2) d += (d ? 'L' : 'M') + X(sx(st, y)) + ' ' + (y * 100).toFixed(1);
      paths += '<path d="' + d + '"/>';
      // Flowers, buds and pearls along the stem
      var y2 = -0.3 + rnd() * 0.5;
      while (y2 < rows + 0.4) {
        var x = sx(st, y2) + (rnd() - 0.5) * 0.12, r = rnd();
        var piece = r < 0.5 ? 'bloom' : r < 0.82 ? 'bud' : r < 0.92 ? 'sprig' : 'drops';
        var w = piece === 'bloom' ? 0.38 + rnd() * 0.3 : piece === 'bud' ? 0.26 + rnd() * 0.1 : piece === 'sprig' ? 0.42 : 0.18;
        var turn = piece === 'drops' ? (rnd() - 0.5) * 16 : piece === 'sprig' ? -30 + rnd() * 60 : rnd() * 360;
        imgs.push([piece, y2, x, w, turn]);
        // A short twig with a few tiny pearls beside every other flower
        if (rnd() < 0.6) {
          var side = rnd() < 0.5 ? -1 : 1, tx = x + side * (0.14 + rnd() * 0.1), ty = y2 + 0.22 + rnd() * 0.15;
          paths += '<path d="M' + X(x) + ' ' + (y2 * 100 + 8).toFixed(1) + 'Q' + X((x + tx) / 2 + side * 0.04) + ' ' + ((y2 + ty) * 50).toFixed(1) + ' ' + X(tx) + ' ' + (ty * 100).toFixed(1) + '"/>';
          for (var p = 0; p < 3; p++) {
            dots += '<circle cx="' + X(tx + (rnd() - 0.5) * 0.09) + '" cy="' + (ty * 100 + (rnd() - 0.5) * 9).toFixed(1) + '" r="' + (1.3 + rnd() * 1.3).toFixed(1) + '"/>';
          }
        }
        y2 += 0.46 + rnd() * 0.3;
      }
    });
    var svg = '<svg class="op-stems" viewBox="0 0 ' + W + ' ' + (rows * 100) + '" preserveAspectRatio="none" style="--rows:' + rows + '">' +
      '<defs><radialGradient id="op-pearl-' + seed + '" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#f1ece3"/><stop offset="1" stop-color="#cfc5b3"/></radialGradient></defs>' +
      '<g class="op-stems__lines">' + paths + '</g><g fill="url(#op-pearl-' + seed + ')">' + dots + '</g></svg>';
    // Smaller pieces on top of larger ones reads more natural.
    imgs.sort(function (a, b) { return b[3] - a[3]; });
    return svg + imgs.map(function (it, i) {
      return AD.florals.img(it[0], 'op-pf' + (it[0] === 'bloom' && i % 3 === 0 ? ' op-pf--sway' : ''),
        '--y:' + it[1].toFixed(2) + ';--x:' + it[2].toFixed(3) + ';--w:' + it[3].toFixed(2) + ';--r:' + it[4].toFixed(0) + 'deg;--d:' + ((i * 37) % 23 / 10).toFixed(1) + 's');
    }).join('');
  }

  function buildFlorals() {
    var c = splash.querySelector('.op-florals--right');
    if (!c) return;
    var colW = c.offsetWidth || 100;
    var rows = Math.ceil(splash.offsetHeight / colW) + 1;
    if (rows <= built) return;
    built = rows;
    ['left', 'right'].forEach(function (side, s) {
      var el = splash.querySelector('.op-florals--' + side);
      if (el) el.innerHTML = column(rows, s ? 20270127 : 7271020);
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
      buildFlorals();
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
        buildFlorals();   // a taller screen (e.g. turned upright) needs longer columns
        if (finished) return;
        if (phase === 'idle') layoutEnvelope();
        if (!geo) return;
        measure();
        if (phase === 'idle' || phase === 'opening') place(geo.yStart);
      }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
      window.addEventListener('resize', remeasure);

      // Showcase view (?still): no envelope or drive — straight to the names,
      // then to the #section in the address (or the very end with &end).
      if (root.classList.contains('is-still')) {
        env.hidden = true;
        finish();
        var jump = function () {
          var t = window.location.hash ? $(window.location.hash.slice(1)) : null;
          if (/[?&]end(?:[=&]|$)/.test(window.location.search)) window.scrollTo(0, document.documentElement.scrollHeight);
          else if (t) t.scrollIntoView({ behavior: 'auto' });
        };
        jump();
        // Fonts and images can shift the page a little; land on the section again.
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(jump);
        window.addEventListener('load', jump);
        return;
      }

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
