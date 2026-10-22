/* =============================================================================
   14. THANK YOU — handwriting reveal with readable static text.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  // Split the line into two balanced handwritten lines.
  function lines(text) {
    var words = String(text).split(' ');
    if (words.length < 4) return [text];
    var mid = Math.ceil(words.length / 2) + (words.length > 5 ? 1 : 0);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  }

  AD.register('thank-you', {
    render: function (C) {
      var T = C.thankYou || {};
      var date = AD.weddingDate();
      var c = C.couple || {};
      return '<div class="container container--text thanks">' +
        '<div class="thanks__flowers reveal" aria-hidden="true">' +
          AD.florals.img('sprig', 'thanks__fl thanks__fl--l') + AD.florals.img('bloom', 'thanks__fl thanks__fl--c') + AD.florals.img('bud', 'thanks__fl thanks__fl--r') +
        '</div>' +
        '<h2 class="thanks__line" id="thank-you-title">' +
          lines(T.line).map(function (l, i) { return '<span class="hw" style="--i:' + i + '">' + AD.esc(l) + '</span>'; }).join('') +
        '</h2>' +
        AD.orn.divider('reveal') +
        '<p class="thanks__names script reveal">' + AD.esc(c.bride) + ' <span class="amp">&amp;</span> ' + AD.esc(c.groom) + '</p>' +
        (AD.has(date) ? '<p class="thanks__date reveal">' + AD.esc(AD.formatDateShort(date)) + '</p>' : '') +
        '<div class="thanks__cross reveal">' + AD.orn.cross() + '</div>' +
      '</div>' +
      // The end of the invitation (as in the reference video's last frame):
      // the wedding car drives in and parks on a slant at the left, the
      // couple waving, beside the monogram and pearl flowers; Return to Top
      // comes last, under the car.
      '<div class="parking" aria-hidden="true">' +
        '<div class="parking__mark">' +
          AD.florals.img('spray', 'parking__spray') +
          '<span class="parking__mono">' + AD.esc((c.bride || '').charAt(0)) + '<i>&amp;</i>' + AD.esc((c.groom || '').charAt(0)) + '</span>' +
          AD.florals.img('drops', 'parking__drops') +
        '</div>' +
        '<div class="parking__car">' +
          '<img src="assets/images/wedding-car.webp?v=20261022j" width="720" height="1219" alt="" decoding="async">' +   // already cached from the opening
          '<span class="parking__glint parking__glint--1"></span><span class="parking__glint parking__glint--2"></span><span class="parking__glint parking__glint--3"></span>' +
        '</div>' +
      '</div>' +
      // The very end, after the parked car
      '<div class="btn-row thanks__end reveal"><a class="btn btn--secondary" href="#welcome" data-top>' + AD.icon('up') + 'Return to Top</a></div>';
    },
    init: function (el) {
      var line = el.querySelector('.thanks__line');
      // Write the line once it scrolls into view (motion allowed only).
      if (!AD.reducedMotion() && 'IntersectionObserver' in window) {
        line.classList.add('hw-ready'); // hides the text only until it is written
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { line.classList.add('is-writing'); io.disconnect(); }
        }, { threshold: 0.5 });
        io.observe(line);
      }
      // The car drives in and parks once the parking place comes into view
      // (once per visit). Reduced motion: it is simply shown parked.
      var lot = el.querySelector('.parking');
      if (lot) {
        if (AD.reducedMotion() || !('IntersectionObserver' in window)) lot.classList.add('is-parked');
        else {
          lot.classList.add('is-waiting');
          var pio = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            pio.disconnect();
            lot.classList.remove('is-waiting');
            lot.classList.add('is-arriving');
            setTimeout(function () { lot.classList.add('is-parked'); }, 3400);
          }, { threshold: 0.45 });
          pio.observe(lot);
        }
      }
      el.querySelector('[data-top]').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: AD.reducedMotion() ? 'auto' : 'smooth' });
        var t = document.getElementById('welcome-title');
        if (t) setTimeout(function () { t.focus({ preventScroll: true }); }, AD.reducedMotion() ? 0 : 600);
        if (window.history && history.replaceState) history.replaceState(null, '', window.location.pathname + window.location.search);
      });
    }
  });
})();
