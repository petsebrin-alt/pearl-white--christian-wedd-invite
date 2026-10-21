/* =============================================================================
   9. VENUE — at the couple's request, only the church of the Christian
   marriage ceremony, styled after their "Audio Guest Book" reference:
   "We are gathered / HERE TOGETHER", a black-and-white line illustration of
   a Kerala church that draws itself as guests scroll, and one small line of
   details with "Get Directions". Venues marked showInVenues: false (the
   hotel and the family homes) are reached from their event's "View Location".
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  // A Kerala church facade between palms on the backwaters (an illustration,
  // not a drawing of the actual building). Every shape draws itself in.
  var L = ' pathLength="1" class="cs"';
  var CHURCH =
    '<svg class="church-illus" viewBox="0 0 420 300" role="img" aria-label="Illustration of the church">' +
      // palms
      '<g class="cs-palm">' +
        '<path d="M52 262C49 222 55 182 66 150"' + L + ' fill="none"/>' +
        '<path d="M66 150C50 140 34 142 20 158M66 150C52 131 38 125 24 128M66 150C68 130 80 120 98 122M66 150C82 140 96 143 106 156M66 150C60 134 62 118 72 106M66 150C58 140 50 152 44 170"' + L + ' fill="none"/>' +
        '<path d="M368 262C371 222 365 182 354 150"' + L + ' fill="none"/>' +
        '<path d="M354 150C370 140 386 142 400 158M354 150C368 131 382 125 396 128M354 150C352 130 340 120 322 122M354 150C338 140 324 143 314 156M354 150C360 134 358 118 348 106M354 150C362 140 370 152 376 170"' + L + ' fill="none"/>' +
      '</g>' +
      // towers
      '<path d="M92 256V118H132V256Z"' + L + ' fill="#fff"/>' +
      '<path d="M288 256V118H328V256Z"' + L + ' fill="#fff"/>' +
      '<path d="M120 118V256H132V118Z" fill="#ececec" class="cf"/><path d="M316 118V256H328V118Z" fill="#ececec" class="cf"/>' +
      '<path d="M88 118H136M284 118H332"' + L + ' fill="none"/>' +
      '<path d="M94 118Q112 88 130 118M290 118Q308 88 326 118"' + L + ' fill="#fff"/>' +
      '<path d="M112 92V72M106 79H118M308 92V72M302 79H314"' + L + ' fill="none"/>' +
      '<path d="M104 172V150A8 8 0 0 1 120 150V172ZM104 226V204A8 8 0 0 1 120 204V226ZM300 172V150A8 8 0 0 1 316 150V172ZM300 226V204A8 8 0 0 1 316 204V226Z"' + L + ' fill="#f6f6f6"/>' +
      // facade with the Kerala baroque gable
      '<path d="M132 256V126H288V256Z"' + L + ' fill="#fff"/>' +
      '<path d="M132 126V112C150 112 160 100 176 94L196 72L210 64L224 72L244 94C260 100 270 112 288 112V126"' + L + ' fill="#fff"/>' +
      '<path d="M128 126H292M132 180H288M132 184H288"' + L + ' fill="none"/>' +
      '<path d="M152 126V256M178 184V256M242 184V256M268 126V256"' + L + ' fill="none"/>' +
      '<path d="M210 64V38M202 46H218"' + L + ' fill="none"/>' +
      '<circle cx="210" cy="98" r="12"' + L + ' fill="#f6f6f6"/>' +
      '<path d="M210 86V110M198 98H222M201.5 89.5L218.5 106.5M218.5 89.5L201.5 106.5"' + L + ' fill="none"/>' +
      // windows and door
      '<path d="M158 170V148A7 7 0 0 1 172 148V170ZM248 170V148A7 7 0 0 1 262 148V170ZM198 172V146A12 12 0 0 1 222 146V172Z"' + L + ' fill="#f6f6f6"/>' +
      '<path d="M158 238V210A7 7 0 0 1 172 210V238ZM248 238V210A7 7 0 0 1 262 210V238Z"' + L + ' fill="#f6f6f6"/>' +
      '<path d="M190 256V222A20 20 0 0 1 230 222V256Z"' + L + ' fill="#ececec"/>' +
      '<path d="M196 256V224A14 14 0 0 1 224 224V256M210 210V256"' + L + ' fill="none"/>' +
      // pearls along the band, as on the invitation
      '<g class="cs-pearls" fill="#fff">' +
        [140, 160, 180, 200, 220, 240, 260, 280].map(function (x) { return '<circle cx="' + x + '" cy="182" r="2.6"' + L + '/>'; }).join('') +
      '</g>' +
      // steps, ground and the backwaters
      '<path d="M160 256H260V262H160ZM170 250H250V256H170Z"' + L + ' fill="#f6f6f6"/>' +
      '<path d="M20 262H400"' + L + ' fill="none"/>' +
      '<path d="M40 274H92M120 280H190M230 274H290M70 288H130M250 288H330M346 280H392"' + L + ' fill="none"/>' +
      '<path d="M300 272Q330 283 362 272M318 276L330 262"' + L + ' fill="none"/>' +
    '</svg>';

  AD.register('venues', {
    render: function (C) {
      var v = (C.venues || []).filter(function (x) { return x.showInVenues !== false; })[0];
      if (!v) return '';
      var ev = (C.events || []).filter(function (e) { return e.venueId === v.id; })[0];
      var map = AD.mapUrl(v);
      var when = ev ? [AD.has(ev.date) ? AD.formatDate(ev.date) : '', AD.has(ev.startTime) ? AD.formatTimeRange(ev.startTime, ev.endTime) : ''].filter(Boolean).join(' · ') : '';
      // Styled after the couple's "Audio Guest Book" reference: a script line
      // over engraved capitals, a line drawing, and a small line of details.
      return '<div class="container venue-x" id="venue-' + AD.esc(v.id) + '" tabindex="-1">' +
        '<h2 class="vx-title" id="venues-title">' +
          '<span class="vx-title__script script">We are gathered</span>' +
          '<span class="vx-title__caps">Here Together</span>' +
          '<span class="sr-only">: ' + AD.esc(v.name || 'the venue') + '</span>' +
        '</h2>' +
        '<div class="vx-art" aria-hidden="true">' + CHURCH + '</div>' +
        '<div class="vx-info reveal">' +
          '<p class="vx-name">' + (AD.has(v.name) ? AD.esc(v.name) : AD.tbp('Venue name')) + '</p>' +
          (AD.has(v.address) ? '<p class="vx-line">' + AD.esc(v.address) + '</p>' : '') +
          (when ? '<p class="vx-line vx-when">' + AD.esc(when) + '</p>' : '') +
          (map ? '<a class="btn btn--primary vx-btn" href="' + AD.esc(map) + '" target="_blank" rel="noopener">' + AD.icon('pin') + 'Get Directions</a>' : '') +
        '</div>' +
      '</div>';
    },
    init: function (el) {
      var svg = el.querySelector('.church-illus'), art = el.querySelector('.vx-art'), title = el.querySelector('.vx-title');
      if (!svg) return;
      // Every line gets its turn: building first, then windows and details, palms and water last.
      var parts = AD.$$('.cs', svg);
      parts.forEach(function (n, i) { n.style.setProperty('--s', (i / parts.length * .62).toFixed(3)); });
      if (AD.reducedMotion()) { art.style.setProperty('--p', 1); title.classList.add('is-written'); return; }
      // The drawing follows the scroll: it writes itself as it rises into view.
      var ticking = false;
      function update() {
        ticking = false;
        var r = art.getBoundingClientRect(), vh = window.innerHeight;
        var p = (vh * .95 - r.top) / (vh * .72);   // starts as it enters, complete when it reaches the upper third
        p = Math.max(0, Math.min(1, p));
        art.style.setProperty('--p', p.toFixed(3));
      }
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener('resize', update);
      update();
      // The script line writes itself once, when it comes into view.
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) {
          if (en[0].isIntersecting) { title.classList.add('is-written'); io.disconnect(); }
        }, { threshold: .6 });
        io.observe(title);
      } else title.classList.add('is-written');
    }
  });
})();
