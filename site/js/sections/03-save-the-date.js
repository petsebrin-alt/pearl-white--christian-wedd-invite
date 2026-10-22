/* =============================================================================
   3. SAVE THE DATE — 27 January 2027 is the focal point.
   "Save the Date" in brush lettering (the couple's reference), then a ring of
   real pearls and crystals. The date inside is covered by a pile of satin
   petals; one tap and the petals burst, swirl round and settle into a wreath
   along the pearl ring, the date appears, and real white rose petals shower
   down from the top (modelled on the couple's reference video).
   Reduced motion: the wreath and the date are shown at once, no shower.
   Calendar: all-day entry until the ceremony time + timezone are confirmed.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var V = '?v=20261022f';
  var SATIN = 8, ROSE = 6;          // petal pictures in assets/images/petals/
  var COUNT = 92;                   // satin petals in the pile / wreath

  function ceremonyCalendar(C) {
    var cer = AD.event('ceremony') || {};
    var venue = AD.venue(cer.venueId);
    var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
    var desc = 'Together with their families, ' + C.couple.bride + ' & ' + C.couple.groom + ' invite you to celebrate their marriage.';
    if (!timed) desc += '\nCeremony time and venue to be announced.';
    else if (!AD.venueHasLocation(venue)) desc += '\nVenue to be announced.';
    return AD.calendar.build({
      uid: 'save-the-date',
      title: (timed ? '' : 'Save the Date — ') + C.couple.bride + ' & ' + C.couple.groom + "'s Wedding",
      description: desc,
      date: AD.weddingDate(),
      startTime: cer.startTime,
      endTime: cer.endTime,
      location: AD.venueLine(venue)
    });
  }

  // A small seeded random generator, so the pile and wreath look the same on every visit.
  function seeded(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  AD.register('save-the-date', {
    render: function (C) {
      var date = AD.weddingDate();
      if (!AD.has(date)) {
        return '<div class="container">' + AD.sectionHead({ id: 'save-the-date', eyebrow: 'Save the Date', title: 'Save the Date' }) +
          '<p class="std-pending">' + AD.tbp('Wedding date') + '</p></div>';
      }
      var p = AD.dateParts(date);
      var cer = AD.event('ceremony') || {};
      var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
      return '<div class="container std">' +
        '<h2 class="sr-only" id="save-the-date-title">Save the Date: ' + AD.esc(AD.formatDate(date)) + '</h2>' +
        // Brush lettering, as in the couple's reference ("the" inside the loop)
        '<div class="std-script reveal" aria-hidden="true">' +
          AD.florals.img('bud', 'std-script__bud') +
          '<svg class="std-script__swash" viewBox="0 0 400 260" preserveAspectRatio="none">' +
            '<path d="M110 196C88 150 128 128 176 134S240 178 214 206 120 238 92 214 86 168 120 154"/>' +
          '</svg>' +
          '<span class="std-script__save">Save</span>' +
          '<span class="std-script__row"><span class="std-script__the">the</span><span class="std-script__date">Date</span></span>' +
        '</div>' +
        // Real pearls and crystals; the date sits under a pile of satin petals until tapped
        '<div class="std-ring reveal" data-delay="1">' +
          '<div class="std-ring__petals" aria-hidden="true"></div>' +
          '<img class="std-ring__pearls" src="assets/images/pearl-ring.webp' + V + '" width="1000" height="1000" alt="" decoding="async">' +
          '<div class="std-ring__date" aria-hidden="true">' +
            '<span class="std-ring__weekday">' + p.weekday + '</span>' +
            '<span class="std-ring__day numerals">' + p.day + '</span>' +
            '<span class="std-ring__month script">' + p.month + '</span>' +
            '<span class="std-ring__year numerals">' + p.year + '</span>' +
          '</div>' +
          '<div class="std-ring__pile" aria-hidden="true"></div>' +
          '<button class="std-ring__tap" type="button" aria-label="Reveal the date: ' + AD.esc(AD.formatDate(date)) + '"><span>Tap the petals</span></button>' +
        '</div>' +
        '<p class="std-line reveal" data-delay="2">The wedding of <span class="script">' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '</span></p>' +
        '<p class="std-note reveal" data-delay="2">' +
          (timed
            ? AD.esc(AD.formatTimeRange(cer.startTime, cer.endTime))
            : 'Ceremony time ' + AD.tbp('Ceremony time')) +
        '</p>' +
        '<div class="btn-row reveal" data-delay="3"><button class="btn btn--primary" type="button" data-std-cal>' + AD.icon('calendar') + 'Add to Calendar</button></div>' +
      '</div>';
    },

    init: function (el, C) {
      var b = el.querySelector('[data-std-cal]');
      if (b) {
        b.addEventListener('click', function () {
          var ev = ceremonyCalendar(C);
          if (ev) AD.calendar.open(ev, b);
        });
      }
      var ring = el.querySelector('.std-ring');
      if (ring) petals(ring);
    }
  });

  /* ---------- The petals ----------
     Every petal has a place in the pile (over the date) and a place in the
     wreath (along the pearl ring). Positions are in ring widths, so the
     layout fits any screen. */
  function petals(ring) {
    var pile = ring.querySelector('.std-ring__pile');
    var wreath = ring.querySelector('.std-ring__petals');
    var tap = ring.querySelector('.std-ring__tap');
    var rnd = seeded(27012027);
    var list = [];
    for (var i = 0; i < COUNT; i++) {
      // pile: a dense disc over the date (sunflower spiral, slightly jittered)
      var t = (i + .5) / COUNT, ang = i * 2.39996;
      var pr = .335 * Math.sqrt(t);
      var pile0 = { x: pr * Math.cos(ang) + (rnd() - .5) * .03, y: -.01 + pr * Math.sin(ang) + (rnd() - .5) * .03, r: rnd() * 360 };
      // wreath: evenly round the ring, just inside and under the pearls
      var wa = (i / COUNT) * Math.PI * 2 + (rnd() - .5) * .05;
      var wr = .356 + (rnd() - .5) * .07;   // an inner ring of petals tucked against the pearls
      var end = { x: wr * Math.cos(wa), y: wr * Math.sin(wa), r: wa * 180 / Math.PI + 90 + (rnd() - .5) * 80 };
      list.push({ pile: pile0, end: end, w: .07 + rnd() * .035, src: 'assets/images/petals/satin-' + (1 + (i % SATIN)) + '.webp' + V, flip: rnd() < .5 ? -1 : 1 });
    }
    // The pile is drawn on top of the date, the wreath under the pearls.
    pile.innerHTML = list.map(function (p, i) {
      return '<img class="std-petal" data-i="' + i + '" src="' + p.src + '" alt="" draggable="false" decoding="async">';
    }).join('');
    var imgs = Array.prototype.slice.call(pile.children);

    function size() { return ring.clientWidth || 360; }
    function tf(pos, w, W, flip, extra) {
      return 'translate(-50%,-50%) translate(' + (pos.x * W).toFixed(1) + 'px,' + (pos.y * W).toFixed(1) + 'px) rotate(' + pos.r.toFixed(1) + 'deg) scaleX(' + flip + ')' + (extra || '');
    }
    function place(state) {
      var W = size();
      imgs.forEach(function (img, i) {
        var p = list[i];
        img.style.width = (p.w * W).toFixed(1) + 'px';
        img.style.transform = tf(state === 'open' ? p.end : p.pile, p.w, W, p.flip);
      });
    }

    var open = false;
    function settle() {
      // After the swirl, move the petals under the pearls so the chain lies on top.
      wreath.appendChild(pile.firstChild ? frag() : document.createDocumentFragment());
    }
    function frag() {
      var f = document.createDocumentFragment();
      while (pile.firstChild) f.appendChild(pile.firstChild);
      return f;
    }

    function reveal(e) {
      if (open) { shower(); return; }
      open = true;
      ring.classList.add('is-open');
      tap.setAttribute('aria-label', 'Petals for the couple');
      if (AD.reducedMotion() || !imgs[0].animate) { place('open'); settle(); return; }
      var W = size(), rect = ring.getBoundingClientRect();
      // where the guest tapped, in ring widths from the centre
      var tx = e && e.clientX ? (e.clientX - rect.left) / W - .5 : 0;
      var ty = e && e.clientY ? (e.clientY - rect.top) / W - .5 : 0;
      var done = 0;
      imgs.forEach(function (img, i) {
        var p = list[i];
        var dx = p.pile.x - tx, dy = p.pile.y - ty, d = Math.sqrt(dx * dx + dy * dy) || .001;
        // 1. burst away from the finger; 2. swirl round the centre; 3. settle into the wreath
        var burst = { x: p.pile.x + dx / d * (.16 + .2 * (1 - Math.min(d, .5))), y: p.pile.y + dy / d * (.16 + .2 * (1 - Math.min(d, .5))) - .04, r: p.pile.r + 140 * p.flip };
        var ea = Math.atan2(p.end.y, p.end.x), swirlA = ea - .9 - (i % 5) * .08, swirlR = .3 + (i % 7) * .015;
        var swirl = { x: swirlR * Math.cos(swirlA), y: swirlR * Math.sin(swirlA), r: p.end.r - 120 };
        var anim = img.animate([
          { transform: tf(p.pile, p.w, W, p.flip), offset: 0, easing: 'cubic-bezier(.15,.7,.3,1)' },
          { transform: tf(burst, p.w, W, p.flip, ' scale(1.12)'), offset: .3, easing: 'cubic-bezier(.45,.05,.55,.95)' },
          { transform: tf(swirl, p.w, W, p.flip, ' scale(1.04)'), offset: .66, easing: 'cubic-bezier(.3,.6,.25,1)' },
          { transform: tf(p.end, p.w, W, p.flip), offset: 1 }
        ], { duration: 2300 + (i % 9) * 40, delay: Math.min(d, .6) * 260, fill: 'forwards' });
        anim.onfinish = function () {
          img.style.transform = tf(p.end, p.w, W, p.flip);
          anim.cancel();
          if (++done === imgs.length) settle();
        };
      });
      setTimeout(shower, 1500);
    }

    // Real white rose petals drifting down over the whole screen.
    function shower() {
      if (AD.reducedMotion()) return;
      var layer = document.createElement('div');
      layer.className = 'petal-shower';
      layer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(layer);
      var vw = window.innerWidth, vh = window.innerHeight, n = vw < 600 ? 30 : 46, last = 0;
      for (var i = 0; i < n; i++) {
        var img = document.createElement('img');
        img.className = 'petal-shower__petal';
        img.alt = '';
        img.src = 'assets/images/petals/rose-' + (1 + (i % ROSE)) + '.webp' + V;
        var w = 22 + Math.random() * 22, x = Math.random() * vw, drift = (Math.random() - .5) * 160;
        var dur = 5200 + Math.random() * 3000, delay = Math.random() * 2600, spin = (Math.random() - .5) * 540;
        img.style.width = w.toFixed(0) + 'px';
        img.style.left = x.toFixed(0) + 'px';
        layer.appendChild(img);
        var sway = function (k) { return Math.sin(k * Math.PI * 2.2) * 38 + drift * k; };
        var frames = [];
        for (var k = 0; k <= 8; k++) {
          var f = k / 8;
          frames.push({
            transform: 'translate(' + sway(f).toFixed(0) + 'px,' + (-60 + f * (vh + 120)).toFixed(0) + 'px) rotate(' + (spin * f).toFixed(0) + 'deg) rotateX(' + (Math.sin(f * 9) * 55).toFixed(0) + 'deg) rotateY(' + (Math.cos(f * 7) * 45).toFixed(0) + 'deg)',
            opacity: f < .06 ? f / .06 : f > .9 ? (1 - f) / .1 : 1
          });
        }
        img.animate(frames, { duration: dur, delay: delay, easing: 'linear', fill: 'both' });
        last = Math.max(last, dur + delay);
      }
      setTimeout(function () { layer.remove(); }, last + 200);
    }

    place('pile');
    tap.addEventListener('click', reveal);
    var resizeT = 0;
    window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(function () { place(open ? 'open' : 'pile'); }, 150); });
    // Showcase view and reduced motion: show the wreath and the date straight away.
    if (AD.reducedMotion()) {
      open = true;
      ring.classList.add('is-open');
      place('open');
      settle();
    }
  }
})();
