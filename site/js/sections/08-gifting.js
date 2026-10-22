/* =============================================================================
   8. GIFTING — pearl-trimmed ivory envelope (baby's breath, dove wax seal)
   that opens to reveal the note. No registry.
   The message is always in the page for screen readers, opened or not.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  // Pearl-trimmed ivory envelope with a sprig of baby's breath, modelled on
  // the couple's reference photo (rendered images; see THEME.md).
  var V = '?v=20261022f';
  var FRONT = '<img class="envelope__front" src="assets/images/envelope-front.webp' + V + '" alt="" aria-hidden="true" width="1280" height="880" decoding="async">';
  var FLAP_D = 'M0 0 H320 V100 L176 141 Q160 147 144 141 L0 100 Z';
  var FLAP = '<img src="assets/images/envelope-flap.webp' + V + '" alt="" aria-hidden="true" width="1280" height="592" decoding="async">';

  var FLAP_INSIDE =
    '<svg viewBox="0 0 320 148" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><pattern id="env-liner" width="18" height="18" patternUnits="userSpaceOnUse">' +
        '<circle cx="9" cy="9" r="2.4" fill="none" stroke="#e1dbcf" stroke-width=".6"/><circle cx="0" cy="0" r=".9" fill="#e1dbcf"/><circle cx="18" cy="18" r=".9" fill="#e1dbcf"/>' +
      '</pattern></defs>' +
      // Mirrored so the opened flap's point faces upward.
      '<g transform="translate(0 148) scale(1 -1)">' +
        '<path d="' + FLAP_D + '" fill="#efebe2" stroke="#ddd7cb" stroke-width=".8"/>' +
        '<path d="' + FLAP_D + '" fill="url(#env-liner)"/>' +
      '</g>' +
    '</svg>';

  AD.register('gifting', {
    render: function (C) {
      var G = C.gifting || {};
      return '<div class="container container--narrow">' +
        AD.sectionHead({ id: 'gifting', eyebrow: 'Gifting', title: 'With Gratitude' }) +
        '<div class="envelope-stage reveal" data-delay="1">' +
          '<p class="envelope-stage__cap" aria-hidden="true">A note from ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '</p>' +
          '<div class="envelope" id="gift-envelope">' +
            '<div class="envelope__back" aria-hidden="true"></div>' +
            '<div class="envelope__letter" id="gift-letter">' +
              '<p class="envelope__eyebrow">With love</p>' +
              '<p class="envelope__msg">' + AD.esc(G.message) + '</p>' +
              '<p class="envelope__msg2">' + AD.esc(G.message2) + '</p>' +
              '<p class="envelope__sign script" aria-hidden="true">' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '</p>' +
            '</div>' +
            FRONT +
            '<div class="envelope__flap" aria-hidden="true">' +
              '<div class="envelope__flap-face envelope__flap-face--out">' + FLAP +
                '<span class="envelope__seal"><img src="assets/images/dove-seal.webp' + V + '" alt="" width="360" height="360" decoding="async"></span>' +
              '</div>' +
              '<div class="envelope__flap-face envelope__flap-face--in">' + FLAP_INSIDE + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="btn-row reveal" data-delay="2">' +
          '<button class="btn btn--primary" type="button" id="gift-toggle" aria-controls="gift-letter" aria-expanded="false">' + AD.icon('envelope') + '<span>Open the envelope</span></button>' +
        '</div>' +
        '<p class="gift-foot reveal" data-delay="2">There is no gift registry. Your prayers and presence mean the most to us.</p>' +
      '</div>';
    },
    init: function (el) {
      var env = el.querySelector('#gift-envelope');
      var btn = el.querySelector('#gift-toggle');
      var label = btn.querySelector('span');
      function setOpen(open) {
        env.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        label.textContent = open ? 'Close the envelope' : 'Open the envelope';
      }
      // Reduced motion: show the note open from the start (no movement).
      if (AD.reducedMotion()) setOpen(true);
      btn.addEventListener('click', function () { setOpen(!env.classList.contains('is-open')); });
      env.addEventListener('click', function () { if (!env.classList.contains('is-open')) setOpen(true); });
    }
  });
})();
