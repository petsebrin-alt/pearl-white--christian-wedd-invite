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
        '<div class="btn-row reveal"><a class="btn btn--secondary" href="#welcome" data-top>' + AD.icon('up') + 'Return to Top</a></div>' +
        '<div class="thanks__cross reveal">' + AD.orn.cross() + '</div>' +
      '</div>' +
      // The end of the journey: the wedding car parks here beside the
      // couple's monogram (js/journey.js drives it in as guests scroll).
      '<div class="parking" aria-hidden="true">' +
        '<div class="parking__bay">' +
          AD.florals.img('spray', 'parking__spray') +
          '<img class="parking__car" data-parking-car src="assets/images/wedding-car.webp?v=20261020o" width="720" height="1219" alt="" decoding="async">' +
        '</div>' +
        '<div class="parking__mark">' +
          '<span class="parking__mono">' + AD.esc((c.bride || '').charAt(0)) + '<i>&amp;</i>' + AD.esc((c.groom || '').charAt(0)) + '</span>' +
          AD.florals.img('drops', 'parking__drops') +
        '</div>' +
      '</div>';
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
