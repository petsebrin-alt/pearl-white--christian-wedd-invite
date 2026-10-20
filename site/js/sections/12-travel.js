/* =============================================================================
   12. TRANSPORTATION AND ACCOMMODATION
   Only confirmed arrangements are shown; everything else is "To be provided".
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function card(icon, title, body, delay) {
    return '<article class="info-card paper reveal" data-delay="' + delay + '">' +
      '<span class="info-card__icon">' + AD.icon(icon) + '</span>' +
      '<h3 class="info-card__title">' + title + '</h3>' +
      '<div class="info-card__body">' + body + '</div>' +
    '</article>';
  }
  function text(v, label) { return AD.has(v) ? '<p>' + AD.esc(v) + '</p>' : '<p>' + AD.tbp(label) + '</p>'; }

  AD.register('travel', {
    render: function (C) {
      var T = C.travel || {};
      var pickups = AD.has(T.pickupPoints)
        ? '<ul class="info-list">' + T.pickupPoints.map(function (p) { return '<li><strong>' + AD.esc(p.place) + '</strong>' + (p.time ? ' · ' + AD.esc(p.time) : '') + '</li>'; }).join('') + '</ul>'
        : '<p>' + AD.tbp('Pickup locations and timings') + '</p>';
      var stays = AD.has(T.accommodation)
        ? '<ul class="info-list">' + T.accommodation.map(function (h) {
            return '<li><strong>' + AD.esc(h.name) + '</strong>' + (h.note ? '<br>' + AD.esc(h.note) : '') +
              (h.url ? '<br><a href="' + AD.esc(h.url) + '" target="_blank" rel="noopener">Website</a>' : '') + '</li>';
          }).join('') + '</ul>'
        : '<p>' + AD.tbp('Suggested accommodation') + '</p>';
      var links = AD.has(T.bookingLinks)
        ? '<ul class="info-list">' + T.bookingLinks.map(function (l) {
            return '<li><a href="' + AD.esc(l.url) + '" target="_blank" rel="noopener">' + AD.esc(l.label) + '</a></li>';
          }).join('') + '</ul>'
        : '<p>' + AD.tbp('Booking links') + '</p>';
      var a = T.assistance || {};
      var assist = AD.has(a.phone)
        ? '<p>' + AD.esc(a.name || '') + '</p><a class="btn btn--secondary btn--sm" href="tel:' + AD.esc(a.phone.replace(/[^\d+]/g, '')) + '">' + AD.icon('phone') + 'Call ' + AD.esc(a.phone) + '</a>'
        : '<p>' + AD.tbp('Assistance contact') + '</p>';

      return '<div class="container">' +
        AD.sectionHead({
          id: 'travel', eyebrow: 'Travel & Stay', title: 'Getting There',
          intro: 'Arrangements will be listed here once they are confirmed.'
        }) +
        '<div class="info-grid">' +
          card('compass', 'Travel guidance', text(T.guidance, 'Travel guidance'), 1) +
          card('parking', 'Parking', text(T.parking, 'Parking'), 2) +
          card('bus', 'Pickup &amp; shuttle', text(T.shuttle, 'Pickup and shuttle arrangements'), 3) +
          card('route', 'Pickup locations &amp; timings', pickups, 1) +
          card('bed', 'Suggested accommodation', stays, 2) +
          card('link', 'Booking links', links, 3) +
          card('user', 'Travel assistance', assist, 1) +
        '</div>' +
      '</div>';
    }
  });
})();
