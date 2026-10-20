/* =============================================================================
   13. CONTACT — call and WhatsApp buttons appear only with real numbers.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function digits(n) { return String(n || '').replace(/[^\d]/g, ''); }

  function card(p, i, C) {
    var phone = AD.has(p.phone) ? p.phone : null;
    var wa = AD.has(p.whatsapp) ? p.whatsapp : phone;
    var waText = encodeURIComponent('Hello, I have a question about ' + C.couple.bride + ' & ' + C.couple.groom + '’s wedding.');
    var actions = (phone || wa)
      ? '<div class="contact-card__actions">' +
          (phone ? '<a class="btn btn--primary" href="tel:+' + digits(phone) + '">' + AD.icon('phone') + 'Call</a>' : '') +
          (wa ? '<a class="btn btn--secondary" href="https://wa.me/' + digits(wa) + '?text=' + waText + '" target="_blank" rel="noopener">' + AD.icon('whatsapp') + 'WhatsApp</a>' : '') +
        '</div>'
      : '<p class="contact-card__pending">Phone number ' + AD.tbp('Phone number') + '</p>';

    return '<article class="contact-card paper reveal" data-delay="' + (i + 1) + '">' +
      '<span class="contact-card__icon">' + AD.icon(p.optional ? 'users' : 'user') + '</span>' +
      '<p class="eyebrow">' + AD.esc(p.role) + (p.optional ? ' <span class="contact-card__opt">(if applicable)</span>' : '') + '</p>' +
      '<h3 class="contact-card__name">' + (AD.has(p.name) ? AD.esc(p.name) : AD.tbp('Name')) + '</h3>' +
      (AD.has(p.relationship) ? '<p class="contact-card__rel">' + AD.esc(p.relationship) + '</p>' : '') +
      (phone ? '<p class="contact-card__phone numerals">' + AD.esc(phone) + '</p>' : '') +
      actions +
    '</article>';
  }

  AD.register('contact', {
    render: function (C) {
      var preview = C.site && C.site.previewNotice;
      // The coordinator card is hidden from guests unless details are supplied.
      var people = (C.contacts || []).filter(function (p) { return !p.optional || AD.has(p.name) || AD.has(p.phone) || preview; });
      return '<div class="container">' +
        AD.sectionHead({
          id: 'contact', eyebrow: 'Contact', title: 'Questions?',
          intro: 'For anything you need, please reach out to the family.'
        }) +
        '<div class="contact-grid">' + people.map(function (p, i) { return card(p, i, C); }).join('') + '</div>' +
      '</div>';
    }
  });
})();
