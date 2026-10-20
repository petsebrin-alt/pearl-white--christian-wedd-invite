/* =============================================================================
   2. WELCOME INVITATION — the couple photograph in black and white, modelled
   on the couple's slideshow reference video: it drifts slowly and moves
   with a gentle parallax as guests scroll, then fades into the paper, with
   the invitation over its lighter lower part (pearl flowers at the corners).
   With more than one photo in content.js → couplePhotos they crossfade.
   Reduced motion: the photo stays still.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var EVERY = 7000;      // ms per photo when there is more than one
  var DEPTH = 0.22;      // parallax: the photo moves at 22 % of the scroll

  AD.register('welcome', {
    render: function (C) {
      var inv = C.invitation || {}, v = inv.verse || {};
      var date = AD.weddingDate();
      var parts = AD.has(date) ? AD.dateParts(date) : null;
      var cer = AD.event('ceremony') || {};
      var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
      var photos = (C.couplePhotos || []).filter(function (p) { return p && AD.has(p.src); });

      var photo = photos.length
        ? '<div class="wel-photo" aria-hidden="true"><div class="wel-photo__par">' +
            photos.map(function (p, i) {
              return '<div class="wel-shot' + (i === 0 ? ' is-active' : '') + '"><img src="' + AD.esc(p.src) + '" alt="" decoding="async"' +
                (i ? ' loading="lazy"' : '') + (p.position ? ' style="object-position:' + AD.esc(p.position) + '"' : '') + '></div>';
            }).join('') +
          '</div></div>' +
          (photos[0].alt ? '<p class="sr-only">Photograph: ' + AD.esc(photos[0].alt) + '</p>' : '')
        : '';

      return '<div class="container">' +
        '<article class="wel' + (photos.length ? ' wel--photo' : '') + '">' +
          photo +
          '<div class="wel-body">' +
            '<div class="wel-floral wel-floral--tl" aria-hidden="true">' + AD.florals.img('spray') + '</div>' +
            '<div class="reveal">' + AD.orn.cross('invite-card__cross') + '</div>' +
            '<p class="eyebrow reveal" data-delay="1">' + AD.esc(inv.eyebrow) + '</p>' +
            '<h1 class="invite-names script wel-names reveal" data-delay="1" id="welcome-title" tabindex="-1">' +
              '<span class="wel-name wel-name--1">' + AD.esc(C.couple.bride) + '</span>' +
              '<span class="invite-names__amp wel-name wel-name--amp" aria-label="and">&amp;</span>' +
              '<span class="wel-name wel-name--2">' + AD.esc(C.couple.groom) + '</span>' +
            '</h1>' +
            '<p class="invite-message reveal" data-delay="2">' + AD.esc(inv.message) + '</p>' +
            AD.orn.divider('reveal') +
            (parts
              // Date block as in the reference: month above, weekday | day | year between fine rules
              ? '<div class="wel-db reveal" data-delay="1">' +
                  '<p class="sr-only">' + AD.esc(AD.formatDate(date)) + '</p>' +
                  '<p class="wel-db__month" aria-hidden="true">' + AD.letters(parts.month, 0.2) + '</p>' +
                  '<div class="wel-db__row" aria-hidden="true">' +
                    '<span class="wel-db__rule"></span>' +
                    '<span class="wel-db__side">' + AD.letters(parts.weekday, 0.5) + '</span>' +
                    '<span class="wel-db__day numerals">' + parts.day + '</span>' +
                    '<span class="wel-db__side">' + AD.letters(String(parts.year), 0.5) + '</span>' +
                    '<span class="wel-db__rule"></span>' +
                  '</div>' +
                '</div>'
              : '<p class="invite-date">' + AD.tbp('Date') + '</p>') +
            '<p class="wel-time reveal" data-delay="2">' +
              (timed ? AD.esc(AD.formatTimeRange(cer.startTime, cer.endTime)) : 'Ceremony time ' + AD.tbp('Ceremony time')) +
            '</p>' +
            (AD.has(v.text)
              ? '<figure class="verse reveal" data-delay="3"><blockquote><p>“' + AD.esc(v.text) + '”</p></blockquote>' +
                '<figcaption>' + AD.esc(v.reference) + ' · <span>' + AD.esc(v.translation) + '</span></figcaption></figure>'
              : '') +
            '<div class="wel-floral wel-floral--br" aria-hidden="true">' + AD.florals.img('bloom') + AD.florals.img('sprig') + '</div>' +
          '</div>' +
        '</article>' +
        '<a class="scroll-cue" href="#save-the-date"><span>Scroll to continue</span>' +
          '<svg viewBox="0 0 24 40" aria-hidden="true"><rect x="7" y="2" width="10" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle class="scroll-cue__dot" cx="12" cy="8" r="1.6" fill="currentColor"/><path d="M8 30l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>' +
        '</a>' +
      '</div>';
    },

    init: function (el) {
      var box = el.querySelector('.wel-photo');
      if (!box || AD.reducedMotion()) return;
      var par = box.querySelector('.wel-photo__par');
      var shots = AD.$$('.wel-shot', box), cur = 0, timer = 0, ticking = false, inView = false;

      // Gentle parallax: the photo moves a little slower than the page.
      function update() {
        ticking = false;
        var r = box.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var y = Math.max(-r.height * 0.12, Math.min(r.height * 0.12, -r.top * DEPTH));
        par.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener('resize', update);
      update();

      // Slow drift of the photo (restarts on each photo), and a crossfade when there are several.
      function show(i) {
        shots.forEach(function (s, k) {
          s.classList.toggle('is-active', k === i);
          if (k === i) { s.classList.remove('is-drift'); void s.offsetWidth; s.classList.add('is-drift'); }
        });
        cur = i;
      }
      function schedule() {
        clearTimeout(timer);
        if (shots.length < 2 || !inView) return;
        timer = setTimeout(function () { show((cur + 1) % shots.length); schedule(); }, EVERY);
      }
      var started = false;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          box.classList.toggle('is-offscreen', !inView);
          if (inView && !started) { started = true; show(0); }
          schedule();
        }, { threshold: 0.15 }).observe(box);
      } else {
        inView = true; show(0); schedule();
      }
    }
  });
})();
