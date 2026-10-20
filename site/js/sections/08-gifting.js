/* =============================================================================
   8. GIFTING — white envelope that opens to reveal the note. No registry.
   The message is always in the page for screen readers, opened or not.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var FRONT =
    '<svg class="envelope__front" viewBox="0 0 320 220" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="env-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f7f5f0"/><stop offset="1" stop-color="#ffffff"/></linearGradient>' +
        '<linearGradient id="env-side-r" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f3f0ea"/><stop offset="1" stop-color="#fdfcfa"/></linearGradient>' +
        '<linearGradient id="env-bottom" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fbfaf7"/><stop offset="1" stop-color="#ffffff"/></linearGradient>' +
        '<filter id="env-fold" x="-10%" y="-20%" width="120%" height="140%"><feDropShadow dx="0" dy="-1" stdDeviation="1.4" flood-color="#5a503f" flood-opacity=".14"/></filter>' +
      '</defs>' +
      '<path d="M0 88 L160 128 L0 220 Z" fill="url(#env-side)" filter="url(#env-fold)"/>' +
      '<path d="M320 88 L160 128 L320 220 Z" fill="url(#env-side-r)" filter="url(#env-fold)"/>' +
      '<path d="M0 220 L152 117 Q160 111 168 117 L320 220 Z" fill="url(#env-bottom)" filter="url(#env-fold)"/>' +
      '<path d="M0 220 L152 117 Q160 111 168 117 L320 220" fill="none" stroke="#e4dfd5" stroke-width=".8"/>' +
    '</svg>';

  // Pointed flap whose lower edge overlaps the pocket, so a closed envelope
  // never shows the letter.
  var FLAP_D = 'M0 0 H320 V100 L176 141 Q160 147 144 141 L0 100 Z';
  var FLAP =
    '<svg viewBox="0 0 320 148" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9f7f3"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>' +
      '<path d="' + FLAP_D + '" fill="url(#env-flap)" stroke="#e2ddd3" stroke-width=".8"/>' +
    '</svg>';

  var FLAP_INSIDE =
    '<svg viewBox="0 0 320 148" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><pattern id="env-liner" width="18" height="18" patternUnits="userSpaceOnUse">' +
        '<circle cx="9" cy="9" r="2.4" fill="none" stroke="#e1dbcf" stroke-width=".6"/><circle cx="0" cy="0" r=".9" fill="#e1dbcf"/><circle cx="18" cy="18" r=".9" fill="#e1dbcf"/>' +
      '</pattern></defs>' +
      // Mirrored so the opened flap's point faces upward.
      '<g transform="translate(0 148) scale(1 -1)">' +
        '<path d="' + FLAP_D + '" fill="#f3efe7" stroke="#e2ddd3" stroke-width=".8"/>' +
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
                '<span class="envelope__seal"><span class="envelope__seal-ring"><span class="script">' + AD.esc((C.couple.bride || 'A').charAt(0)) + '&amp;' + AD.esc((C.couple.groom || 'D').charAt(0)) + '</span></span></span>' +
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
