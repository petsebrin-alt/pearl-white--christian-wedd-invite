/* =============================================================================
   2. WELCOME INVITATION
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  AD.register('welcome', {
    render: function (C) {
      var inv = C.invitation || {}, v = inv.verse || {};
      var date = AD.weddingDate();
      var parts = AD.has(date) ? AD.dateParts(date) : null;

      return '<div class="container">' +
        '<article class="invite-card paper paper--embossed lace-edge">' +
          '<div class="invite-card__floral invite-card__floral--tl" aria-hidden="true">' + AD.florals.img('spray') + '</div>' +
          '<div class="invite-card__floral invite-card__floral--br" aria-hidden="true">' + AD.florals.img('bloom') + AD.florals.img('sprig') + '</div>' +
          '<div class="invite-card__inner">' +
            '<div class="reveal">' + AD.orn.cross('invite-card__cross') + '</div>' +
            '<p class="eyebrow reveal" data-delay="1">' + AD.esc(inv.eyebrow) + '</p>' +
            '<h1 class="invite-names script reveal" data-delay="1" id="welcome-title" tabindex="-1">' +
              '<span>' + AD.esc(C.couple.bride) + '</span>' +
              '<span class="invite-names__amp" aria-label="and">&amp;</span>' +
              '<span>' + AD.esc(C.couple.groom) + '</span>' +
            '</h1>' +
            '<p class="invite-message reveal" data-delay="2">' + AD.esc(inv.message) + '</p>' +
            AD.orn.divider('reveal') +
            (parts
              ? '<p class="invite-date reveal" data-delay="2"><span class="invite-date__weekday">' + parts.weekday + '</span>' +
                '<span class="invite-date__full">' + parts.day + ' ' + parts.month + ' ' + parts.year + '</span></p>'
              : '<p class="invite-date">' + AD.tbp('Date') + '</p>') +
            (AD.has(v.text)
              ? '<figure class="verse reveal" data-delay="3"><blockquote><p>“' + AD.esc(v.text) + '”</p></blockquote>' +
                '<figcaption>' + AD.esc(v.reference) + ' · <span>' + AD.esc(v.translation) + '</span></figcaption></figure>'
              : '') +
          '</div>' +
        '</article>' +
        '<a class="scroll-cue" href="#save-the-date"><span>Scroll to continue</span>' +
          '<svg viewBox="0 0 24 40" aria-hidden="true"><rect x="7" y="2" width="10" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle class="scroll-cue__dot" cx="12" cy="8" r="1.6" fill="currentColor"/><path d="M8 30l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>' +
        '</a>' +
      '</div>';
    }
  });
})();
