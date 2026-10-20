/* =============================================================================
   9. VENUES AND DIRECTIONS
   Event cards link here (#venue-<id>) instead of repeating full details.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function row(icon, label, value) {
    return '<div class="venue-row"><dt>' + AD.icon(icon) + '<span>' + label + '</span></dt><dd>' + value + '</dd></div>';
  }

  function venueCard(v, i, C) {
    var events = (C.events || []).filter(function (e) { return e.venueId === v.id; });
    var map = AD.mapUrl(v);
    var photo = AD.has(v.photo)
      ? '<div class="media-frame" style="aspect-ratio:16/10"><img src="' + AD.esc(v.photo) + '" alt="' + AD.esc(v.photoAlt) + '" loading="lazy" decoding="async" width="1600" height="1000"></div>'
      : AD.mediaPlaceholder('Venue photograph', '16 / 10');

    return '<article class="venue-card paper reveal" data-delay="' + (i % 3 + 1) + '" id="venue-' + AD.esc(v.id) + '" tabindex="-1" aria-labelledby="venue-' + AD.esc(v.id) + '-title">' +
      '<div class="venue-card__media">' + photo + '</div>' +
      '<div class="venue-card__body">' +
        '<p class="eyebrow">' + AD.esc(v.label) + '</p>' +
        '<h3 class="venue-card__name" id="venue-' + AD.esc(v.id) + '-title">' + (AD.has(v.name) ? AD.esc(v.name) : AD.tbp('Venue name')) + '</h3>' +
        (v.note ? '<p class="venue-card__note">' + AD.esc(v.note) + '</p>' : '') +
        (events.length ? '<ul class="venue-card__events" aria-label="Events at this venue">' + events.map(function (e) {
          return '<li><a href="#event-' + AD.esc(e.id) + '">' + AD.esc(e.name) + '</a></li>';
        }).join('') + '</ul>' : '') +
        '<dl class="venue-rows">' +
          row('pin', 'Address', AD.has(v.address) ? AD.esc(v.address).replace(/\n/g, '<br>') : AD.tbp('Address')) +
          row('compass', 'Directions', AD.valueOr(v.directions, 'Directions')) +
          row('parking', 'Parking', AD.valueOr(v.parking, 'Parking')) +
        '</dl>' +
        '<div class="venue-card__actions">' +
          (map
            ? '<a class="btn btn--primary" href="' + AD.esc(map) + '" target="_blank" rel="noopener">' + AD.icon('pin') + 'Open in Maps</a>'
            : '<button class="btn btn--primary" type="button" aria-disabled="true">' + AD.icon('pin') + 'Map link to be provided</button>') +
          (AD.has(v.address)
            ? '<button class="btn btn--secondary" type="button" data-copy="' + AD.esc([v.name, v.address].filter(AD.has).join(', ')) + '">' + AD.icon('copy') + 'Copy address</button>'
            : '') +
        '</div>' +
      '</div>' +
    '</article>';
  }

  AD.register('venues', {
    render: function (C) {
      return '<div class="container">' +
        AD.sectionHead({
          id: 'venues', eyebrow: 'Venues & Directions', title: 'Where We Gather',
          intro: 'Full addresses, photographs and map links will appear here once confirmed.'
        }) +
        '<div class="venue-grid">' + (C.venues || []).map(function (v, i) { return venueCard(v, i, C); }).join('') + '</div>' +
      '</div>';
    },
    init: function (el) {
      AD.$$('[data-copy]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var text = b.getAttribute('data-copy');
          var done = function () { AD.announce('Address copied.'); b.lastChild.textContent = 'Copied'; setTimeout(function () { b.lastChild.textContent = 'Copy address'; }, 2000); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
        });
      });
      AD.$$('[aria-disabled="true"]', el).forEach(function (b) {
        b.addEventListener('click', function (e) { e.preventDefault(); AD.announce(b.textContent.trim() + '.'); });
      });
      // When arriving from an event card, move focus to the venue for keyboard users.
      window.addEventListener('hashchange', function () {
        var id = window.location.hash.slice(1);
        if (id.indexOf('venue-') === 0) {
          var t = document.getElementById(id);
          if (t) t.focus({ preventScroll: true });
        }
      });
    }
  });
})();
