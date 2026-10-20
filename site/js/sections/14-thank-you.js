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
      return '<div class="container container--text thanks">' +
        AD.orn.garland('thanks__garland reveal') +
        '<h2 class="thanks__line" id="thank-you-title">' +
          lines(T.line).map(function (l, i) { return '<span class="hw" style="--i:' + i + '">' + AD.esc(l) + '</span>'; }).join('') +
        '</h2>' +
        AD.orn.divider('reveal') +
        '<p class="thanks__names script reveal">' + AD.esc(C.couple.bride) + ' <span class="amp">&amp;</span> ' + AD.esc(C.couple.groom) + '</p>' +
        (AD.has(date) ? '<p class="thanks__date reveal">' + AD.esc(AD.formatDateShort(date)) + '</p>' : '') +
        '<div class="btn-row reveal"><a class="btn btn--secondary" href="#welcome" data-top>' + AD.icon('up') + 'Return to Top</a></div>' +
        '<div class="thanks__cross reveal">' + AD.orn.cross() + '</div>' +
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
